import React from 'react';
import { motion } from 'motion/react';

// Pure nebula background without graphic symbols
export const NebulaBackground = () => {
  // Generate flowing gas particles
  const gasParticles = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 20,
    duration: 15 + Math.random() * 25,
    size: 2 + Math.random() * 6,
    opacity: 0.1 + Math.random() * 0.3,
    driftSpeed: 0.5 + Math.random() * 2,
  }));

  // Generate larger nebula clouds
  const nebulaClouds = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 120 - 10,
    y: Math.random() * 120 - 10,
    size: 200 + Math.random() * 400,
    rotation: Math.random() * 360,
    duration: 30 + Math.random() * 40,
    opacity: 0.08 + Math.random() * 0.15,
    color: ['indigo', 'purple', 'violet', 'blue', 'pink'][Math.floor(Math.random() * 5)],
  }));

  // Generate cosmic dust streams
  const dustStreams = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    width: 100 + Math.random() * 200,
    height: 20 + Math.random() * 40,
    rotation: Math.random() * 180,
    duration: 20 + Math.random() * 30,
    opacity: 0.03 + Math.random() * 0.08,
  }));

  const getColorVariant = (color: string, opacity: number) => {
    const colors = {
      indigo: `rgba(99, 102, 241, ${opacity})`,
      purple: `rgba(139, 92, 246, ${opacity})`,
      violet: `rgba(168, 85, 247, ${opacity})`,
      blue: `rgba(59, 130, 246, ${opacity})`,
      pink: `rgba(236, 72, 153, ${opacity})`,
    };
    return colors[color as keyof typeof colors] || colors.indigo;
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Deep space gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 via-purple-950 via-violet-950 to-slate-950" />
      
      {/* Secondary gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-indigo-900/30" />
      
      {/* Large nebula clouds with organic movement */}
      {nebulaClouds.map((cloud) => (
        <motion.div
          key={`nebula-${cloud.id}`}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.6}px`,
            background: `radial-gradient(ellipse, 
              ${getColorVariant(cloud.color, cloud.opacity)} 0%, 
              ${getColorVariant(cloud.color, cloud.opacity * 0.7)} 30%, 
              ${getColorVariant(cloud.color, cloud.opacity * 0.4)} 60%, 
              transparent 100%)`,
          }}
          animate={{
            rotate: [cloud.rotation, cloud.rotation + 360],
            scale: [1, 1.3, 0.9, 1.2, 1],
            opacity: [cloud.opacity, cloud.opacity * 1.8, cloud.opacity * 0.6, cloud.opacity * 1.4, cloud.opacity],
            x: [0, 30, -20, 40, 0],
            y: [0, -15, 25, -10, 0],
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Cosmic dust streams */}
      {dustStreams.map((stream) => (
        <motion.div
          key={`dust-${stream.id}`}
          className="absolute blur-2xl"
          style={{
            left: `${stream.x}%`,
            top: `${stream.y}%`,
            width: `${stream.width}px`,
            height: `${stream.height}px`,
            rotate: `${stream.rotation}deg`,
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(139, 92, 246, ${stream.opacity}) 20%, 
              rgba(99, 102, 241, ${stream.opacity * 1.5}) 50%, 
              rgba(168, 85, 247, ${stream.opacity}) 80%, 
              transparent 100%)`,
          }}
          animate={{
            opacity: [stream.opacity, stream.opacity * 2, stream.opacity],
            scaleX: [1, 1.5, 0.8, 1.3, 1],
            x: [0, 50, -30, 0],
          }}
          transition={{
            duration: stream.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Flowing gas particles */}
      {gasParticles.map((particle) => (
        <motion.div
          key={`gas-${particle.id}`}
          className="absolute bg-white rounded-full blur-sm"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
          }}
          animate={{
            x: [0, particle.driftSpeed * 100, particle.driftSpeed * -50, particle.driftSpeed * 150],
            y: [0, particle.driftSpeed * -80, particle.driftSpeed * 60, particle.driftSpeed * -40],
            opacity: [particle.opacity * 0.3, particle.opacity, particle.opacity * 0.5, particle.opacity * 0.8, particle.opacity * 0.3],
            scale: [0.8, 1.4, 0.6, 1.2, 0.8],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Large cosmic energy waves */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `conic-gradient(from 0deg at 30% 70%, 
            transparent 0deg,
            rgba(99, 102, 241, 0.15) 60deg,
            rgba(139, 92, 246, 0.2) 120deg,
            transparent 180deg,
            rgba(168, 85, 247, 0.1) 240deg,
            transparent 300deg,
            rgba(99, 102, 241, 0.1) 360deg)`,
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Ethereal glow layers */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(ellipse 1200px 600px at 20% 40%, 
            rgba(99, 102, 241, 0.3) 0%, 
            transparent 70%)`,
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute inset-0 opacity-8"
        style={{
          background: `radial-gradient(ellipse 800px 400px at 80% 60%, 
            rgba(168, 85, 247, 0.25) 0%, 
            transparent 70%)`,
        }}
        animate={{
          x: [0, -80, 60, 0],
          y: [0, 80, -40, 0],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Galactic center glow */}
      <motion.div 
        className="absolute rounded-full opacity-5"
        style={{
          width: '600px',
          height: '600px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, 
            rgba(139, 92, 246, 0.4) 0%, 
            rgba(99, 102, 241, 0.3) 20%, 
            rgba(168, 85, 247, 0.2) 40%, 
            rgba(59, 130, 246, 0.1) 60%,
            transparent 100%)`,
        }}
        animate={{
          scale: [1, 1.1, 0.95, 1.05, 1],
          opacity: [0.05, 0.15, 0.08, 0.12, 0.05],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};