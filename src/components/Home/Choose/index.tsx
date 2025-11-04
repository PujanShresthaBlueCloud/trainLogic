"use client";
import React from "react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

const Choose = () => {
  const ref = useRef(null);

  return (
    <section className="dark:bg-darkmode overflow-hidden py-14">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <div
          ref={ref}
          className="dark:bg-midnight_text bg-hero-bg rounded-3xl py-16 sm:px-20 px-5"
        >
          <div className="text-center">
            <h2 className="md:text-35 sm:text-28 text-24 text-midnight_text font-semibold mb-5 dark:text-white lg:max-w-full sm:max-w-75% mx-auto">
              Why Choose TR<span className="text-primary max-w-max ml-2">[AI]</span>
              NED LOGIC
            </h2>
            <p className="text-muted dark:text-white/60 md:text-19 text-16 md:mb-14 mb-8">
              We make AI accessible, ethical, and practical for every business. Moving teams from uncertainty to confidence, we ensure every AI initiative is built on clear strategy, responsible data use, and meaningful outcomes.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-11">
            <div className="col-span-2">
              <div className="bg-white dark:bg-darkmode rounded-2xl">
                <div className="grid xl:grid-cols-2 xl:gap-10">
                  <div className="xl:py-14 py-8 xl:pl-9 px-9">
                    <h3 className="md:text-25 text-20 font-medium text-midnight_text dark:text-white mb-6">
                      Clarity Before Complexity
                    </h3>
                    <p className="text-muted dark:text-white/60 md:text-19 text-16 md:mb-14 mb-8">
                      We cut through the AI hype to deliver strategies that make sense for your business—no jargon, no complexity you don't need.
                    </p>
                    <Link
                      href="#contact"
                      className="text-17 flex gap-2 items-center hover:text-blue-700 text-primary w-fit"
                    >
                      Get Started
                      <Icon
                        icon="solar:alt-arrow-right-linear"
                        width="13"
                        height="13"
                      />
                    </Link>
                  </div>
                  <div>
                    <Image
                      src="/images/illustration/clearity.png"
                      alt="clearity"
                      width={500}
                      height={300}
                      className="xl:w-full w-75% mx-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-1 col-span-2">
              <div
                className="bg-white dark:bg-darkmode flex gap-1 items-center rounded-2xl overflow-hidden"
              >
                <div className="sm:pl-8 px-8 py-5">
                  <h3 className="md:text-25 text-20 font-medium text-midnight_text dark:text-white mb-6">
                    Trust Through Transparency
                  </h3>
                  <p className="text-muted dark:text-white/60 md:text-19 text-16 mb-8">
                    Every recommendation is explainable. Every model is auditable. We build AI systems you can confidently stand behind.
                  </p>
                  <Link
                    href="#contact"
                    className="text-17 flex gap-2 items-center hover:text-blue-700 text-primary w-fit"
                  >
                    Get Started
                    <Icon
                      icon="solar:alt-arrow-right-linear"
                      width="13"
                      height="13"
                    />
                  </Link>
                </div>
                <div className="sm:block hidden w-full pr-5">
                  <Image
                    src="/images/illustration/trust.svg"
                    alt="image"
                    width={232}
                    height={375}
                    className="object-cover"
                  />
                </div>
              </div>
              <div
                className="bg-white dark:bg-darkmode flex gap-1 items-center rounded-2xl overflow-hidden"
              >
                <div className="sm:pl-8 px-8 py-5">
                  <h3 className="md:text-25 text-20 font-medium text-midnight_text dark:text-white mb-6">
                    Empowerment Through Learning
                  </h3>
                  <p className="text-muted dark:text-white/60 md:text-19 text-16 mb-8">
                    We don't just implement—we educate. Your team gains the knowledge and confidence to own your AI future.
                  </p>
                  <Link
                    href="#contact"
                    className="text-17 flex gap-2 items-center hover:text-blue-700 text-primary w-fit"
                  >
                    Get Started
                    <Icon
                      icon="solar:alt-arrow-right-linear"
                      width="13"
                      height="13"
                    />
                  </Link>
                </div>
                <div className="sm:block hidden w-full pr-5">
                  <Image
                    src="/images/illustration/chatbot.png"
                    alt="chatbot"
                    width={232}
                    height={800}
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-1 col-span-2">
              <div
                className="bg-white dark:bg-darkmode rounded-2xl overflow-hidden flex flex-col"
              >
                <div className="p-10 mt-20 sm:mt-5 md:mt-5">
                  <Image
                    src="/images/illustration/component.svg"
                    alt="component"
                    width={500}
                    height={400}
                    quality={100}
                    className="w-full"
                  />
                </div>
                <div className="px-9 flex justify-center flex-col py-6 mb-23 mt-8">
                  <h3 className="md:text-25 text-20 font-medium text-midnight_text dark:text-white mb-6">
                    Solutions That Evolve
                  </h3>
                  <p className="text-muted dark:text-white/60 md:text-19 text-16 md:mb-3">
                    We design intelligent systems that grow with your business, adapting to new challenges and opportunities.
                  </p>
                  <Link
                    href="#contact"
                    className="text-17 flex gap-2 items-center hover:text-blue-700 text-primary w-fit"
                  >
                    Get Started
                    <Icon
                      icon="solar:alt-arrow-right-linear"
                      width="13"
                      height="13"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Choose;
