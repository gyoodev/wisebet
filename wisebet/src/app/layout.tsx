// src/app/layout.tsx
import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'WiseBet',
  description: 'Smart betting predictions and live scores',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
