'use client';
import { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { firebaseApp } from '@/lib/firebase';

export default function AdminPredictionsPage() {
  const db = getFirestore(firebaseApp);
  const [match, setMatch] = useState('');
  const [prediction, setPrediction] = useState('');
  const [predictions, setPredictions] = useState<any[]>([]);

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    const snapshot = await getDocs(collection(db, 'predictions'));
    setPredictions(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const addPrediction = async () => {
    await addDoc(collection(db, 'predictions'), { match, prediction, user: 'Admin' });
    setMatch('');
    setPrediction('');
    fetchPredictions();
  };

  const deletePrediction = async (id: string) => {
    await deleteDoc(doc(db, 'predictions', id));
    fetchPredictions();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Predictions</h2>
      <input value={match} onChange={e => setMatch(e.target.value)} placeholder="Match" className="border p-2 mr-2" />
      <input value={prediction} onChange={e => setPrediction(e.target.value)} placeholder="Prediction" className="border p-2 mr-2" />
      <button onClick={addPrediction} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
      <ul className="mt-4">
        {predictions.map(p => (
          <li key={p.id} className="flex justify-between items-center border-b py-2">
            {p.match}: <strong>{p.prediction}</strong>
            <button onClick={() => deletePrediction(p.id)} className="text-red-600">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
