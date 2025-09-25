import React from 'react';
import { motion } from 'motion/react';

export const MagicalTitle = () => {
  const titleWords = [
    { text: "AI-Powered", delay: 0 },
    { text: "Memory", delay: 0.2 },
    { text: "Sanctum", delay: 0.4 },
  ];

  const subtitleWords = [
    { text: "for", delay: 0.6 },
    { text: "Elite", delay: 0.8 },
    { text: "Investors", delay: 1.0 },
  ];

  return (
    <div className="relative">
      {/* Main title with magical floating effect */}
      <div className="text-5xl md:text-7xl mb-8 leading-tight">
        {titleWords.map((word, index) => (
          <motion.span
            key={`title-${index}`}
            className="inline-block mr-4 relative"
            initial={{ opacity: 0, y: 50, rotateX: -90 }}
            animate={{ 
              opacity: 1, 
              y: [0, -8, 0], 
              rotateX: 0,
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: word.delay },
              rotateX: { duration: 0.8, delay: word.delay },
              y: {
                duration: 4,
                delay: word.delay + 1,
                repeat: Infinity,
                ease: "easeInOut",
              }
            }}
            style={{
              background: 'linear-gradient(45deg, #e0e7ff 0%, #c7d2fe 25%, #a5b4fc 50%, #8b5cf6 75%, #7c3aed 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontFamily: "'Cinzel', 'Times New Roman', serif",
              fontWeight: 600,
              textShadow: '0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3), 0 0 90px rgba(139, 92, 246, 0.2)',
            }}
          >
            {word.text}
            
            {/* Magical glow effect behind each word */}
            <motion.div
              className="absolute inset-0 blur-xl opacity-30"
              style={{
                background: 'linear-gradient(45deg, #8b5cf6, #a855f7, #c084fc)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontFamily: "'Cinzel', 'Times New Roman', serif",
                fontWeight: 600,
              }}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                delay: word.delay + 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {word.text}
            </motion.div>
            

          </motion.span>
        ))}
        
        <br />
        
        {/* Subtitle with elegant floating */}
        {subtitleWords.map((word, index) => (
          <motion.span
            key={`subtitle-${index}`}
            className="inline-block mr-3 text-white font-light relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: 1, 
              y: [0, -5, 0],
            }}
            transition={{ 
              opacity: { duration: 0.6, delay: word.delay },
              y: {
                duration: 5,
                delay: word.delay + 1,
                repeat: Infinity,
                ease: "easeInOut",
              }
            }}
            style={{
              fontFamily: "'Cinzel', 'Times New Roman', serif",
              textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
            }}
          >
            {word.text}
            
            {/* Subtle glow for subtitle */}
            <motion.div
              className="absolute inset-0 text-white opacity-20 blur-sm"
              style={{
                fontFamily: "'Cinzel', 'Times New Roman', serif",
                fontWeight: 300,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4,
                delay: word.delay + 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {word.text}
            </motion.div>
          </motion.span>
        ))}
      </div>
      
      {/* Magical aura around the entire title */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 800px 400px at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};