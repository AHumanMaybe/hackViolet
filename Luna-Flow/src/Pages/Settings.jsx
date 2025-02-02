import React, { useState } from 'react';

const Settings = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('light');

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-t from-indigo-300 to-sky-200">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <label className="block mb-2">Username:</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Enter username" 
          className="border p-2 w-full rounded mb-4" 
        />
        <label className="block mb-2">Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter email" 
          className="border p-2 w-full rounded mb-4" 
        />

        <h2 className="text-xl font-semibold mb-4">Preferences</h2>
        <div className="flex items-center mb-4">
          <input 
            type="checkbox" 
            checked={notifications} 
            onChange={() => setNotifications(!notifications)} 
            className="mr-2" 
          />
          <label>Enable Notifications</label>
        </div>
        <label className="block mb-2">Theme:</label>
        <select 
          value={theme} 
          onChange={(e) => setTheme(e.target.value)} 
          className="border p-2 w-full rounded mb-4"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        
        <button className="bg-blue-500 text-white p-2 w-full rounded">Save Changes</button>
      </div>
    </div>
  );
};

export default Settings;
