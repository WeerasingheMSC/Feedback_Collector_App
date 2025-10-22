"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface BackgroundGradientProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: BackgroundGradientProps) => {
  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <motion.div
        animate={animate ? {
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        } : undefined}
        transition={animate ? {
          duration: 5,
          ease: "linear",
          repeat: Infinity,
        } : undefined}
        className="absolute inset-0 rounded-3xl z-1 opacity-60 group-hover:opacity-100 blur-xl transition duration-500"
        style={{
          backgroundSize: "400% 400%",
          background: "linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #f7b731, #ff6b6b)",
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={cn("relative z-10 bg-gray-900 rounded-3xl", className)}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};
