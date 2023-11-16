"use client";

import Section1 from "@/components/landing-page-sections/Section1";
import Nav from "@/components/landing-page-sections/Nav";
import Section2 from "@/components/landing-page-sections/Section2";
import Section4 from "@/components/landing-page-sections/Section4";
import Section3 from "@/components/landing-page-sections/Section3";
import Footer from "@/components/landing-page-sections/Footer";
import PageWrapper from "@/components/landing-page-sections/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      <div className="relative max-w-[1600px] mx-auto">
        <Nav />
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Footer />
      </div>
    </PageWrapper>
  );
}
