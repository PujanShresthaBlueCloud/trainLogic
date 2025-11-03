// components/animation/ConnectionLine.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";

export interface Point { x: number; y: number; }

interface ConnectionLineProps {
  from: Point;
  to: Point;
  color?: string; // css color string
  delay?: number;
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({ from, to, color = "#8B5CF6", delay = 0 }) => {
  const id = `path-${Math.round(from.x)}-${Math.round(from.y)}-${Math.round(to.x)}-${Math.round(to.y)}`;
  const d = `M ${from.x} ${from.y} L ${to.x} ${to.y}`;

  return (
    <motion.svg className="absolute inset-0 w-full h-full pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay, duration: 0.8 }}>
      <defs>
        <linearGradient id={`grad-${id}`} x1="0" x2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="50%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0.8" />
        </linearGradient>
      </defs>

      <motion.path
        d={d}
        stroke={`url(#grad-${id})`}
        strokeWidth={2}
        strokeDasharray="8 4"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: delay + 0.2, duration: 1.2, ease: "easeInOut" }}
      />

      {/* moving dot: uses offsetPath style */}
        <motion.circle
        r="4"
        fill={color}
        style={{
            offsetPath: `path('M ${from.x} ${from.y} L ${to.x} ${to.y}')`,
            offsetDistance: "0%",
        }}
        animate={{
            offsetDistance: ["0%", "100%"],
        }}
        transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay,
        }}
        />

    </motion.svg>
  );
};

export default ConnectionLine;
