// src/app/page.tsx
'use client';
import gsap from 'gsap';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    gsap.from('.title', { y: -50, opacity: 0, duration: 1 });
  }, []);

  return (
    <main className="p-8 text-center">
      <h1 className="title text-4xl font-bold mb-4">Welcome to WiseBet</h1>
      <p className="text-lg text-gray-600">Live scores and predictions powered by AI</p>
    </main>
  );
}
