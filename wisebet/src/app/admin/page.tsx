// src/app/admin/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { firebaseApp } from '@/lib/firebase';

export default function AdminPanel() {
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const router = useRouter();
  const [scores, setScores] = useState([]);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user || user.email !== 'admin@wisebet.com') return router.push('/auth');
      const scoresSnap = await getDocs(collection(db, 'scores'));
      const predictionsSnap = await getDocs(collection(db, 'predictions'));
      setScores(scoresSnap.docs.map(doc => doc.data()));
      setPredictions(predictionsSnap.docs.map(doc => doc.data()));
    });
    return () => unsub();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <h3 className="font-semibold text-xl mt-6 mb-2">Live Scores</h3>
      <ul className="list-disc ml-6">
        {scores.map((s, i) => (
          <li key={i}>{s.match}: <strong>{s.score}</strong></li>
        ))}
      </ul>
      <h3 className="font-semibold text-xl mt-6 mb-2">User Predictions</h3>
      <ul className="list-disc ml-6">
        {predictions.map((p, i) => (
          <li key={i}>{p.match} by {p.user}: <strong>{p.prediction}</strong></li>
        ))}
      </ul>
      <button className="mt-6 px-4 py-2 bg-red-500 text-white rounded" onClick={() => signOut(auth)}>
        Logout
      </button>
    </div>
  );
}
