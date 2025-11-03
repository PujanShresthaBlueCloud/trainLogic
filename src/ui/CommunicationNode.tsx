import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";
import { LucideProps } from "lucide-react";
import { motion } from "framer-motion";

// Define a type for any Lucide icon
type LucideIcon = ForwardRefExoticComponent<SVGProps<SVGSVGElement> & RefAttributes<SVGSVGElement>>;

interface CommunicationNodeProps {
  icon: LucideIcon; // <-- type the Icon properly
  label: string;
  color: string;
  delay: number;
  style?: React.CSSProperties; // optional, for absolute positioning
  position: string;
}

const CommunicationNode: React.FC<CommunicationNodeProps> = ({ icon: Icon, label, color, delay, style }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, type: "spring" }}
      style={style}
      whileHover={{ scale: 1.15, rotate: 5 }}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay * 0.5,
        }}
        className="relative"
      >
        {/* Outer glow */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: delay * 0.3 }}
          className={`absolute inset-0 rounded-full ${color} blur-xl -z-10`}
        />

        {/* Icon container */}
        <div
          className={`w-20 h-20 rounded-2xl ${color} bg-opacity-20 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl relative overflow-hidden group cursor-pointer`}
        >
          {/* Shine effect */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
          />
          <Icon className={`w-10 h-10 ${color.replace("bg-", "text-")} relative z-10`} />
        </div>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.3 }}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
        >
          <span className="text-sm font-medium text-white/80">{label}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CommunicationNode;
