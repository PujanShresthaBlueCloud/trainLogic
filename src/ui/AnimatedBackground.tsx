// components/animation/AnimatedBackground.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  particleCount?: number;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ particleCount = 16 }) => {
  return (
    <>
      {/* subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12),transparent_50%)]" />

      {/* floating particles */}
      {Array.from({ length: particleCount }).map((_, i) => {
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        return (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-400/30"
            style={{ left: `${left}%`, top: `${top}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
          />
        );
      })}
    </>
  );
};

export default AnimatedBackground;
