'use client';
import { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { firebaseApp } from '@/lib/firebase';

export default function AdminScoresPage() {
  const db = getFirestore(firebaseApp);
  const [match, setMatch] = useState('');
  const [score, setScore] = useState('');
  const [scores, setScores] = useState<any[]>([]);

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    const snapshot = await getDocs(collection(db, 'scores'));
    setScores(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const addScore = async () => {
    await addDoc(collection(db, 'scores'), { match, score });
    setMatch('');
    setScore('');
    fetchScores();
  };

  const deleteScore = async (id: string) => {
    await deleteDoc(doc(db, 'scores', id));
    fetchScores();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Live Scores</h2>
      <input value={match} onChange={e => setMatch(e.target.value)} placeholder="Match" className="border p-2 mr-2" />
      <input value={score} onChange={e => setScore(e.target.value)} placeholder="Score" className="border p-2 mr-2" />
      <button onClick={addScore} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
      <ul className="mt-4">
        {scores.map(s => (
          <li key={s.id} className="flex justify-between items-center border-b py-2">
            {s.match}: <strong>{s.score}</strong>
            <button onClick={() => deleteScore(s.id)} className="text-red-600">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
