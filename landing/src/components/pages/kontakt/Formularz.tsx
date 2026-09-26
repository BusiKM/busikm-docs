'use client';

import { useState } from 'react';
import Link from '@/i18n/Link';

import { firma } from '@/content/firma';
import { firebaseGotowy } from '@/lib/firebase';
import { wyslijWiadomosc, tematy, LIMITY, type Temat } from '@/lib/wiadomosci';
import { TRESC_ZGODY } from '@/content/zgoda';
import { Wymagane } from '@/components/ui/Wymagane';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { useJezyk } from '@/i18n/klient';

const pole =
  'h-13 w-full rounded-btn border border-line bg-white px-4 text-[16px] outline-none placeholder:text-muted focus:border-blue lg:text-body';

type Stan = 'gotowy' | 'wysyłam' | 'wysłane' | 'błąd';

const TEKSTY: Tlumaczenia<{
  /** Etykiety tematów. Do bazy idzie klucz — polski, jak w `lib/wiadomosci`. */
  tematy: Record<Temat, string>;
  poszla: string;
  odpowiadamy: [string, string];
  jeszczeRaz: string;
  imie: string;
  imieWzor: string;
  email: string;
  emailWzor: string;
  czegoDotyczy: string;
  wiadomosc: string;
  wiadomoscWzor: string;
  wymagane: string;
  pulapka: string;
  wysylam: string;
  wyslij: string;
  blad: [string, string];
  daneTylko: string;
  prywatnosc: string;
  pocztowy: string;
}> = {
  pl: {
    tematy: {
      'pytanie przed zakupem': 'pytanie przed zakupem',
      'pomoc techniczna': 'pomoc techniczna',
      'rozliczenia i faktury': 'rozliczenia i faktury',
      'coś innego': 'coś innego',
    },
    poszla: 'Wiadomość poszła.',
    odpowiadamy: [
      'Odpowiadamy tego samego dnia roboczego, na adres, który podałeś. Jeśli sprawa jest pilna, napisz wprost na',
      '.',
    ],
    jeszczeRaz: 'Napisz jeszcze raz',
    imie: 'Imię',
    imieWzor: 'Marek',
    email: 'Adres e-mail',
    emailWzor: 'marek@twojafirma.pl',
    czegoDotyczy: 'Czego dotyczy',
    wiadomosc: 'Wiadomość',
    wiadomoscWzor: 'Napisz, co się dzieje albo o co chcesz zapytać.',
    wymagane: 'pola wymagane',
    pulapka: 'Nie wypełniaj tego pola',
    wysylam: 'Wysyłam…',
    wyslij: 'Wyślij wiadomość',
    blad: ['Nie udało się wysłać. Napisz wprost na', '— ta droga działa zawsze.'],
    daneTylko:
      'Odpowiadamy na podany adres. Twoje dane wykorzystujemy wyłącznie do odpowiedzi na tę wiadomość —',
    prywatnosc: 'polityka prywatności',
    pocztowy:
      'Otworzy się Twój program pocztowy z gotową wiadomością. Odpowiadamy na ten sam adres, z którego piszesz.',
  },
  en: {
    tematy: {
      'pytanie przed zakupem': 'question before buying',
      'pomoc techniczna': 'technical help',
      'rozliczenia i faktury': 'billing and invoices',
      'coś innego': 'something else',
    },
    poszla: 'Message sent.',
    odpowiadamy: [
      'We reply the same working day, to the address you gave. If it’s urgent, write to us directly at',
      '.',
    ],
    jeszczeRaz: 'Write again',
    imie: 'First name',
    imieWzor: 'Mark',
    email: 'Email address',
    emailWzor: 'mark@yourcompany.com',
    czegoDotyczy: 'What’s it about',
    wiadomosc: 'Message',
    wiadomoscWzor: 'Tell us what’s happening or what you’d like to ask.',
    wymagane: 'required fields',
    pulapka: 'Do not fill in this field',
    wysylam: 'Sending…',
    wyslij: 'Send message',
    blad: ['That didn’t send. Write to us directly at', '— that always works.'],
    daneTylko:
      'We reply to the address you gave. We use your details only to answer this message —',
    prywatnosc: 'privacy policy',
    pocztowy:
      'Your email app will open with the message ready. We reply to the address you write from.',
  },
};

