import React from 'react';

/**
 * SDB Digital Logo Component
 * Optimized SVG Logo for Mobile Header & Web Branding
 */
export default function HeaderLogo({ width = 160, height = 38, className = "" }) {
  return (
    <div className={`flex items-center gap-2 cursor-pointer select-none ${className}`}>
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 200 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto max-h-10 w-auto"
        role="img"
        aria-label="SDB DIGITAL Logo"
      >
        <title>SDB DIGITAL</title>
        
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="sdb_gradient" x1="10" y1="10" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00C8FF"/> {/* Electric Blue */}
            <stop offset="100%" stopColor="#10B981"/> {/* Neon Green */}
          </linearGradient>
          <linearGradient id="glow_gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00C8FF" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#10B981" stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* Outer Glow Effect */}
        <circle cx="27" cy="22" r="20" fill="url(#glow_gradient)" />

        {/* Icon: Stylized 'S' with Upward Growth Arrow */}
        <path 
          d="M25 10 C 18 10, 15 15, 15 19 L 15 29 C 15 33, 18 38, 25 38 L 30 38 L 35 33 L 35 24 L 28 24 L 28 29 L 30 29 L 30 33 L 25 33 C 22 33, 20 31, 20 29 L 20 19 C 20 17, 22 14, 25 14 L 30 14 L 35 19 L 42 12 L 35 5 L 30 10 L 25 10 Z" 
          fill="url(#sdb_gradient)"
        />
        
        {/* Text: SDB (Bold) */}
        <text 
          x="55" 
          y="28" 
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
          fontSize="24" 
          fontWeight="800" 
          fill="#FFFFFF"
          letterSpacing="0.5"
        >
          SDB
        </text>
        
        {/* Text: DIGITAL (Accent Light) */}
        <text 
          x="55" 
          y="42" 
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
          fontSize="11" 
          fontWeight="600" 
          fill="#10B981"
          letterSpacing="2.5"
        >
          DIGITAL
        </text>
      </svg>
    </div>
  );
}
