import About from "@/components/About";
import HeroSub from "@/components/SharedComponents/HeroSub";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "About | trAInedLogic",
};

const page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/abut", text: "About" },
  ];
  return (
    <>
      <HeroSub
        title="About"
        description="trAInedLogic"
        breadcrumbLinks={breadcrumbLinks}
      />
      <About />
    </>
  );
};

export default page;
