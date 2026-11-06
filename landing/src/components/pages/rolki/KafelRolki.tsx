import Image from 'next/image';
import { czasFilmu, type Rolka } from '@/content/rolki';

/** Trójkąt „odtwórz". Wypełniony, bo na kadrze obrys ginie. */
export function IkonaOdtworz({ className = 'size-[18px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" />
    </svg>
  );
}

/**
 * Pionowy kadr rolki z czasem trwania. Treść odnośnika, a nie sam odnośnik –
 * podstrona otwiera odtwarzacz na miejscu, a strona główna przechodzi na `/rolki`.
 *
 * `unoptimized`, bo okładka to już gotowy, lekki JPEG z R2.
 */
export function KadrRolki({
  rolka,
  sizes,
  znacznik,
  przycisk = true,
  czas = true,
  className = '',
}: {
  rolka: Pick<Rolka, 'okladka' | 'sekundy'>;
  sizes: string;
  znacznik?: string;
  przycisk?: boolean;
  /** Na małym kafelku znacznik czasu zasłaniałby tekst z kadru. */
  czas?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`relative block aspect-[9/16] overflow-hidden rounded-card bg-surface shadow-card ${className}`}
    >
      <Image
        src={rolka.okladka}
        alt=""
        fill
        unoptimized
        sizes={sizes}
        className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] motion-reduce:transition-none"
      />
      {znacznik && (
        <span className="absolute top-2.5 left-2.5 rounded-full bg-blue px-2.5 py-0.5 text-[12px] leading-[18px] font-semibold text-white">
          {znacznik}
        </span>
      )}
      {czas && (
        <span className="absolute top-2.5 right-2.5 rounded-full bg-ink/75 px-2 py-0.5 font-mono text-[12px] leading-[18px] text-paper">
          {czasFilmu(rolka.sekundy)}
        </span>
      )}
      {przycisk && (
        <span className="absolute bottom-3 left-3 flex size-11 items-center justify-center rounded-full bg-ink/75 text-white transition-[background-color,transform] duration-200 group-hover:scale-105 group-hover:bg-blue motion-reduce:transition-none">
          <IkonaOdtworz />
        </span>
      )}
    </span>
  );
}
