"use client";
import { useState } from 'react';
import FeedbackForm from '@/components/FeedbackForm';
import FeedbackList from '@/components/FeedbackList';
import { FloatingParticles } from '@/components/Ui/floating-particles';
import { motion } from 'framer-motion';

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleFeedbackSubmitted = () => {
    // Trigger re-fetch of feedbacks by changing the trigger value
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <FloatingParticles />
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.div className="flex items-center justify-center gap-4 mb-6">
            <motion.img
              src="/logo.png"
              alt="Feedback Collector Logo"
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain rounded-full"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            />
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient bg-300%"
            >
              Feedback Collector
            </motion.h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-gray-400 text-md md:text-lg max-w-3xl mx-auto leading-relaxed"
          >
            Your voice matters. Share your thoughts and see what others are saying in real-time.
          </motion.p>
          
          {/* Stats */}
          
        </motion.div>

        {/* Feedback Form */}
        <FeedbackForm onFeedbackSubmitted={handleFeedbackSubmitted} />

        {/* Divider */}
        <div className="my-16 md:my-20 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 py-2 bg-black text-gray-500 rounded-full border border-gray-800">
              Recent Feedback
            </span>
          </div>
        </div>

        {/* Feedback List */}
        <FeedbackList refreshTrigger={refreshTrigger} />
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="relative z-10 text-center py-8 px-4 text-gray-500 text-sm border-t border-gray-800 mt-20"
      >
        <div className="container mx-auto">
          <p className="mb-2">
            © 2025 <span className="text-primary-400 font-semibold">Feedback Collector</span>. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Developed by Sahan Champathi Weerasinghe
          </p>
        </div>
      </motion.footer>
    </div>
  );
}