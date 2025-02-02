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
    <div className="flex font-primary flex-col lg:flex-row h-screen pl-90 pb-14 bg-gradient-to-tl from-cyan-300 to-red-300">
      {/* Main Wrapper with rounded corners */}
      <div className="flex flex-row lg:flex-row justify-center rounded-[3vw] bg-white/50 p-30 m-8 w-full h-full">
       <div className="bg-white p-16 rounded-[1.5vw] shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Update Your Information</h2>
        <label className="block mb-2">Age</label>
        <input 
          type="number" 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
          className="border border-indigo-400 p-2 w-full rounded mb-4" 
        />
        <label className="block mb-2">Race</label>
        <input 
          type="text" 
          value={race} 
          onChange={(e) => setRace(e.target.value)} 
          className="border border-indigo-400 p-2 w-full rounded mb-4" 
        />
        <label className="block mb-2">Height (in cm)</label>
        <input 
          type="number" 
          value={height} 
          onChange={(e) => setHeight(e.target.value)} 
          className="border border-indigo-400 p-2 w-full rounded mb-4" 
        />
        <label className="block mb-2">Weight (in kg)</label>
        <input 
          type="number" 
          value={weight} 
          onChange={(e) => setWeight(e.target.value)} 
          className="border border-indigo-400 p-2 w-full rounded mb-4" 
        />
        <button 
          onClick={handleSave} 
          className="w-full p-3 mt-10 mb-15 bg-indigo-300/80 hover:bg-indigo-500 hover:font-semibold text-black hover:text-white rounded-xl cursor-pointer 
                        transition-all duration-300 ease-in-out 
                        hover:shadow-xl hover:shadow-sky-200">
          Save Changes
        </button>
      </div>
    </div>
   </div> 
  );
};

export default Settings;
