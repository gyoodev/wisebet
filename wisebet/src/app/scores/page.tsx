// src/app/scores/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { firebaseApp } from '@/lib/firebase';

export default function ScoresPage() {
  const db = getFirestore(firebaseApp);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const snapshot = await getDocs(collection(db, 'scores'));
      setScores(snapshot.docs.map(doc => doc.data()));
    };
    fetchScores();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Live Scores</h2>
      <ul className="list-disc ml-6">
        {scores.map((s, i) => (
          <li key={i}>{s.match}: <strong>{s.score}</strong></li>
        ))}
      </ul>
    </div>
  );
}
