// components/animation/CentralHub.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";

interface CentralHubProps {
  size?: number; // default 128
}

const CentralHub: React.FC<CentralHubProps> = ({ size = 128 }) => {
  const px = size;
  return (
    <div style={{ width: px, height: px }} className="relative">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.9, type: "spring" }} className="relative w-full h-full">
        <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 border-dashed" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-4 rounded-full border-2 border-purple-500/20" />
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-8 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl" />
        <div className="absolute inset-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-2xl flex items-center justify-center border border-white/20">
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
            <div className="w-2 h-2 rounded-full bg-white" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CentralHub;
