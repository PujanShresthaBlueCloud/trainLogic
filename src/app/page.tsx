import React from "react";
import { Metadata } from "next";
import Hero from "@/components/Home/Hero";
import Process from "@/components/Home/Process";
import Benefit  from "@/components/Home/Benefit";
import Spend from "@/components/Home/Spend";
import Services from "@/components/Home/Services";
import Navigation from "@/components/Layout/Navigation";
import Method from "@/components/Home/Method";
import Mobile from "@/components/Home/Mobile";
import Search from "@/components/Home/Search";
import Pricing from "@/components/Home/Pricing";
import Solution from "@/components/Home/Solution";
import IndustriesBar from "@/components/Home/IndustriesBar";
import Choose from "@/components/Home/Choose";
import ContactFormHome from "@/components/Contact/ContactFormHome";

export const metadata: Metadata = {
  title: "trainedLogic",
};

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Process />
      <Benefit />
      <Services />
      <Choose />
      {/* <Mobile /> */}
      {/* <Search /> */}
      <Pricing />
      <ContactFormHome />
      {/* <Solution /> */}
      
    </main>
  );
}
