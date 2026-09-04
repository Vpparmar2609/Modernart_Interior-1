"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        setError('Invalid username or password.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center p-6 text-[#EBEBEB]">
      <div className="w-full max-w-md bg-neutral-950 p-8 rounded-3xl border border-neutral-800 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-3xl font-light text-amber-500 mb-2">Studio Access</h1>
        <p className="text-neutral-500 mb-8 text-sm">Please sign in to manage your portfolio.</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Username</label>
            <input 
              type="text" 
              className="w-full bg-neutral-900 border border-neutral-800 p-4 rounded-xl text-white focus:border-amber-500 focus:outline-none transition-colors" 
              value={username} 
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-neutral-900 border border-neutral-800 p-4 rounded-xl text-white focus:border-amber-500 focus:outline-none transition-colors" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-4 px-8 py-4 bg-amber-500 text-neutral-950 font-medium tracking-wide rounded-xl hover:bg-amber-400 transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
