"use client";
import { useState, useEffect } from 'react';
import { Button, Spin, Empty } from 'antd';
import { ReloadOutlined, FireOutlined } from '@ant-design/icons';
import axios from 'axios';
import { HoverEffect } from '@/components/Ui/card-hover-effect';
import { motion } from 'framer-motion';

interface FeedbackListProps {
  refreshTrigger?: number;
}

interface Feedback {
  _id: string;
  name: string;
  message: string;
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  data: Feedback[];
}

export default function FeedbackList({ refreshTrigger }: FeedbackListProps) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse>('http://localhost:5001/api/feedback');
      
      if (response.data.success) {
        setFeedbacks(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [refreshTrigger]); // Re-fetch when refreshTrigger changes

  const handleRefresh = () => {
    fetchFeedbacks();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10"
      >
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-4xl md:text-5xl font-bold text-white">Community Feedback</h2>
            <FireOutlined className="text-3xl text-orange-500" />
          </div>
          <p className="text-gray-400 text-lg">
            {feedbacks.length} {feedbacks.length === 1 ? 'feedback' : 'feedbacks'} shared by our community
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            icon={<ReloadOutlined spin={loading} />}
            onClick={handleRefresh}
            loading={loading}
            size="large"
            className="bg-gray-800 hover:bg-gray-700 border-gray-700 hover:border-primary-500 text-white rounded-xl h-12 px-6 font-semibold shadow-lg transition-all duration-300"
          >
            Refresh
          </Button>
        </motion.div>
      </motion.div>

      {loading && feedbacks.length === 0 ? (
        <div className="flex flex-col justify-center items-center py-20">
          <Spin size="large" />
          <p className="text-gray-400 mt-4">Loading feedbacks...</p>
        </div>
      ) : feedbacks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-20"
        >
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <div className="text-gray-400">
                <p className="text-2xl font-semibold mb-2">No feedback yet</p>
                <p className="text-base">Be the first to share your thoughts!</p>
              </div>
            }
            className="text-gray-500"
          />
        </motion.div>
      ) : (
        <HoverEffect items={feedbacks} className="" />
      )}
    </div>
  );
}