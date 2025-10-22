"use client";
import { useState } from 'react';
import { Form, Input, Button, App } from 'antd';
import { SendOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';
import axios from 'axios';
import { BackgroundGradient } from '@/components/Ui/background-gradient';
import { motion } from 'framer-motion';

const { TextArea } = Input;

interface FeedbackFormProps {
  onFeedbackSubmitted?: () => void;
}

interface FormValues {
  name: string;
  message: string;
}

export default function FeedbackForm({ onFeedbackSubmitted }: FeedbackFormProps) {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const { message } = App.useApp();

  const handleSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5001/api/feedback', values);
      
      if (response.data.success) {
        message.success('Feedback submitted successfully! 🎉');
        form.resetFields();
        
        // Call parent callback to refresh feedback list
        if (onFeedbackSubmitted) {
          onFeedbackSubmitted();
        }
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      message.error(err.response?.data?.message || 'Failed to submit feedback. Please try again.');
      console.error('Error submitting feedback:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto mb-20"
    >
      <BackgroundGradient className="p-8 md:p-10" containerClassName="">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg animate-float">
              <MessageOutlined className="text-3xl text-white" />
            </div>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-3 animate-gradient bg-300%">
            Share Your Feedback
          </h2>
          <p className="text-gray-400 text-base">We value your opinion and would love to hear from you</p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-6"
        >
          <Form.Item
            name="name"
            label={<span className="text-white font-semibold text-base">Your Name</span>}
            rules={[
              { required: true, message: 'Please enter your name' },
              { min: 2, message: 'Name must be at least 2 characters' },
              { max: 50, message: 'Name must not exceed 50 characters' }
            ]}
          >
            <Input
              placeholder="John Doe"
              size="large"
              prefix={<UserOutlined className="text-gray-400" />}
              className="h-12 bg-gray-800/50 border-gray-700 hover:border-primary-500 focus:border-primary-500 rounded-xl text-white placeholder:text-gray-500"
            />
          </Form.Item>

          <Form.Item
            name="message"
            label={<span className="text-white font-semibold text-base">Your Feedback</span>}
            rules={[
              { required: true, message: 'Please enter your feedback' },
              { min: 10, message: 'Feedback must be at least 10 characters' },
              { max: 500, message: 'Feedback must not exceed 500 characters' }
            ]}
          >
            <TextArea
              placeholder="Tell us what you think... Share your experience, suggestions, or any thoughts you'd like us to know."
              rows={5}
              size="large"
              showCount
              maxLength={500}
              className="bg-gray-800/50 border-gray-700 hover:border-primary-500 focus:border-primary-500 rounded-xl text-white placeholder:text-gray-500 resize-none"
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                icon={<SendOutlined />}
                loading={submitting}
                className="w-full bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 hover:from-primary-700 hover:via-purple-700 hover:to-pink-700 border-0 h-14 text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {submitting ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </motion.div>
          </Form.Item>
        </Form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Your feedback helps us improve our service</p>
        </div>
      </BackgroundGradient>
    </motion.div>
  );
}