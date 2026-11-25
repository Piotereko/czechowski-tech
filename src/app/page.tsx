import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CaseStudies } from "@/components/CaseStudies";
import { Timeline } from "@/components/Timeline";
import { About } from "@/components/About";
import { SelectedResults } from "@/components/SelectedResults";
import { ContactFooter } from "@/components/ContactFooter";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <CaseStudies />
        <Timeline />
        <About />
        <SelectedResults />
      </main>
      <ContactFooter />
    </>
  );
}
