// src/app/predictions/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { firebaseApp } from '@/lib/firebase';

export default function PredictionsPage() {
  const db = getFirestore(firebaseApp);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      const snapshot = await getDocs(collection(db, 'predictions'));
      setPredictions(snapshot.docs.map(doc => doc.data()));
    };
    fetchPredictions();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Score Predictions</h2>
      <ul className="list-disc ml-6">
        {predictions.map((p, i) => (
          <li key={i}>{p.match}: <strong>{p.prediction}</strong> (by {p.user})</li>
        ))}
      </ul>
    </div>
  );
}
