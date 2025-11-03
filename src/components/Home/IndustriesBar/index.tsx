"use client";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { PaymentImage } from "@/app/api/data";
import Image from "next/image";
import React, { useState } from 'react';
import {
  Wrench,
  Hammer,
  Briefcase,
  Home,
  Truck,
  Zap,
  Building2,
  Volume2
} from "lucide-react";


const IndustriesBar = () => {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  // const industries = [
  //   { emoji: '👷', name: 'Builders & Renovators', audioUrl: '#' },
  //   { emoji: '🔧', name: 'Plumbing Services', audioUrl: '#' },
  //   { emoji: '✈️', name: 'Migration Agents', audioUrl: '#' },
  //   { emoji: '🏠', name: 'Mortgage Brokers', audioUrl: '#' },
  //   { emoji: '📦', name: 'Removalists', audioUrl: '#' },
  //   { emoji: '⚡', name: 'Electricians', audioUrl: '#' },
  // ];


const industries = [
  { icon: Hammer, name: "Builders & Renovators", color: "text-yellow-500", audioUrl: "#" },
  { icon: Wrench, name: "Plumbing Services", color: "text-blue-500", audioUrl: "#" },
  { icon: Briefcase, name: "Migration Agents", color: "text-purple-500", audioUrl: "#" },
  { icon: Home, name: "Mortgage Brokers", color: "text-green-500", audioUrl: "#" },
  { icon: Truck, name: "Removalists", color: "text-orange-500", audioUrl: "#" },
  { icon: Zap, name: "Electricians", color: "text-amber-400", audioUrl: "#" },
];
const handlePlayDemo = (index: number, audioUrl?: string): void => {
  // if the same demo is already playing, stop it
  if (playingAudio === index) {
    setPlayingAudio(null);
    // stop audio logic here if you have audioRef
    return;
  }

  // start playing (placeholder logic)
  setPlayingAudio(index);
  console.log(`Playing demo for ${industries[index]?.name}`, audioUrl ?? "");

  // If you have a real audio URL you can play it:
  // const a = new Audio(audioUrl);
  // a.play().catch(err => { console.error(err); setPlayingAudio(null); });
  // a.onended = () => setPlayingAudio(null);
};

  const TopAnimation = {
    initial: { y: "-100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 },
    transition: { duration: 1, delay: 0.4 },
  };

  const bottomAnimation = (index : any) => ({
    initial: { y: "100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 },
    transition: { duration: 1, delay: 0.4 + index * 0.4 },
  });

  const paymentItems = [
    "Free Consultation",
    "Proposal & Plan",
    "Optimise & Support",
  ];

  return (
    <section id="started" className="dark:bg-darkmode py-14 overflow-x-hidden" >
      <div
        ref={ref}
        className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4"
      >
        <motion.div {...TopAnimation}>
          <div className="px-4 lg:px-12">
            <h2 className="text-center font-semibold md:text-35 sm:text-28 text-24 mb-18 text-midnight_text dark:text-white lg:mx-44">
              Trusted by businesses across multiple industries
              <p className="text-center font-semibold md:text-25 sm:text-20 text-20 mb-18 text-midnight_text dark:text-white lg:mx-44">
                <span className="text-primary">All powered by  Australian-built AI  that speaks your language.</span>
              </p>
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-10">
              {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
                <motion.div
                  key={industry.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handlePlayDemo(index, industry.audioUrl)}
                  className="relative flex items-center justify-between gap-6 bg-gradient-to-r from-white via-gray-50 to-gray-100 rounded-2xl px-8 py-6 border-2 border-transparent hover:border-[#8B5CF6] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {/* Icon + Label Inline */}
                  <div className="flex items-center gap-4 relative z-10">
                    <div
                      className={`w-14 h-14 rounded-xl bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-md group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon
                        className={`w-7 h-7 ${industry.color} grayscale group-hover:grayscale-0 transition-all duration-500`}
                        aria-hidden
                      />
                    </div>
                    <span className="text-lg font-semibold text-gray-800 group-hover:text-[#6D28D9] transition-colors">
                      {industry.name}
                    </span>
                  </div>

                  {/* Hover Audio Overlay */}
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-[#8B5CF6]/95 rounded-2xl flex items-center justify-center text-white z-20"
                    >
                      <Volume2
                        size={36}
                        className={playingAudio === index ? "animate-pulse" : ""}
                      />
                      <p className="ml-3 text-sm font-bold">
                        {playingAudio === index ? "Playing..." : "Listen to Voice Agent"}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        <div className="flex justify-start sm:mt-20 mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-14 gap-8">
            {PaymentImage.map((item, index) => (
              <div key={index}>
                <motion.div {...bottomAnimation(index)}>
                  <div className="rounded-full">
                    <Image
                      src={item.image}
                      alt={`Brand: ${item.title}`}
                      width={80}
                      height={80}
                      className="rounded-full bg-white p-4 shadow-lg dark:bg-midnight_text"
                    />
                  </div>
                  <div className="py-4">
                    <p className="lg:text-25 text-22 font-medium text-midnight_text dark:text-white">
                      {item.title}
                    </p>
                  </div>
                  <div className="mr-2">
                    <p className="text-base text-muted dark:text-white/60">
                      {item.details}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesBar;
