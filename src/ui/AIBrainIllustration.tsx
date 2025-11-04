export function AIBrainIllustration({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="200" cy="200" r="180" fill="url(#brainGradient)" opacity="0.1" />
      
      {/* Brain outline */}
      <path
        d="M200 80C150 80 120 100 110 130C100 150 95 180 100 210C105 240 120 270 150 285C180 300 220 300 250 285C280 270 295 240 300 210C305 180 300 150 290 130C280 100 250 80 200 80Z"
        stroke="url(#brainGradient)"
        strokeWidth="3"
        fill="none"
      />
      
      {/* Brain details - left hemisphere */}
      <path
        d="M130 140C135 135 145 130 155 135C165 140 170 150 165 160"
        stroke="url(#brainGradient)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M120 170C125 165 135 165 145 170C155 175 160 185 155 195"
        stroke="url(#brainGradient)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M125 210C130 205 140 205 150 210C160 215 165 225 160 235"
        stroke="url(#brainGradient)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Brain details - right hemisphere */}
      <path
        d="M270 140C265 135 255 130 245 135C235 140 230 150 235 160"
        stroke="url(#brainGradient)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M280 170C275 165 265 165 255 170C245 175 240 185 245 195"
        stroke="url(#brainGradient)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M275 210C270 205 260 205 250 210C240 215 235 225 240 235"
        stroke="url(#brainGradient)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      
      {/* Neural network nodes */}
      <circle cx="150" cy="120" r="6" fill="#8B5CF6" />
      <circle cx="200" cy="110" r="6" fill="#A78BFA" />
      <circle cx="250" cy="120" r="6" fill="#8B5CF6" />
      <circle cx="130" cy="160" r="5" fill="#C4B5FD" />
      <circle cx="270" cy="160" r="5" fill="#C4B5FD" />
      <circle cx="150" cy="200" r="5" fill="#A78BFA" />
      <circle cx="250" cy="200" r="5" fill="#A78BFA" />
      <circle cx="200" cy="240" r="6" fill="#8B5CF6" />
      
      {/* Connecting lines */}
      <line x1="150" y1="120" x2="200" y2="110" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.4" />
      <line x1="200" y1="110" x2="250" y2="120" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.4" />
      <line x1="150" y1="120" x2="130" y2="160" stroke="#A78BFA" strokeWidth="1.5" opacity="0.4" />
      <line x1="250" y1="120" x2="270" y2="160" stroke="#A78BFA" strokeWidth="1.5" opacity="0.4" />
      <line x1="130" y1="160" x2="150" y2="200" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.4" />
      <line x1="270" y1="160" x2="250" y2="200" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.4" />
      <line x1="150" y1="200" x2="200" y2="240" stroke="#A78BFA" strokeWidth="1.5" opacity="0.4" />
      <line x1="250" y1="200" x2="200" y2="240" stroke="#A78BFA" strokeWidth="1.5" opacity="0.4" />
      
      {/* AI text */}
      <text
        x="200"
        y="330"
        textAnchor="middle"
        fill="url(#brainGradient)"
        style={{ fontFamily: '"Fira Code", monospace', fontSize: '24px', fontWeight: 'bold' }}
      >
        AI BRAIN
      </text>
      
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
    </svg>
  );
}
