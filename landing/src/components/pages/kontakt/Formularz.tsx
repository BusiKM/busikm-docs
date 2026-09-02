'use client';

import { useState } from 'react';

const ADRES = 'kontakt@busikm.pl';

const tematy = [
  'pytanie przed zakupem',
  'pomoc techniczna',
  'rozliczenia i faktury',
  'coś innego',
] as const;

const pole =
  'h-13 w-full rounded-btn border border-line bg-white px-4 text-[16px] outline-none placeholder:text-muted focus:border-blue lg:text-body';

/**
 * Formularz otwiera pocztę czytelnika z gotową wiadomością.
 *
 * Nie ma jeszcze serwera, który przyjąłby zgłoszenie, a formularz, który
 * połyka wiadomość i mówi „dziękujemy", jest gorszy niż jego brak. Przy
 * `mailto:` wysyła własny program pocztowy, więc zdanie „odpowiadamy na ten
 * sam adres, z którego piszesz" jest prawdziwe co do słowa.
 */
export function Formularz() {
  const [imie, setImie] = useState('');
  const [mail, setMail] = useState('');
  const [temat, setTemat] = useState(0);
  const [tresc, setTresc] = useState('');

  const link = () => {
    const podpis = [imie && `— ${imie}`, mail && mail].filter(Boolean).join('\n');
    const body = [tresc, podpis].filter(Boolean).join('\n\n');
    return `mailto:${ADRES}?subject=${encodeURIComponent(`BusiKM · ${tematy[temat]}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5 lg:gap-6">
      <label className="flex flex-col gap-2">
        <span className="text-[14px] font-medium lg:text-caption">Imię</span>
        <input
          value={imie}
          onChange={(e) => setImie(e.target.value)}
          placeholder="Marek"
          className={pole}
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[14px] font-medium lg:text-caption">Adres e-mail</span>
        <input
          type="email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          placeholder="marek@twojafirma.pl"
          className={pole}
        />
      </label>

      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-2.5 text-[14px] font-medium lg:text-caption">Czego dotyczy</legend>
        <div className="flex flex-wrap gap-2">
          {tematy.map((t, i) => (
            <button
              key={t}
              type="button"
              aria-pressed={i === temat}
              onClick={() => setTemat(i)}
              className={`cursor-pointer rounded-full border px-4 py-2.5 text-[14px] transition-colors lg:text-caption ${
                i === temat
                  ? 'border-ink bg-ink text-paper'
                  : 'border-line bg-white text-ink hover:border-muted'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-2">
        <span className="text-[14px] font-medium lg:text-caption">Wiadomość</span>
        <textarea
          value={tresc}
          onChange={(e) => setTresc(e.target.value)}
          rows={6}
          placeholder="Napisz, co się dzieje albo o co chcesz zapytać."
          className="w-full resize-y rounded-btn border border-line bg-white px-4 py-3.5 text-[16px] leading-relaxed outline-none placeholder:text-muted focus:border-blue lg:text-body"
        />
      </label>

      <div className="flex flex-col gap-3">
        {/* Prawdziwy odnośnik, nie przycisk z przekierowaniem: działa prawy
            przycisk myszy, kopiowanie adresu i otwarcie w nowej karcie. */}
        <a
          href={link()}
          className="inline-flex h-13 items-center justify-center rounded-btn bg-blue px-7 text-[16px] font-semibold text-white transition-colors hover:bg-blue-dark lg:h-14 lg:self-start lg:text-body"
        >
          Wyślij wiadomość
        </a>
        <p className="text-[13px] text-muted lg:text-caption">
          Otworzy się Twój program pocztowy z gotową wiadomością. Odpowiadamy na ten sam
          adres, z którego piszesz.
        </p>
      </div>
    </form>
  );
}
