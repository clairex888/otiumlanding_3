import React from 'react';

interface WisdomLogoProps {
  className?: string;
  size?: number;
}

export const WisdomLogo: React.FC<WisdomLogoProps> = ({ className = '', size = 40 }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer mystical circle */}
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="url(#outerCircleGradient)"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
        
        {/* Inner knowledge circle */}
        <circle
          cx="20"
          cy="20"
          r="12"
          stroke="url(#innerCircleGradient)"
          strokeWidth="0.8"
          fill="none"
          opacity="0.8"
        />
        
        {/* All-seeing eye - outer eye shape */}
        <ellipse
          cx="20"
          cy="20"
          rx="10"
          ry="6"
          fill="url(#eyeGradient)"
          opacity="0.9"
        />
        
        {/* Pupil/iris */}
        <circle
          cx="20"
          cy="20"
          r="4"
          fill="url(#pupilGradient)"
        />
        
        {/* Inner eye reflection */}
        <circle
          cx="21"
          cy="18.5"
          r="1.2"
          fill="rgba(255, 255, 255, 0.4)"
        />
        
        {/* Mystical geometric patterns around the eye */}
        {/* Top triangle */}
        <path
          d="M20 4 L24 12 L16 12 Z"
          stroke="url(#geometryGradient)"
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
        />
        
        {/* Bottom inverted triangle */}
        <path
          d="M20 36 L24 28 L16 28 Z"
          stroke="url(#geometryGradient)"
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
        />
        
        {/* Left and right mystical marks */}
        <path
          d="M4 20 L12 16 L12 24 Z"
          stroke="url(#geometryGradient)"
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
        />
        
        <path
          d="M36 20 L28 16 L28 24 Z"
          stroke="url(#geometryGradient)"
          strokeWidth="0.8"
          fill="none"
          opacity="0.5"
        />
        
        {/* Central wisdom dot */}
        <circle
          cx="20"
          cy="20"
          r="0.8"
          fill="url(#centerDotGradient)"
        />
        
        {/* Gradients */}
        <defs>
          <linearGradient id="outerCircleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#C084FC" />
          </linearGradient>
          
          <linearGradient id="innerCircleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          
          <radialGradient id="eyeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
            <stop offset="70%" stopColor="rgba(139, 92, 246, 0.2)" />
            <stop offset="100%" stopColor="rgba(99, 102, 241, 0.3)" />
          </radialGradient>
          
          <radialGradient id="pupilGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="60%" stopColor="#312E81" />
            <stop offset="100%" stopColor="#1E1B4B" />
          </radialGradient>
          
          <linearGradient id="geometryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
          
          <radialGradient id="centerDotGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};