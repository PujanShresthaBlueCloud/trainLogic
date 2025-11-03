"use client";
import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import { useRef } from "react";
import { Icon } from "@iconify/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/ui/card";
import { Button } from "@/ui/button";
import { BotMessageSquare, Bot, RocketIcon, Play  } from "lucide-react"; // Import the desired icon

const Services: FC = () => {
  const ref = useRef(null);

  const [isModalOpen, setIsVideoOpen] = useState<boolean>(false);

  const openModal = (): void => {
    setIsVideoOpen(true);
  };

  const closeModal = (): void => {
    setIsVideoOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);
  return (
    <section className="dark:bg-darkmode overflow-hidden py-14">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <div ref={ref}>
          <div className="text-center">
            <p className="sm:text-25 text-18 text-primary font-medium dark:text-white">
                Our Services
            </p>
            <h2 className="md:text-35 sm:text-28 text-24 text-midnight_text font-semibold mb-5 dark:text-white">
              We bridge the gap between 
              <span className="text-primary ml-2">business and AI </span>
            </h2>
            <p className="text-17 text-muted dark:text-white/60 mx-1 lg:mx-64 mb-3">
              Custom AI solutions designed specifically for Australian businesses
            </p>
          </div>
          <div className="grid grid-cols-12 items-center mt-16 md:gap-12 sm:gap-8">
            <div className="flex justify-center items-center xl:col-span-6 col-span-12">
              <Card className="w-full max-w-md mx-auto sm:mx-0">
                <CardHeader className="flex flex-col items-center space-y-4 pb-4">
                <div className="text-primary w-12 h-12 flex items-center justify-center">
                  <BotMessageSquare  className="w-12 h-12" />
                </div>
                <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-primary">AI Chatbots</CardTitle>
                  <p className="text-sm sm:text-base text-center text-muted-foreground text-17 text-muted dark:text-white/60">Your digital assistant for the web.</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-base sm:text-lg text-17 text-muted dark:text-white/60">Chatbots that understand your customers, answer instantly, and book appointments — all while sounding like part of your team.</p>
                  <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-17 text-muted dark:text-white/60">
                    <li className="flex items-center gap-2"><Icon icon="mdi:check-circle" className="text-green-500 w-5 h-5" />Replies in under 2 seconds</li>
                    <li className="flex items-center gap-2"><Icon icon="mdi:check-circle" className="text-green-500 w-5 h-5" />Learns from every conversation</li>
                    <li className="flex items-center gap-2"><Icon icon="mdi:check-circle" className="text-green-500 w-5 h-5" />Integrates with your CRM and calendar</li>
                    <li className="flex items-center gap-2"><Icon icon="mdi:check-circle" className="text-green-500 w-5 h-5" />Trained on your business info and FAQs</li>
                  </ul>
                  <p className="text-base sm:text-lg font-semibold mt-4 text-17 text-muted dark:text-white/60">PERFECT FOR:</p>
                  <p className="text-base sm:text-lg text-17 text-muted dark:text-white/60">Migration agents, mortgage brokers, accountants, and any business that gets the same questions again and again.</p>
                  <Button size="lg" className="w-full bg-green-500 hover:bg-green-600 text-white"> {/* Use size="lg" for a larger button */}
                    <Play className="mr-2 h-4 w-4" /> {/* Icon with margin-right for spacing */}
                    Chat with your own system
                  </Button>     
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center items-center xl:col-span-6 col-span-12">
              <Card className="w-full max-w-md mx-auto sm:mx-0">
                <CardHeader className="flex flex-col items-center space-y-4 pb-4">
                  <div className="text-primary w-12 h-12 flex items-center justify-center">
                    <Bot className="w-12 h-12" />
                  </div>
                <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-primary">AI Voice Agents</CardTitle>
                  <p className="text-sm sm:text-base text-center text-muted-foreground text-17 text-muted dark:text-white/60">Your 24/7 phone receptionist — powered by real AI.</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-base sm:text-lg text-17 text-muted dark:text-white/60">Our voice agents answer calls, talk naturally, and handle inquiries like a human (minus the hold music).</p>
                  <ul className="list-disc list-inside space-y-2 text-base sm:text-lg text-17 text-muted dark:text-white/60">
                    <li className="flex items-center gap-2"><Icon icon="mdi:check-circle" className="text-green-500 w-5 h-5" />Natural Australian voice</li>
                    <li className="flex items-center gap-2"><Icon icon="mdi:check-circle" className="text-green-500 w-5 h-5" />Handles calls, bookings, and triage</li>
                    <li className="flex items-center gap-2"><Icon icon="mdi:check-circle" className="text-green-500 w-5 h-5" />Works with your existing landline or mobile</li>
                    <li className="flex items-center gap-2"><Icon icon="mdi:check-circle" className="text-green-500 w-5 h-5" />Fully compliant with Australian  laws</li>
                  </ul>
                  <p className="text-base sm:text-lg font-semibold mt-4 text-17 text-muted dark:text-white/60">BEST FOR:</p>
                  <p className="text-base sm:text-lg text-17 text-muted dark:text-white/60">Trades, legal firms, or any business where missed calls mean missed income.</p>
                  <span className="text-green-500">
                  <Button size="lg" className="w-full bg-green-500 hover:bg-green-600 text-white"> {/* Use size="lg" for a larger button */}
                    <Play className="mr-2 h-4 w-4" /> {/* Icon with margin-right for spacing */}
                    Listen to your own demo
                  </Button>
                  </span>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
