"use client";
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
