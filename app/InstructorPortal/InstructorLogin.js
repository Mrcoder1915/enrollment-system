'use client';

import React, { useState } from 'react';

const InstructorLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await fetch('/api/instructor/instructorLogin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  userName: username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(`Welcome, ${data.userName}`);
    } else {
      alert(data.error || 'Login failed');
    }
  };

  const handleApply = () => {
    alert('Redirecting to application form...');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-red-800 to-white flex flex-col items-center justify-center font-serif">
      <h1 className="text-white text-4xl mb-1 text-center">Instructor Portal</h1>
      <div className="bg-white p-3 rounded-2xl shadow-2xl text-center h-93 w-80 flex flex-col items-center">
        <img src="/usneLogo.png" alt="University Logo" className="w-30 h-30 mb-3" />
        <h2 className="text-red-800 mb-2 leading-tight text-lg font-semibold" style={{ textShadow: '1px 0px 3px #facc15' }}>
          UNIVERSITY OF SOUTHERN<br />NUEVA ECIJA
        </h2>
        <div className="relative mb-3 w-full">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-4 py-1 pr-5 border border-red-800 rounded-full"
          />
          <span className="absolute right-5 top-1.5">👤</span>
        </div>
        <div className="relative mb-5 w-full">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-1 pr-10 border border-red-800 rounded-full"
          />
          <span className="absolute right-5 top-1.5">🔒</span>
        </div>
        <div className="flex justify-end gap-1 w-full">
          <button
            onClick={handleApply}
            className="bg-yellow-400 border-2 border-red-800 text-red-800 rounded text-xs w-[70px] h-[35px]"
          >
            Apply Here
          </button>
          <button
            onClick={handleLogin}
            className="bg-red-800 text-yellow-300 border-2 border-yellow-300 rounded text-xs w-[70px] h-[35px]"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorLogin;
