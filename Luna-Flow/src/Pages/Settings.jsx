import React, { useState } from 'react';

const Settings = () => {
  const [age, setAge] = useState('');
  const [race, setRace] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const handleSave = () => {
    console.log({ age, race, height, weight });
    alert('Settings saved!');
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-t from-[#a5b4fc] to-[#bae6fd]">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Update Your Information</h2>
        <label className="block mb-2">Age</label>
        <input 
          type="number" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
          className="border p-2 w-full rounded mb-4" 
        />
        <label className="block mb-2">Race</label>
        <input 
          type="text" 
          value={race} 
          onChange={(e) => setRace(e.target.value)} 
          className="border p-2 w-full rounded mb-4" 
        />
        <label className="block mb-2">Height (in cm)</label>
        <input 
          type="number" 
          value={height} 
          onChange={(e) => setHeight(e.target.value)} 
          className="border p-2 w-full rounded mb-4" 
        />
        <label className="block mb-2">Weight (in kg)</label>
        <input 
          type="number" 
          value={weight} 
          onChange={(e) => setWeight(e.target.value)} 
          className="border p-2 w-full rounded mb-4" 
        />
        <button 
          onClick={handleSave} 
          className="bg-[#ffffff] text-black p-2 w-full rounded shadow-md hover:bg-gray-200">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
