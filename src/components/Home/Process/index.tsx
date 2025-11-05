"use client";
import { motion, useInView } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { PaymentImage } from "@/app/api/data";
import Image from "next/image";
import { Brain, Rocket, Wrench, Play, CirclePlay} from "lucide-react";
// import { motion } from "framer-motion";

const steps = [
  {
    title: "Build & Train",
    content: "We train the AI using your business info, FAQs, and workflows.",
    icon: Brain,
    color: "text-blue-300",
  },
  {
    title: "Test & Launch",
    content: "You test it — we refine and go live.",
    icon: Rocket,
    color: "text-green-300",
  },
  {
    title: "Optimise & Support",
    content: "Monthly reports, AI tuning, and local support.",
    icon: Wrench,
    color: "text-purple-300",
  },
];

const Process: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref);

  const TopAnimation = {
    initial: { y: "-100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "-100%", opacity: 0 },
    transition: { duration: 1, delay: 0.4 },
  };

  const bottomAnimation = (index: any) => ({
    initial: { y: "100%", opacity: 0 },
    animate: inView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 },
    transition: { duration: 1, delay: 0.4 + index * 0.4 },
  });

  const paymentItems = [
    { 
      name: "Discovery Meeting",
      icon: "Binoculars",
      description: "Tell us about your business and see a live demo",
    },
    {
      name: "Proposal & Plan",
      icon: "NotebookPen",
      description: "Get a tailored quote with clear ROI estimates",
    }
  ];

  // === TYPED REFS & STATE ===
  // typed container ref
  const containerRef = useRef<HTMLDivElement | null>(null);

  // === FIX START ===
  // typed icon refs array: each item is HTMLDivElement | null
  // this fixes the 'points' typing problem because we can rely on DOMRect from each element
  const iconRefs = useRef<Array<HTMLDivElement | null>>([]);
  // === FIX END ===

  const [svgSize, setSvgSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [pathD, setPathD] = useState("");

  useEffect(() => {
    const compute = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      setSvgSize({ w: rect.width, h: rect.height });

      // === FIX START ===
      // Explicit Point type and typed points array to avoid `any[]` inference
      type Point = { x: number; y: number; anchor: "top" | "bottom"; index: number };
      const points: Point[] = [];

      // gather icon centers (relative to container) and whether they should be top/bottom
      iconRefs.current.forEach((el, idx) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2 - rect.left;
        const useTop = idx % 2 === 0;
        const cy = useTop ? r.top - rect.top + 8 : r.bottom - rect.top - 8;
        points.push({ x: cx, y: cy, anchor: useTop ? "top" : "bottom", index: idx });
      });
      // === FIX END ===

      if (points.length < 2) {
        setPathD("");
        return;
      }

      // Build the cubic Bezier path using points (keep your existing approach)
      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const x0 = points[i].x;
        const y0 = points[i].y;
        const x1 = points[i + 1].x;
        const y1 = points[i + 1].y;
        const dx = x1 - x0;
        const cp1x = x0 + dx * 0.35;
        const cp2x = x0 + dx * 0.65;
        const magnitude = Math.max(60, Math.abs(dx) * 0.15);
        const sign = i % 2 === 0 ? 1 : -1;
        const cp1y = y0 + magnitude * sign;
        const cp2y = y1 - magnitude * sign;
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x1} ${y1}`;
      }

      setPathD(d);
    };

    compute();
    const ro = new ResizeObserver(compute);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  return (
    <section id="process" className="dark:bg-darkmode py-10">
      <div ref={ref} className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <motion.div {...TopAnimation}>
          <div className="px-4 lg:px-12">
            <h2 className="text-center font-semibold md:text-35 sm:text-28 text-24 mb-18 text-midnight_text dark:text-white lg:mx-44">
              Automate your customer service, capture more leads, and free up your team’s time.
              <p className="text-center font-semibold md:text-25 sm:text-20 text-20 mb-18 text-midnight_text dark:text-white lg:mx-44">
                <span className="text-primary">All powered by  Australian-built AI  that speaks your language.</span>
              </p>
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-10">
            {paymentItems.map((item, index) => (
                <div>
                  <p
                    key={index}
                    className={`flex items-center justify-center gap-2  /* 🔹 Flex alignment */
                      text-blue-500 dark:text-white/60 
                      md:text-18 text-base font-medium relative 
                      ${
                        index !== paymentItems.length - 1
                          ? "after:content-[''] after:absolute after:w-0.5 after:h-3/4 after:bg-muted after:rounded-full after:-right-5 after:top-0.5"
                          : ""
                      }`}
                  >
                    <CirclePlay className="w-5 h-5" />  {/* 🔹 Optional: control icon size */}
                    {item.name}
                  </p>

                  <p className="text-gray-600 text-base leading-relaxed text-center">
                    {item.description}
                  </p>
                </div>
              ))}
          </div>
        </motion.div>

        <div className="flex justify-start sm:mt-20 mt-10">
          <div className="max-w-5xl mx-auto relative" ref={containerRef}>
            {svgSize.w > 0 && (
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                width={svgSize.w}
                height={svgSize.h}
                viewBox={`0 0 ${svgSize.w} ${svgSize.h}`}
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  id="connectorPath"
                  d={pathD}
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity={0.18}
                />

                {/* Animated play icon traveling along the path */}
                <g>
                  <g>
                    <Play width={20} height={20} fill="#8B5CF6" className="stroke-none" transform="translate(0,-8)" />
                    <animateMotion dur="25s" repeatCount="indefinite" rotate="auto">
                      <mpath href="#connectorPath" />
                    </animateMotion>
                  </g>
                </g>
              </svg>
            )}

            <div className="grid sm:grid-cols-3 gap-10 relative z-10">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="group bg-transparent text-center p-8 rounded-2xl hover:border-purple-400 hover:shadow-lg transition-all duration-300 border  :border-purple-500"
                  >
                    <div ref={(el) => { iconRefs.current[index] = el; }} className="flex justify-center mb-6">
                      <Icon className={`w-12 h-12 ${step.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-base leading-relaxed">{step.content}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
