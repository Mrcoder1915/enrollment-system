"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock } from 'react-icons/fa';

const Page = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/registrarLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed.');
        return;
      }

      router.push('Dashboard');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-primary">
      <div className="text-center">

        <h1 className="text-white text-4xl font-serif mb-1">Registrar Portal</h1>
        <div className="bg-white rounded-3xl shadow-xl p-6 w-[350px] mx-auto">
          <img
            src="/usneLogo.png"
            alt="University Logo"
            className="h-40 mx-auto mb-2"
          />
          <h2
            className="text-lg font-bold text-[#990000] leading-tight"
            style={{ textShadow: '1px 1px #facc15' }}
          >
            UNIVERSITY OF SOUTHERN <br /> NUEVA ECIJA
          </h2>

          <div className="mt-4 space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full pr-10 pl-3 py-2 border border-red-700 rounded-full focus:outline-none focus:ring-2 focus:ring-red-700"
              />
              <FaUser className="absolute top-2.5 right-5 text-gray-400" />
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-10 pl-3 py-2 border border-red-700 rounded-full focus:outline-none focus:ring-2 focus:ring-red-700"
              />
              <FaLock className="absolute top-2.5 right-5 text-gray-400" />
            </div>
          </div>

          
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
          {loading && (
            <p className="text-yellow-500 font-semibold mt-3 animate-pulse">
              Logging in...
            </p>
          )}

          <div className="flex justify-center mt-[20px] ">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="bg-red-700 hover:bg-red-800 text-yellow-300 font-bold py-2 px-4 rounded"
            >
              {loading ? 'Loading...' : 'Log In'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;