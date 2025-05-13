// src/app/auth/page.tsx
'use client';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { firebaseApp } from '@/lib/firebase';

export default function AuthPage() {
  const auth = getAuth(firebaseApp);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push(email === 'admin@wisebet.com' ? '/admin' : '/user');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        className="border p-2 mb-3 w-full"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="border p-2 mb-3 w-full"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 w-full rounded" onClick={handleSubmit}>
        {isLogin ? 'Login' : 'Register'}
      </button>
      <p className="mt-4">
        {isLogin ? 'Need an account?' : 'Already have one?'}{' '}
        <button className="text-blue-600 underline" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
}
