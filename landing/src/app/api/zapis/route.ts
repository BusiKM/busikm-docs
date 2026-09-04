import { NextResponse } from 'next/server';

import { firma } from '@/content/firma';
import { LIMITY_ZAPISU, listy } from '@/content/zapisy';

/**
 * Powiadomienie o nowym zapisie na listę wczesnego dostępu.
 *
 * Ta sama zasada, co przy formularzu kontaktowym: wysyłka po zapisie do bazy,
 * najlepszym staraniem, błąd nie wywraca formularza.
 *
 * Trasa jest publiczna, więc powtarza walidację z reguł Firestore — nie
 * zakłada, że wywołał ją nasz formularz.
 */

export const runtime = 'nodejs';

const ETYKIETY: Record<string, string> = {
  demo: 'demo',
  konto: 'dostęp do aplikacji',
};

function bezpiecznie(t: string): string {
  return t.replace(/[&<>"]/g, (z) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[z]!);
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

  const imie = String(dane.imie ?? '').slice(0, LIMITY_ZAPISU.imie);
  const email = String(dane.email ?? '').slice(0, LIMITY_ZAPISU.email);
  const lista = String(dane.lista ?? '');
  const zgoda = dane.zgodaNaWiesci === true;

  const poprawny =
    imie.length > 0 &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) &&
    Object.keys(listy).includes(lista);

  if (!poprawny) {
    return NextResponse.json({ ok: false, blad: 'brak lub złe pola' }, { status: 400 });
  }

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;color:#0A0A0B;line-height:1.6">
      <h2 style="margin:0 0 4px;font-size:18px">Nowy zapis — ${bezpiecznie(ETYKIETY[lista] ?? lista)}</h2>
      <table style="border-collapse:collapse;font-size:14px;margin-top:16px">
        <tr>
          <td style="padding:4px 16px 4px 0;color:#6C6C74">Imię</td>
          <td><b>${bezpiecznie(imie)}</b></td>
        </tr>
        <tr>
          <td style="padding:4px 16px 4px 0;color:#6C6C74">E-mail</td>
          <td><a href="mailto:${bezpiecznie(email)}" style="color:#0B5FFF">${bezpiecznie(email)}</a></td>
        </tr>
        <tr>
          <td style="padding:4px 16px 4px 0;color:#6C6C74">Dalsze wieści</td>
          <td>${zgoda ? 'tak, zgodził(a) się' : 'nie — tylko wiadomość o starcie'}</td>
        </tr>
      </table>
    </div>`;

  try {
    const odp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${klucz}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: odKogo,
        to: [doKogo],
        reply_to: email,
        subject: `BusiKM · zapis na ${ETYKIETY[lista] ?? lista} — ${imie}`,
        html,
      }),
    });
    if (!odp.ok) return NextResponse.json({ ok: false, blad: await odp.text() }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, blad: String(e) }, { status: 500 });
  }
}
