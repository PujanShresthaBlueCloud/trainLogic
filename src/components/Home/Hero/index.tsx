// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "motion/react";
// import { Icon } from "@iconify/react";
// import { Heroimage } from "@/app/api/data";

// const Hero = () => {
//   const leftAnimation = {
//     initial: { x: "-10%", opacity: 0 },
//     animate: { x: 0, opacity: 1 },
//     exit: { x: "-10%", opacity: 0 },
//     transition: { duration: .5 },
//   };

//   const rightAnimation = {
//     initial: { x: "10%", opacity: 0 },
//     animate: { x: 0, opacity: 1 },
//     exit: { x: "10%", opacity: 0 },
//     transition: { duration: .5 },
//   };
//   return (
//     <section className="relative pt-44 bg-cover bg-center dark:bg-darkmode">
//       <div className="w-full h-full absolute z-0 bg-hero-bg sm:rounded-b-[119px] sm:-left-1/4 2xl:-left-1/3 top-0 dark:bg-midnight_text"></div>
//       <div className="container mx-auto lg:max-w-(--breakpoint-xl) relative z-1 md:max-w-(--breakpoint-md) px-4">
//         <div className="grid grid-cols-12 items-center">
//           <motion.div {...leftAnimation} className="lg:col-span-6 col-span-12">
//             <h1 className="md:text-50 sm:text-40 text-28 text-midnight_text dark:text-white lg:text-start mb-6 lg:w-full sm:w-3/4">
//               We bridge the gap between
//               <br />
//               <span className="bg-border dark:bg-darkHeroBg md:text-50 text-36 rounded-lg lg:text-start text-primary max-w-max">
//               business and AI
//               </span>
//               <br />
//               for your system.
//             </h1>
//             <p className="sm:text-19 text-16 text-muted dark:text-white/60 text-start lg:max-w-full sm:max-w-75%">
//               We build custom AI chatbots and voice agents for Australian businesses.
//             </p>
//             <div className="flex md:flex-nowrap flex-wrap items-center mt-12 sm:gap-11 gap-6">
//               <div>
//                 <Link
//                   href="/#started"
//                   className="text-17 flex gap-2 items-center bg-primary text-white py-3 px-8 rounded-lg border border-primary hover:text-primary hover:bg-transparent"
//                 >
//                   Get Started
//                   <Icon
//                     icon="solar:alt-arrow-right-linear"
//                     width="13"
//                     height="13"
//                   />
//                 </Link>
//               </div>
//               <div>
//                 <Link
//                   href="/services"
//                   className="text-17 flex gap-2 items-center text-muted dark:text-white/60 hover:text-primary hover:dark:text-primary"
//                 >
//                   See Features
//                   <Icon
//                     icon="solar:alt-arrow-right-linear"
//                     width="13"
//                     height="13"
//                   />
//                 </Link>
//               </div>
//             </div>

//             <div className="lg:my-28 my-12">
//               <p className="text-20 text-muted dark:text-white/60 text-start mb-7">
//                 Trusted by
//               </p>
//               <div className="flex space-x-6 justify-start w-full">
//                 {Heroimage.map((item, index) => (
//                   <Link key={index} href="/">
//                     <Image
//                       src={item.lightimage}
//                       alt="image"
//                       width={115}
//                       height={30}
//                       className="block dark:hidden"
//                       style={{ width: "100%", height: "100%" }}
//                     />
//                     <Image
//                       src={item.darkimage}
//                       alt="image"
//                       width={115}
//                       height={30}
//                       className="hidden dark:block"
//                       style={{ width: "100%", height: "100%" }}
//                     />
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//           <motion.div
//             {...rightAnimation}
//             className="lg:col-span-6 col-span-12 pl-20 lg:block hidden"
//           >
//             <Image
//               src="/images/hero/hero-image.png"
//               // src="/images/hero/hero-image1.png"
//               alt="image"
//               width={498}
//               height={651}
//               className="w-full h-full object-cover"
//             />
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

"use client";
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Phone, Calendar, MessageSquare, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../../../figma/ImageWithFallback';

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <Badge className="bg-blue-500/10 text-blue-300 border-blue-500/20 px-4 py-1.5">
              <span className="mr-2">🤖</span>
              AI-Powered Solution
            </Badge>

            <div className="space-y-4">
              <h1 className="text-white">
                AI-Powered Customer Service
              </h1>
              <h2 className="text-blue-300">
                Never Miss Another Customer Call Again
              </h2>
              <p className="text-slate-300 max-w-xl">
                AI receptionist that answers 24/7, books appointments, and handles customer inquiries — so you can focus on what matters.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started Free
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-white/10">
                Watch Demo
              </Button>
            </div>

            {/* Feature List */}
            <div className="grid sm:grid-cols-2 gap-4 pt-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white mb-1">24/7 Availability</h3>
                  <p className="text-slate-400">Always ready to answer calls</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white mb-1">Auto Booking</h3>
                  <p className="text-slate-400">Schedule appointments instantly</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white mb-1">Smart Responses</h3>
                  <p className="text-slate-400">Handle inquiries intelligently</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-white mb-1">Natural Voice</h3>
                  <p className="text-slate-400">Human-like conversations</p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4 border-t border-slate-700/50">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-slate-300">No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-slate-300">Setup in 5 Minutes</span>
              </div>
            </div>
          </div>

          {/* Right Column - Image Grid */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1553775282-20af80779df7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHNlcnZpY2UlMjBoZWFkc2V0fGVufDF8fHx8MTc2MTYzODU1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Customer Service Representative"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent" />
            </div>

            {/* Floating Cards */}
            <div className="absolute -left-4 top-1/4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-xl max-w-xs">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/90">Incoming Call</p>
                  <p className="text-white/60">Sarah Johnson</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-300">AI Answering...</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 bottom-1/4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-xl max-w-xs">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/90">Appointment Booked</p>
                  <p className="text-white/60">Tomorrow at 2:00 PM</p>
                  <div className="mt-2">
                    <span className="text-blue-300">Michael Chen</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Accent Images */}
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-xl overflow-hidden shadow-xl border-4 border-slate-900">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYxNTQ0MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="AI Technology"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-xl overflow-hidden shadow-xl border-4 border-slate-900">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758786977080-a5e60a3f843c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc2MTY0NDE1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Digital Interface"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-slate-700/50">
          <div className="text-center">
            <div className="text-blue-400 mb-2">10,000+</div>
            <p className="text-slate-400">Calls Handled Daily</p>
          </div>
          <div className="text-center">
            <div className="text-blue-400 mb-2">99.9%</div>
            <p className="text-slate-400">Uptime Guarantee</p>
          </div>
          <div className="text-center">
            <div className="text-blue-400 mb-2">50+</div>
            <p className="text-slate-400">Languages Supported</p>
          </div>
          <div className="text-center">
            <div className="text-blue-400 mb-2">4.9/5</div>
            <p className="text-slate-400">Customer Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Hero;
