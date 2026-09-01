import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { CzteryRzeczy } from '@/components/sections/CzteryRzeczy';
import { CzteryOsoby } from '@/components/sections/CzteryOsoby';
import { TrzyRuchy } from '@/components/sections/TrzyRuchy';
import { Dyspozytornia } from '@/components/sections/Dyspozytornia';
import { AplikacjaKierowcy } from '@/components/sections/AplikacjaKierowcy';
import { ZlecenieFaktura } from '@/components/sections/ZlecenieFaktura';
import { IleZostaje } from '@/components/sections/IleZostaje';
import { MapaITrasa } from '@/components/sections/MapaITrasa';
import { CzasPracy } from '@/components/sections/CzasPracy';
import { KosztyIParagony } from '@/components/sections/KosztyIParagony';
import { KoniecMiesiaca } from '@/components/sections/KoniecMiesiaca';
import { DokumentyITerminy } from '@/components/sections/DokumentyITerminy';
import { RzeczyWRobocie } from '@/components/sections/RzeczyWRobocie';
import { Demo } from '@/components/sections/Demo';
import { PierwszyDzien } from '@/components/sections/PierwszyDzien';
import { JednaFaktura } from '@/components/sections/JednaFaktura';
import { Cennik } from '@/components/sections/Cennik';
import { TwojeDane } from '@/components/sections/TwojeDane';
import { Pytania } from '@/components/sections/Pytania';
import { FinalCta } from '@/components/sections/FinalCta';

/**
 * Strona główna — 22 sekcje wg projektu „BusiKM Desktop 1440" / „BusiKM Telefon 390"
 * z Claude Design. Treść i kolejność: docs/landing/04-homepage.md.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CzteryRzeczy />
        <CzteryOsoby />
        <TrzyRuchy />
        <Dyspozytornia />
        <AplikacjaKierowcy />
        <ZlecenieFaktura />
        <IleZostaje />
        <MapaITrasa />
        <CzasPracy />
        <KosztyIParagony />
        <KoniecMiesiaca />
        <DokumentyITerminy />
        <RzeczyWRobocie />
        <Demo />
        <PierwszyDzien />
        <JednaFaktura />
        <Cennik />
        <TwojeDane />
        <Pytania />
      </main>
      <FinalCta />
      <Footer />
    </>
  );
}
