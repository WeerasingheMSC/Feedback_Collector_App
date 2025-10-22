"use client";
import '@ant-design/v5-patch-for-react-19';
import { ConfigProvider, App } from 'antd';
import React from 'react';

interface AntdProviderProps {
  children: React.ReactNode;
}

export default function AntdProvider({ children }: AntdProviderProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#6366f1',
        },
      }}
    >
      <App>
        {children}
      </App>
    </ConfigProvider>
  );
}
