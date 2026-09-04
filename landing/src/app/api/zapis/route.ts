import { NextResponse } from 'next/server';

import { firma } from '@/content/firma';
import { LIMITY_ZAPISU } from '@/content/zapisy';
import { zapiszWKlaviyo } from '@/lib/klaviyo';
import type { Zrodlo } from '@/content/zgoda';
import {
  poprawnyWybor,
  opiszWybor,
  nazwaPlanu,
  nazwaOkresu,
} from '@/content/zainteresowanie';

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

/** Nazwy źródeł w powiadomieniu. Te same wartości trafiają do bazy jako tag. */
const ETYKIETY: Record<string, string> = {
  demo: 'demo',
  rejestracja: 'dostęp do aplikacji',
  formularz: 'formularz kontaktowy',
};

function bezpiecznie(t: string): string {
  return t.replace(/[&<>"]/g, (z) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[z]!);
}

export async function POST(request: Request) {
  const klucz = process.env.RESEND_API_KEY;
  const doKogo = process.env.POWIADOM_NA || firma.email;
  const odKogo = process.env.POWIADOM_OD || 'BusiKM <formularz@busikm.pl>';

  let dane: Record<string, unknown>;
  try {
    dane = await request.json();
  } catch {
    return NextResponse.json({ ok: false, blad: 'niepoprawne dane' }, { status: 400 });
  }

  const imie = String(dane.imie ?? '').slice(0, LIMITY_ZAPISU.imie);
  const email = String(dane.email ?? '').slice(0, LIMITY_ZAPISU.email);
  const zrodlo = String(dane.zrodlo ?? '');

  // Wybór z cennika przechodzi tę samą walidację, co w przeglądarce. Trasa
  // jest publiczna i nie zakłada, że wywołał ją nasz formularz — cokolwiek
  // spoza listy daje `null`, czyli po prostu „nie wiemy".
  const wybor = poprawnyWybor(dane.plan, dane.okres);

  const poprawny =
    imie.length > 0 &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) &&
    Object.keys(ETYKIETY).includes(zrodlo);

  if (!poprawny) {
    return NextResponse.json({ ok: false, blad: 'brak lub złe pola' }, { status: 400 });
  }

  // Klaviyo najpierw: to tam ląduje lista, z której kiedyś pójdzie wysyłka.
  // Powiadomienie na naszą skrzynkę jest wygodą, nie warunkiem — więc gdyby
  // trzeba było wybrać, które ma się udać, wybieramy zapis kontaktu.
  const klaviyo = await zapiszWKlaviyo({ imie, email, zrodlo: zrodlo as Zrodlo, wybor });

  if (!klucz) {
    return NextResponse.json({ ok: false, pominiete: 'brak RESEND_API_KEY', klaviyo }, { status: 200 });
  }

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;color:#0A0A0B;line-height:1.6">
      <h2 style="margin:0 0 4px;font-size:18px">Nowy zapis — ${bezpiecznie(ETYKIETY[zrodlo] ?? zrodlo)}</h2>
      <table style="border-collapse:collapse;font-size:14px;margin-top:16px">
        <tr>
          <td style="padding:4px 16px 4px 0;color:#6C6C74">Imię</td>
          <td><b>${bezpiecznie(imie)}</b></td>
        </tr>
        <tr>
          <td style="padding:4px 16px 4px 0;color:#6C6C74">E-mail</td>
          <td><a href="mailto:${bezpiecznie(email)}" style="color:#0B5FFF">${bezpiecznie(email)}</a></td>
        </tr>
        ${
          wybor
            ? `<tr>
          <td style="padding:4px 16px 4px 0;color:#6C6C74">Z cennika</td>
          <td><b>${bezpiecznie(opiszWybor(wybor))}</b></td>
        </tr>`
            : ''
        }
        <tr>
          <td style="padding:4px 16px 4px 0;color:#6C6C74">Tag</td>
          <td><code>${bezpiecznie(zrodlo)}</code></td>
        </tr>
        <tr>
          <td style="padding:4px 16px 4px 0;color:#6C6C74">Klaviyo</td>
          <td>${klaviyo.ok ? 'zapisany' : bezpiecznie('nie — ' + ('pominiete' in klaviyo ? klaviyo.pominiete : klaviyo.blad))}</td>
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
        // Plan w temacie, żeby dało się ocenić zgłoszenie bez otwierania.
        subject:
          `BusiKM · zapis na listę (${ETYKIETY[zrodlo] ?? zrodlo}) — ${imie}` +
          (wybor ? ` · ${nazwaPlanu(wybor.plan)} ${nazwaOkresu(wybor.okres)}` : ''),
        html,
      }),
    });
    if (!odp.ok) return NextResponse.json({ ok: false, blad: await odp.text(), klaviyo }, { status: 502 });
    return NextResponse.json({ ok: true, klaviyo });
  } catch (e) {
    return NextResponse.json({ ok: false, blad: String(e) }, { status: 500 });
  }
}
