"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Icon } from "@iconify/react";
import { BeneifitImage } from "@/app/api/data";
import React, { useState, useEffect } from 'react';

import {
  Wrench,
  Hammer,
  Briefcase,
  Home,
  Truck,
  Zap,
  Building2,
  Volume2,
  ChartNoAxesCombined,
} from "lucide-react";

const Benefit = () => {
  const ref = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
    // ... inside your Benefit component, after states like hoveredIndex / playingAudio:
    const audioRef = useRef<HTMLAudioElement | null>(null);

    /**
     * Play or stop demo audio for an industry tile.
     * - index: index of the tile (used to set playingAudio for UI state)
     * - audioUrl: optional audio URL; if absent or '#', a short mock is used
     */
    const handlePlayDemo = (index: number, audioUrl?: string) => {
      // If same index is playing -> stop it
      if (playingAudio === index) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }
        setPlayingAudio(null);
        return;
      }

      // Stop any existing audio
      if (audioRef.current) {
        try { audioRef.current.pause(); } catch (_) {}
        audioRef.current = null;
      }

      // Set playing state for UI
      setPlayingAudio(index);

      // If a real audio URL provided, play it
      if (audioUrl && audioUrl !== "#") {
        try {
          const a = new Audio(audioUrl);
          audioRef.current = a;
          a.play().catch((err) => {
            console.error("Audio play error:", err);
            // On playback failure clear state
            setPlayingAudio(null);
          });
          a.onended = () => {
            setPlayingAudio(null);
            audioRef.current = null;
          };
        } catch (err) {
          console.error("Failed to create Audio element:", err);
          setPlayingAudio(null);
        }
      } else {
        // No real audio provided (placeholder) — simulate a short play so UI demonstrates behavior
        // e.g., animate for 1.8s, then clear
        setTimeout(() => {
          setPlayingAudio(null);
        }, 1800);
      }
    };



  const industries = [
    { icon: Hammer, name: "Builders & Renovators", color: "text-yellow-500", audioUrl: "#" },
    { icon: Wrench, name: "Plumbing Services", color: "text-blue-500", audioUrl: "#" },
    { icon: Briefcase, name: "Migration Agents", color: "text-purple-500", audioUrl: "#" },
    { icon: Home, name: "Mortgage Brokers", color: "text-green-500", audioUrl: "#" },
    { icon: Truck, name: "Removalists", color: "text-orange-500", audioUrl: "#" },
    { icon: Zap, name: "Electricians", color: "text-amber-400", audioUrl: "#" },
  ];

  return (
    <section className="dark:bg-darkmode py-10 overflow-x-hidden" id="industries">
      <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 mx-auto">
        <div
          ref={ref}
          className="dark:bg-midnight_text bg-hero-bg rounded-3xl md:py-20 py-10 2xl:pr-14 2xl:pl-20 sm:px-14 px-6"
        >
          <div className="items-start">
            <h2 className="font-bold md:text-35 sm:text-28 text-24 text-midnight_text dark:text-white text-center">
               Trusted by
              <span className= "text-primary max-w-max ml-2">
                businesses across
              </span>
              <br />
              multiple industries.
            </h2>
          </div>
          <div className="grid grid-cols-12 items-center mt-16 md:gap-12 sm:gap-8">
            <div className="xl:col-span-6 col-span-12">
              <p className="sm:text-25 text-18 font-medium dark:text-white">
                  See It In Action
              </p>
              <p className="text-17 text-muted dark:text-white/60 mb-10 pr-5 pt-5">
                Choose your industry and hear how TrainedLogic handles real customer conversations with natural, professional responses.
              </p>
              <div className="xl:px-0 lg:px-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                        onClick={() => handlePlayDemo(index)}
                        className="relative flex items-center gap-4 bg-linear-to-r from-white via-gray-50 to-gray-100 rounded-2xl px-6 py-4 border-2 border-transparent hover:border-[#8B5CF6] hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                      >
                        <div className="flex items-center gap-3 relative z-10">
                          <div className="w-14 h-14 rounded-xl bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform duration-300">
                            <Icon className={`w-8 h-8 ${industry.color} transition-all duration-500`} aria-hidden />
                          </div>
                         <span className="text-base font-medium text-gray-800 group-hover:text-[#6D28D9] transition-colors">
                          {industry.name}
                          </span>
                        </div>
                        {hoveredIndex === index && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 bg-[#8B5CF6]/95 rounded-2xl flex items-center justify-center text-white z-20"
                        >
                        <Volume2
                          size={28}
                          className={playingAudio === index ? "animate-pulse" : ""}
                        />
                        <p className="ml-2 text-sm font-bold">
                        {playingAudio === index ? "Playing..." : "Listen"}
                        </p>
                        </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="xl:col-span-6 col-span-12" >
              <p className="sm:text-25 text-18 text-primary font-medium dark:text-white">
                Grow revenues by ready-to-use AI automation solutions!
              </p>
              {BeneifitImage.map((item, index) => (
                <div key={index} className="sm:flex items-center mt-8">
                  <Image
                    src={item.image}
                    alt="Trusted brand"
                    width={100}
                    height={100}
                    className="w-8 h-8 sm:mr-4 sm:mb-0 mb-3 "
                  />
                  <p className="text-17 text-muted dark:text-white/60">
                    {item.details}
                  </p>
                </div>
              ))}
              <div className="flex items-center lg:justify-start justify-center">
                <Link
                  href="#contact"
                  className="text-17 flex gap-3 items-center bg-primary text-white py-3 px-8 rounded-lg  mt-12 border border-primary hover:text-primary hover:bg-transparent"
                >
                  Contact Us
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
    </section>
  );
};
export default Benefit;
