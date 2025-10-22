"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import React from "react";
import { Modal } from "antd";
import { UserOutlined, CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";

interface FeedbackItem {
  _id?: string;
  name: string;
  message: string;
  createdAt: string;
}

interface HoverEffectProps {
  items: FeedbackItem[];
  className?: string;
}

interface CardProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
}

interface CardDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

interface CardDateProps {
  className?: string;
  children: React.ReactNode;
}

export const HoverEffect = ({ items, className }: HoverEffectProps) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (item: FeedbackItem) => {
    setSelectedFeedback(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedFeedback(null), 300);
  };

  return (
    <>
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
        {items.map((item: FeedbackItem, idx: number) => (
          <motion.div
            key={item?._id || idx}
            className="relative group block p-2 h-full w-full cursor-pointer"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleCardClick(item)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-gradient-to-r from-primary-500/20 via-purple-500/20 to-pink-500/20 block rounded-3xl animate-shimmer"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card className="">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {item.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {new Date(item.createdAt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
              <CardTitle className="">{item.name}</CardTitle>
              <CardDescription className="">{item.message}</CardDescription>
              <CardDate className="">
                {new Date(item.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </CardDate>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Feedback Detail Modal */}
      <Modal
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={700}
        centered
        className="feedback-modal"
        styles={{
          content: {
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            borderRadius: '24px',
            padding: 0,
          },
          body: {
            padding: 0,
          },
          header: {
            background: 'transparent',
            borderBottom: 'none',
          }
        }}
      >
        {selectedFeedback && (
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold text-3xl shadow-xl animate-float">
                {selectedFeedback.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                  <UserOutlined className="text-primary-400" />
                  {selectedFeedback.name}
                </h2>
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <div className="flex items-center gap-1">
                    <CalendarOutlined />
                    <span>
                      {new Date(selectedFeedback.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockCircleOutlined />
                    <span>
                      {new Date(selectedFeedback.createdAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6"></div>

            {/* Message */}
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                Feedback Message
              </h3>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
                <p className="text-gray-200 leading-relaxed text-base whitespace-pre-wrap">
                  {selectedFeedback.message}
                </p>
              </div>
            </div>

            {/* Footer Stats */}
            <div className="mt-6 flex items-center justify-between text-xs text-gray-500">
              <span>Feedback ID: {selectedFeedback._id?.slice(-8) || 'N/A'}</span>
              <span>Character count: {selectedFeedback.message.length}</span>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export const Card = ({ className, children }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-6 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 group-hover:border-primary-500/50 relative z-20 transition-all duration-300 shadow-xl",
        className
      )}
    >
      <div className="relative z-50">
        {children}
      </div>
    </div>
  );
};

export const CardTitle = ({ className, children }: CardTitleProps) => {
  return (
    <h4 className={cn("text-white font-bold tracking-wide text-xl mb-3", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({ className, children }: CardDescriptionProps) => {
  return (
    <p className={cn("mt-4 text-gray-300 tracking-wide leading-relaxed text-sm line-clamp-4", className)}>
      {children}
    </p>
  );
};

export const CardDate = ({ className, children }: CardDateProps) => {
  return (
    <p className={cn("mt-4 pt-4 border-t border-gray-700/50 text-gray-500 text-xs flex items-center gap-1", className)}>
      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      {children}
    </p>
  );
};
