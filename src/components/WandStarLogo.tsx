import React from 'react';
import { motion } from 'motion/react';

interface WandStarLogoProps {
  className?: string;
  size?: number;
}

export const WandStarLogo: React.FC<WandStarLogoProps> = ({ className = '', size = 40 }) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, 3, -3, 0] }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Wand body */}
        <motion.path
          d="M6 34 L18 22"
          stroke="url(#wandBodyGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        />
        
        {/* Wand handle decoration */}
        <motion.circle
          cx="6"
          cy="34"
          r="2.5"
          fill="url(#handleGradient)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        />
        
        {/* Star at the tip */}
        <motion.g
          initial={{ scale: 0, rotate: 0 }}
          animate={{ 
            scale: 1,
            rotate: [0, 360]
          }}
          transition={{ 
            scale: { duration: 0.8, delay: 1.5 },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
        >
          {/* Main star shape */}
          <path
            d="M18 6 L20.5 13.5 L28 16 L20.5 18.5 L18 26 L15.5 18.5 L8 16 L15.5 13.5 Z"
            fill="url(#starGradient)"
            stroke="url(#starStroke)"
            strokeWidth="0.5"
          />
          
          {/* Inner star for depth */}
          <path
            d="M18 10 L19.5 15 L24 16 L19.5 17 L18 22 L16.5 17 L12 16 L16.5 15 Z"
            fill="url(#innerStarGradient)"
          />
        </motion.g>
        
        {/* Magical sparkles around the star */}
        <motion.g>
          {/* Small sparkle 1 */}
          <motion.circle
            cx="26"
            cy="8"
            r="1"
            fill="url(#sparkleGradient1)"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: 2
            }}
          />
          
          {/* Small sparkle 2 */}
          <motion.circle
            cx="10"
            cy="10"
            r="0.8"
            fill="url(#sparkleGradient2)"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.3, 1.2, 0.3]
            }}
            transition={{ 
              duration: 1.8,
              repeat: Infinity,
              delay: 2.5
            }}
          />
          
          {/* Small sparkle 3 */}
          <motion.circle
            cx="28"
            cy="24"
            r="0.6"
            fill="url(#sparkleGradient3)"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.4, 1.3, 0.4]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              delay: 1.8
            }}
          />
        </motion.g>
        
        {/* Magical aura/glow */}
        <motion.circle
          cx="18"
          cy="16"
          r="12"
          fill="none"
          stroke="url(#auraGradient)"
          strokeWidth="0.5"
          opacity="0.3"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0, 0.3, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            delay: 2
          }}
        />
        
        {/* Gradients and effects */}
        <defs>
          <linearGradient id="wandBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#C084FC" />
          </linearGradient>
          
          <radialGradient id="handleGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#4F46E5" />
          </radialGradient>
          
          <radialGradient id="starGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </radialGradient>
          
          <radialGradient id="innerStarGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FBBF24" />
          </radialGradient>
          
          <linearGradient id="starStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          
          <radialGradient id="sparkleGradient1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </radialGradient>
          
          <radialGradient id="sparkleGradient2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </radialGradient>
          
          <radialGradient id="sparkleGradient3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#3B82F6" />
          </radialGradient>
          
          <radialGradient id="auraGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
            <stop offset="70%" stopColor="rgba(139, 92, 246, 0.4)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
          </radialGradient>
        </defs>
      </motion.svg>
    </div>
  );
};