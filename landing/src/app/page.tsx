import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Tachograph } from '@/components/sections/Tachograph';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { FeatureSection } from '@/components/sections/FeatureSection';
import { DriverApp } from '@/components/sections/DriverApp';
import { OneInvoice } from '@/components/sections/OneInvoice';
import { Pricing } from '@/components/sections/Pricing';
import { Faq } from '@/components/sections/Faq';
import { FinalCta } from '@/components/sections/FinalCta';
import { MileageTable } from '@/components/mockups/MileageTable';
import { DriveTimeRings } from '@/components/mockups/DriveTimeRings';
import { OrderCard } from '@/components/mockups/OrderCard';
import { ReceiptCapture } from '@/components/mockups/ReceiptCapture';
import { ProfitCard } from '@/components/mockups/ProfitCard';
import { ExportPack } from '@/components/mockups/ExportPack';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Tachograph />
        <HowItWorks />

        {/* A — Kilometrówka */}
        <FeatureSection
          id="funkcje"
          title="Kontrola? Niech przychodzi."
          body="Ewidencja przebiegu powstaje sama, z każdej trasy. Zgodna z wzorem, kompletna, z podpisem kierowcy i zdjęciem licznika."
          caption="Ewidencja wg art. 86a ustawy o VAT · obsługa VAT-26 · odliczenie 50% albo 100% per pojazd"
          mockup={<MileageTable />}
          mockupSide="right"
          spacing="pb-24 lg:pb-40"
        />

        {/* B — Czas pracy kierowcy */}
        <FeatureSection
          title="Wiesz, kiedy kierowca musi stanąć."
          body="Przerwy, odpoczynki i limity liczą się na bieżąco. Kierowca dostaje przypomnienie, zanim przekroczy. Ty widzisz to samo, ze swojego biura."
          caption="Rozporządzenie 561/2006 i AETR · 4,5 h jazdy, 45 minut przerwy, 9 godzin odpoczynku · miesięczna karta ewidencji do wydruku"
          mockup={<DriveTimeRings />}
          mockupSide="left"
          dark
          spacing="py-24 lg:py-40"
        />

        {/* C — Zlecenia i CMR */}
        <FeatureSection
          title="Zlecenie, CMR, faktura. Jedna ścieżka."
          body="Przyjmujesz zlecenie, przypisujesz kierowcę i pojazd, a dokumenty powstają po drodze. List przewozowy podpisany na telefonie, u odbiorcy."
          caption="CMR z podpisem nadawcy i odbiorcy · etapy trasy · statusy w czasie rzeczywistym · czat z kierowcą"
          mockup={<OrderCard />}
          mockupSide="right"
          spacing="py-24 lg:pt-40 lg:pb-0"
        />

        {/* D — Koszty i paragony */}
        <FeatureSection
          title="Paragon znika w telefonie."
          body="Kierowca robi zdjęcie na stacji. Kwota, data i sprzedawca wpisują się same. Pudełko po butach możesz wyrzucić."
          caption="Odczyt paragonu · przypisanie do pojazdu i zlecenia · paliwo, myto, promy, naprawy, leasing"
          mockup={<ReceiptCapture />}
          mockupSide="left"
          spacing="pb-24 lg:py-40"
        />

        {/* E — Rentowność */}
        <FeatureSection
          title="Wiesz, ile zostaje."
          body="Fracht minus paliwo, myto, dieta kierowcy i amortyzacja. Na każdym zleceniu z osobna, nie raz na kwartał."
          caption="Koszty przypisane do zlecenia · przeliczenie walut po kursie NBP z dnia · marża w złotych i w procentach"
          mockup={<ProfitCard />}
          mockupSide="right"
          dark
          spacing="py-24 lg:py-40"
        />

        {/* F — Dane dla księgowej */}
        <FeatureSection
          title="Księgowa przestanie dzwonić."
          body="Na koniec miesiąca wybierasz miesiąc i pobierasz. Rejestry, kilometrówka, delegacje i czas pracy — w formacie, który wczyta do swojego programu."
          caption="Insert, Comarch Optima, Symfonia oraz uniwersalny arkusz · rejestry VAT · JPK_FA · dane do rozliczenia kierowców"
          mockup={<ExportPack />}
          mockupSide="left"
          spacing="py-24 lg:py-40"
        />

        <DriverApp />
        <OneInvoice />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
