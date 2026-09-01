import { Section } from '@/components/ui/Section';

const items = [
  'Trzymamy je w Europie',
  'Kopia zapasowa codziennie',
  'Rezygnujesz — pobierasz wszystko',
  'Widać, kto co zmienił i kiedy',
];

/** 6.19 — dane. */
export function TwojeDane() {
  return (
    <Section tone="ink">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-16">
        <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
          Twoje dane zostają Twoje.
        </h2>

        <div
          data-reveal-group
          className="flex flex-col text-[16px] leading-relaxed lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5 lg:text-body"
        >
          {items.map((item) => (
            <div key={item} data-reveal className="border-t border-line-dark py-3.5 lg:py-5">
              {item}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
