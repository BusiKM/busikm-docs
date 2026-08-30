import { Container } from '@/components/ui/Container';

const columns = [
  {
    title: 'PRODUKT',
    links: [
      { href: '#funkcje', label: 'Funkcje' },
      { href: '#cennik', label: 'Cennik' },
      { href: '#app', label: 'Aplikacja kierowcy' },
      { href: '#demo', label: 'Demo' },
    ],
  },
  {
    title: 'DLA KOGO',
    links: [
      { href: '#busy', label: 'Firmy z busami do 3,5 t' },
      { href: '#miedzynarodowy', label: 'Transport międzynarodowy' },
      { href: '#ksiegowe', label: 'Biura rachunkowe' },
    ],
  },
  {
    title: 'FIRMA',
    links: [
      { href: '#onas', label: 'O nas' },
      { href: '#kontakt', label: 'Kontakt' },
      { href: '#pomoc', label: 'Pomoc' },
    ],
  },
  {
    title: 'PRAWNE',
    links: [
      { href: '#regulamin', label: 'Regulamin' },
      { href: '#prywatnosc', label: 'Polityka prywatności' },
      { href: '#podprocesorzy', label: 'Podprocesorzy' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper px-5 pt-14 pb-10 lg:px-10 lg:pt-20 lg:pb-14">
      <Container>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-10">
          {columns.map((column) => (
            <div key={column.title}>
              <div className="text-caption tracking-[0.06em] text-muted">
                {column.title}
              </div>
              <div className="mt-4 flex flex-col gap-2.5 text-[15px] lg:mt-5 lg:gap-3">
                {column.links.map((link) => (
                  <a key={link.href} href={link.href} className="text-ink hover:text-blue">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div id="kontakt" className="mt-10 flex scroll-mt-24 flex-col gap-2 border-t border-line pt-5 text-caption text-muted lg:mt-16 lg:flex-row lg:gap-8 lg:pt-7">
          <span className="font-semibold text-ink">BusiKM</span>
          <span>NIP 1234567890</span>
          <span>kontakt@busikm.pl</span>
        </div>
      </Container>
    </footer>
  );
}