/**
 * Formularz kontaktowy.
 *
 * Wiadomość ląduje w Firestore (kolekcja `wiadomosci`), a stamtąd trasa
 * `/api/powiadom` wysyła powiadomienie na skrzynkę. Ten sam układ, co
 * w movgranto-homepage.
 *
 * **Bez konfiguracji Firebase formularz cofa się do `mailto:`** — otwiera
 * pocztę czytelnika z gotową treścią. To celowe: przy pracy lokalnej,
 * w podglądach gałęzi i gdyby konfiguracja kiedykolwiek zniknęła,
 * formularz nadal działa. Nigdy nie połknie wiadomości i nie powie
 * „dziękujemy", nie mając gdzie jej zapisać.
 */
export function Formularz() {
  const jezyk = useJezyk();
  const t = TEKSTY[jezyk];
  const [imie, setImie] = useState('');
  const [mail, setMail] = useState('');
  const [temat, setTemat] = useState(0);
  const [tresc, setTresc] = useState('');
  const [zgoda, setZgoda] = useState(false);
  const [pulapka, setPulapka] = useState('');
  const [stan, setStan] = useState<Stan>('gotowy');

  const kompletne = imie.trim() && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail) && tresc.trim();

  const linkPocztowy = () => {
    const podpis = [imie && `— ${imie}`, mail].filter(Boolean).join('\n');
    const body = [tresc, podpis].filter(Boolean).join('\n\n');
    return `mailto:${firma.email}?subject=${encodeURIComponent(
      `BusiKM · ${t.tematy[tematy[temat]]}`,
    )}&body=${encodeURIComponent(body)}`;
  };

  const wyslij = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kompletne || stan === 'wysyłam') return;
    setStan('wysyłam');
    try {
      await wyslijWiadomosc({
        imie,
        email: mail,
        temat: tematy[temat],
        tresc,
        zgoda,
        jezyk,
        pulapka,
      });
      setStan('wysłane');
      setImie('');
      setMail('');
      setTresc('');
      setZgoda(false);
    } catch {
      setStan('błąd');
    }
  };

  if (stan === 'wysłane') {
    return (
      <div
        role="status"
        className="flex flex-col gap-3 rounded-card border border-line bg-mist p-6 lg:p-8"
      >
        <div className="text-[19px] font-semibold lg:text-h3">{t.poszla}</div>
        <p className="text-[16px] leading-relaxed text-muted lg:text-body">
          {t.odpowiadamy[0]}{' '}
          <a href={`mailto:${firma.email}`} className="text-blue">
            {firma.email}
          </a>
          {t.odpowiadamy[1]}
        </p>
        <button
          type="button"
          onClick={() => setStan('gotowy')}
          className="self-start text-[15px] font-semibold text-blue lg:text-body"
        >
          {t.jeszczeRaz}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={wyslij} className="flex flex-col gap-5 lg:gap-6">
      <label className="flex flex-col gap-2">
        <span className="text-[14px] font-medium lg:text-caption">
          {t.imie}
          <Wymagane />
        </span>
        <input
          value={imie}
          onChange={(e) => setImie(e.target.value)}
          maxLength={LIMITY.imie}
          placeholder={t.imieWzor}
          required
          className={pole}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[14px] font-medium lg:text-caption">
          {t.email}
          <Wymagane />
        </span>
        <input
          type="email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          maxLength={LIMITY.email}
          placeholder={t.emailWzor}
          required
          className={pole}
        />
      </label>

      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-2.5 text-[14px] font-medium lg:text-caption">{t.czegoDotyczy}</legend>
        <div className="flex flex-wrap gap-2">
          {tematy.map((klucz, i) => (
            <button
              key={klucz}
              type="button"
              aria-pressed={i === temat}
              onClick={() => setTemat(i)}
              className={`cursor-pointer rounded-full border px-4 py-2.5 text-[14px] transition-colors lg:text-caption ${
                i === temat
                  ? 'border-ink bg-ink text-paper'
                  : 'border-line bg-white text-ink hover:border-muted'
              }`}
            >
              {t.tematy[klucz]}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-2">
        <span className="text-[14px] font-medium lg:text-caption">
          {t.wiadomosc}
          <Wymagane />
        </span>
        <textarea
          value={tresc}
          onChange={(e) => setTresc(e.target.value)}
          rows={6}
          maxLength={LIMITY.tresc}
          placeholder={t.wiadomoscWzor}
          required
          className="w-full resize-y rounded-btn border border-line bg-white px-4 py-3.5 text-[16px] leading-relaxed outline-none placeholder:text-muted focus:border-blue lg:text-body"
        />
      </label>


      {/* Znaczenie gwiazdki musi być wyjaśnione — WCAG 3.3.2. */}
      <p className="text-[12px] text-muted">
        <span aria-hidden className="text-red-ink">*</span> {t.wymagane}
      </p>

      {/*
        Pułapka na boty. Człowiek tego pola nie zobaczy i nie zatabuluje do
        niego; automat wypełniający wszystko po kolei owszem. Wypełnione =
        cicho udajemy sukces i nic nie zapisujemy.
      */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          {t.pulapka}
          <input
            tabIndex={-1}
            autoComplete="off"
            value={pulapka}
            onChange={(e) => setPulapka(e.target.value)}
          />
        </label>
      </div>

      {/*
        Zgoda **nieobowiązkowa** i to jest tu istotne. Usługą jest odpowiedź
        na pytanie — uzależnienie jej od zgody marketingowej byłoby
        warunkowaniem zakazanym przez art. 7 ust. 4 RODO. Na stronach zapisu
        jest odwrotnie, bo tam usługą jest sama lista.
      */}
      {firebaseGotowy && (
        <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-muted lg:text-caption">
          <input
            type="checkbox"
            checked={zgoda}
            onChange={(e) => setZgoda(e.target.checked)}
            className="mt-0.5 size-4.5 flex-none accent-blue"
          />
          <span>{TRESC_ZGODY[jezyk]}</span>
        </label>
      )}

      <div className="flex flex-col gap-3">
        {firebaseGotowy ? (
          <button
            type="submit"
            disabled={!kompletne || stan === 'wysyłam'}
            className="inline-flex h-13 items-center justify-center rounded-btn bg-blue px-7 text-[16px] font-semibold text-white transition-colors hover:bg-blue-dark disabled:cursor-not-allowed disabled:bg-line disabled:text-muted lg:h-14 lg:self-start lg:text-body"
          >
            {stan === 'wysyłam' ? t.wysylam : t.wyslij}
          </button>
        ) : (
          // Prawdziwy odnośnik, nie przycisk: działa prawy przycisk myszy,
          // kopiowanie adresu i otwarcie w nowej karcie.
          <a
            href={linkPocztowy()}
            className="inline-flex h-13 items-center justify-center rounded-btn bg-blue px-7 text-[16px] font-semibold text-white transition-colors hover:bg-blue-dark lg:h-14 lg:self-start lg:text-body"
          >
            {t.wyslij}
          </a>
        )}

        <p aria-live="polite" className="text-[13px] leading-relaxed text-muted lg:text-caption">
          {stan === 'błąd' ? (
            <span className="text-ink">
              {t.blad[0]}{' '}
              <a href={linkPocztowy()} className="text-blue">
                {firma.email}
              </a>{' '}
              {t.blad[1]}
            </span>
          ) : firebaseGotowy ? (
            <>
              {t.daneTylko}{' '}
              <Link href="/prywatnosc" className="text-blue">
                {t.prywatnosc}
              </Link>
              .
            </>
          ) : (
            <>
              {t.pocztowy}
            </>
          )}
        </p>
      </div>
    </form>
  );
}
