"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Mic, Smartphone, Phone } from "lucide-react";
import CommunicationNode   from "./CommunicationNode";
import ConnectionLine from "./ConnectionLine";
import CentralHub from "./CentralHub";


export const CommunicationAnimation = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  const radius = Math.min(dimensions.width, dimensions.height) * 0.2;
  type NodeKey = "email" | "chat" | "voice" | "mobile" | "phone";

  const nodePositions: Record<NodeKey, { x: number; y: number }>= {
    email: { x: centerX, y: centerY - radius },
    chat: { x: centerX + radius * 0.95, y: centerY - radius * 0.31 },
    voice: { x: centerX + radius * 0.59, y: centerY + radius * 0.81 },
    mobile: { x: centerX - radius * 0.59, y: centerY + radius * 0.81 },
    phone: { x: centerX - radius * 0.95, y: centerY - radius * 0.31 },
  } as const;

  const nodes = [
    { icon: Mail, label: "Email", color: "bg-blue-500", key: "email", delay: 0 },
    { icon: MessageSquare, label: "Chat", color: "bg-purple-500", key: "chat", delay: 0.1 },
    { icon: Mic, label: "Voice Agent", color: "bg-pink-500", key: "voice", delay: 0.2 },
    { icon: Smartphone, label: "Mobile", color: "bg-emerald-500", key: "mobile", delay: 0.3 },
    { icon: Phone, label: "Telephone", color: "bg-amber-500", key: "phone", delay: 0.4 },
  ];

  const connections : { from: NodeKey; to: NodeKey; color: string; delay: number }[]= [
    { from: "email", to: "chat", color: "#8B5CF6", delay: 0.5 },
    { from: "chat", to: "voice", color: "#EC4899", delay: 0.6 },
    { from: "voice", to: "mobile", color: "#10B981", delay: 0.7 },
    { from: "mobile", to: "phone", color: "#F59E0B", delay: 0.8 },
    { from: "phone", to: "email", color: "#3B82F6", delay: 0.9 },
  ];
  return (
    <div className="relative w-full h-full">
      {/* Connection lines */}
      <div className="absolute inset-0">
        {connections.map((conn, idx) => {
          const fromPos = nodePositions[conn.from];
          const toPos = nodePositions[conn.to];
          if (!fromPos || !toPos) return null;
          return <ConnectionLine key={idx} from={fromPos} to={toPos} delay={conn.delay} color={conn.color} />;
        })}
      </div>

      {/* Nodes */}
      <div className="absolute inset-0">
       {nodes.map(({ key, ...rest }) => {
          const pos = nodePositions[key as keyof typeof nodePositions];
          if (!pos) return null;

          return (
            <CommunicationNode
              key={key} // React key
              {...rest} // everything else except key
              position={`absolute left-[${pos.x}px] top-[${pos.y}px]`}
              // style={{ left: pos.x, top: pos.y, position: 'absolute' }}

            />
          );
        })}
      </div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/20"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}
    </div>
  );
};
