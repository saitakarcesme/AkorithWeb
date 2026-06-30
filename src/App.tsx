import { ArchitectureFlow } from "./components/ArchitectureFlow";
import { CommandStrip } from "./components/CommandStrip";
import { DownloadSection } from "./components/DownloadSection";
import { Faq } from "./components/Faq";
import { FeatureBands } from "./components/FeatureBands";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProofLedger } from "./components/ProofLedger";
import { Roadmap } from "./components/Roadmap";
import { Screenshots } from "./components/Screenshots";
import { ScrollProgress } from "./components/ScrollProgress";
import { SecuritySection } from "./components/SecuritySection";
import { TestLabBand } from "./components/TestLabBand";

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <CommandStrip />
        <DownloadSection />
        <FeatureBands />
        <Screenshots />
        <ArchitectureFlow />
        <SecuritySection />
        <TestLabBand />
        <ProofLedger />
        <Roadmap />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
