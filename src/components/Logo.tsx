import React from 'react';

export default function Logo({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <path id="text-path" d="M 30,100 A 70,70 0 0,0 170,100" fill="none" />
      </defs>
      {/* Red Circle Border */}
      <circle cx="100" cy="100" r="80" stroke="#e31837" strokeWidth="20" fill="none" />
      
      {/* Yellow Dots in the Red Border (top half) */}
      {[...Array(15)].map((_, i) => {
        const angle = (i * 12 + 180) * (Math.PI / 180);
        const cx = 100 + 80 * Math.cos(angle);
        const cy = 100 + 80 * Math.sin(angle);
        return <circle key={`dot-${i}`} cx={cx} cy={cy} r="3" fill="#ffcd00" />;
      })}
      
      {/* Yellow Dots in the Red Border (bottom part where text is not) */}
      <circle cx="20" cy="100" r="3" fill="#ffcd00" />
      <circle cx="180" cy="100" r="3" fill="#ffcd00" />

      {/* Palm Trees */}
      {/* Left Tree */}
      <g stroke="#009a44" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M 85,70 C 85,45 70,30 70,30" />
        <path d="M 70,30 C 50,40 50,40 50,40" />
        <path d="M 70,30 C 60,10 60,10 60,10" />
        <path d="M 70,30 C 80,10 80,10 80,10" />
        <path d="M 70,30 C 90,35 90,35 90,35" />
      </g>
      {/* Right Tree */}
      <g stroke="#009a44" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M 115,70 C 115,45 130,30 130,30" />
        <path d="M 130,30 C 150,40 150,40 150,40" />
        <path d="M 130,30 C 140,10 140,10 140,10" />
        <path d="M 130,30 C 120,10 120,10 120,10" />
        <path d="M 130,30 C 110,35 110,35 110,35" />
      </g>
      <path d="M 60,70 Q 100,60 140,70" stroke="#009a44" strokeWidth="4" fill="none" />

      {/* Center Text "Ajwa" */}
      <text x="100" y="115" textAnchor="middle" fill="#e31837" fontSize="48" fontFamily="Georgia, serif" fontWeight="bold">Ajwa</text>

      {/* Crossed Fork and Knife */}
      <g stroke="#009a44" strokeWidth="4" strokeLinecap="round" fill="none">
        {/* Fork */}
        <path d="M 75,130 L 105,160" />
        <path d="M 75,130 L 80,120 M 75,130 L 70,122 M 75,130 L 71,135" strokeWidth="2" />
        {/* Knife */}
        <path d="M 125,130 L 95,160" />
        <path d="M 125,130 C 135,115 125,120 125,120" strokeWidth="3" fill="#009a44" />
      </g>

      {/* Bottom Text "RESTAURANT & FAST FOOD" */}
      <text fill="#ffcd00" fontSize="18" fontWeight="bold" fontFamily="sans-serif">
        <textPath href="#text-path" startOffset="50%" textAnchor="middle">
          RESTAURANT &amp; FAST FOOD
        </textPath>
      </text>
    </svg>
  );
}
