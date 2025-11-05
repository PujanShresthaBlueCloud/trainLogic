"use client";

import React from "react";
import { Button } from "../../../ui/button";
import { Badge } from "../../../ui/badge";
import { Phone, Calendar, MessageSquare, Clock, CheckCircle2, ArrowRight, Mail, Mic, Smartphone} from "lucide-react";
import { ImageWithFallback } from "../../../figma/ImageWithFallback";
import { AINetworkBackground } from "../../../ui/AINetworkBackground";
import { CommunicationAnimation } from "../../../ui/CommunicationAnimation";
import Link from "next/link";


const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-blue-950 via-slate-900 to-slate-950" id="hero">
      {/* Global animated AI background (kept behind content) */}
      <AINetworkBackground />

      {/* Gradient Orbs */}
      <div aria-hidden className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl z-0" />
      <div aria-hidden className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: Text Content */}
          <div className="space-y-8 mt-20">
            <Badge className="bg-blue-500/10 text-blue-300 border-blue-500/20 px-4 py-1.5 inline-flex items-center gap-2">
              <span aria-hidden>🤖</span>
              <span>AI-Powered Customer Service</span>
            </Badge>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                Never Miss Another Customer Call Again
              </h1>

              <h1 className="text-xl sm:text-2xl text-blue-300 font-semibold">
                
              </h1>

              <p className="text-slate-300 max-w-xl">
                AI receptionist that answers 24/7, books appointments, and handles customer inquiries — so you can focus on what matters.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="#contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white inline-flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
              <Link href="#industries">
                <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-white/10">
                  Listen Demo
                </Button>
              </Link>
            </div>

            {/* Feature List */}
            <div className="grid sm:grid-cols-2 gap-4 pt-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white mb-1 font-medium">24/7 Availability</h3>
                  <p className="text-slate-400 text-sm">Always ready to answer calls</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white mb-1 font-medium">Auto Booking</h3>
                  <p className="text-slate-400 text-sm">Schedule appointments instantly</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white mb-1 font-medium">Smart Responses</h3>
                  <p className="text-slate-400 text-sm">Handle inquiries intelligently</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white mb-1 font-medium">Natural Voice</h3>
                  <p className="text-slate-400 text-sm">Human-like conversations</p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-6 border-t border-slate-700/50">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-slate-300 text-sm">No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-slate-300 text-sm">Trusted by Australian businesses</span> 
              </div>
            </div>
          </div>

          {/* RIGHT: Image Grid with floating cards */}
          <div className="relative">
            {/* Main Image Card */}
            {/* <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1553775282-20af80779df7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Customer Service Representative"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent" />
            </div> */}

            {/* Floating Incoming Call Card (left) */}
            {/* <div className="absolute -left-4 top-1/4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-xl max-w-xs">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/90 font-medium">Incoming Call</p>
                  <p className="text-white/60 text-sm">Sarah Johnson</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-300 text-sm">AI Answering...</span>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Floating Appointment Booked Card (right bottom) */}
            {/* <div className="absolute -right-4 bottom-1/4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-xl max-w-xs">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/90 font-medium">Appointment Booked</p>
                  <p className="text-white/60 text-sm">Tomorrow at 2:00 PM</p>
                  <div className="mt-2">
                    <span className="text-blue-300 text-sm">Michael Chen</span>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Small Accent Images */}
            {/* <div className="absolute -top-8 -right-8 w-32 h-32 rounded-xl overflow-hidden shadow-xl border-4 border-slate-900">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="AI Technology"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-xl overflow-hidden shadow-xl border-4 border-slate-900">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758786977080-a5e60a3f843c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Digital Interface"
                className="w-full h-full object-cover"
              />
            </div> */}
            {/* <CommunicationAnimation /> */}
          </div>
        </div>

      </div>
       {/* Deep Curved Bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0,140 C360,240 1080,40 1440,160 L1440,200 L0,200 Z"
            className="fill-white"
          />
        </svg>
      </div>
    </section>
  );
}
export default Hero;
