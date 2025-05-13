// src/app/user/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { firebaseApp } from '@/lib/firebase';

export default function UserPanel() {
  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return router.push('/auth');
      setEmail(user.email || '');
      const querySnapshot = await getDocs(collection(db, 'predictions'));
      setPredictions(querySnapshot.docs.map(doc => doc.data()).filter(p => p.user === user.email));
    });
    return () => unsub();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">User Panel</h2>
      <p>Email: {email}</p>
      <h3 className="mt-6 font-semibold text-xl">Your Predictions:</h3>
      <ul className="list-disc ml-6">
        {predictions.map((p, i) => (
          <li key={i}>{p.match}: <strong>{p.prediction}</strong></li>
        ))}
      </ul>
      <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={() => signOut(auth)}>
        Logout
      </button>
    </div>
  );
}
