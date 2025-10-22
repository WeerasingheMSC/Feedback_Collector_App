"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Particle {
  id: number;
  width: number;
  height: number;
  left: number;
  top: number;
  color: string;
  xOffset: number;
  duration: number;
  delay: number;
}

export const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    const colors = [
      'rgba(59, 130, 246, 0.4)', // primary-500
      'rgba(147, 51, 234, 0.4)', // purple-600
      'rgba(236, 72, 153, 0.4)'  // pink-500
    ];
    
    const generatedParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      width: Math.random() * 6 + 2,
      height: Math.random() * 6 + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      color: colors[Math.floor(Math.random() * 3)],
      xOffset: Math.random() * 20 - 10,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 2,
    }));
    
    setParticles(generatedParticles);
  }, []);
  
  if (particles.length === 0) {
    // Return empty div during SSR to avoid hydration mismatch
    return <div className="absolute inset-0 overflow-hidden pointer-events-none" />;
  }
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.width,
            height: particle.height,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            background: `radial-gradient(circle, ${particle.color}, transparent)`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, particle.xOffset, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};