import { NextResponse } from 'next/server';

import { firma } from '@/content/firma';
import { tematy, LIMITY } from '@/lib/wiadomosci';

/**
 * Powiadomienie o nowej wiadomości z formularza kontaktowego.
 *
 * Wysyłka przez Resend, tak jak w movgranto-homepage. Wywoływane po zapisie
 * do Firestore i traktowane jako „najlepsze staranie": błąd tutaj nie może
 * wywrócić formularza, bo zgłoszenie już jest w bazie.
 *
 * Wymagane zmienne: `RESEND_API_KEY`, `POWIADOM_NA`, `POWIADOM_OD`.
 * Bez klucza zwracamy 200 z adnotacją — brak konfiguracji to stan
 * przejściowy, nie awaria.
 */

export const runtime = 'nodejs';

/** Ucieczka znaków w treści wstawianej do HTML-a maila. */
function bezpiecznie(tekst: string): string {
  return tekst.replace(
    /[&<>"]/g,
    (z) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[z]!,
  );
}

export async function POST(request: Request) {
  const klucz = process.env.RESEND_API_KEY;
  const doKogo = process.env.POWIADOM_NA || firma.email;
  const odKogo = process.env.POWIADOM_OD || 'BusiKM <onboarding@resend.dev>';

  if (!klucz) {
    return NextResponse.json({ ok: false, pominiete: 'brak RESEND_API_KEY' }, { status: 200 });
  }

  let dane: Record<string, unknown>;
  try {
    dane = await request.json();
  } catch {
    return NextResponse.json({ ok: false, blad: 'niepoprawne dane' }, { status: 400 });
  }

  const imie = String(dane.imie ?? '').slice(0, LIMITY.imie);
  const email = String(dane.email ?? '').slice(0, LIMITY.email);
  const tresc = String(dane.tresc ?? '').slice(0, LIMITY.tresc);
  const temat = String(dane.temat ?? '');

  // Ta sama walidacja co w regułach Firestore — trasa jest publiczna,
  // więc nie zakładamy, że wywołał ją nasz własny formularz.
  const poprawny =
    imie.length > 0 &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) &&
    tresc.length > 0 &&
    (tematy as readonly string[]).includes(temat);

  if (!poprawny) {
    return NextResponse.json({ ok: false, blad: 'brak lub złe pola' }, { status: 400 });
  }

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;color:#0A0A0B;line-height:1.6">
      <h2 style="margin:0 0 4px;font-size:18px">Nowa wiadomość z busikm.pl</h2>
      <p style="margin:0 0 20px;color:#6C6C74;font-size:14px">${bezpiecznie(temat)}</p>
      <table style="border-collapse:collapse;font-size:14px">
        <tr>
          <td style="padding:4px 16px 4px 0;color:#6C6C74;vertical-align:top">Od</td>
          <td><b>${bezpiecznie(imie)}</b></td>
        </tr>
        <tr>
          <td style="padding:4px 16px 4px 0;color:#6C6C74;vertical-align:top">E-mail</td>
          <td><a href="mailto:${bezpiecznie(email)}" style="color:#0B5FFF">${bezpiecznie(email)}</a></td>
        </tr>
      </table>
      <div style="margin-top:20px;padding-top:20px;border-top:1px solid #E3E3E6;white-space:pre-wrap;font-size:15px">${bezpiecznie(tresc)}</div>
    </div>`;

  try {
    const odp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${klucz}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: odKogo,
        to: [doKogo],
        // Dzięki temu „Odpowiedz" w kliencie pocztowym trafia wprost do
        // osoby, która napisała, a nie do adresu nadawcy technicznego.
        reply_to: email,
        subject: `BusiKM · ${temat} — ${imie}`,
        html,
      }),
    });

    if (!odp.ok) {
      return NextResponse.json({ ok: false, blad: await odp.text() }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, blad: String(e) }, { status: 500 });
  }
}
