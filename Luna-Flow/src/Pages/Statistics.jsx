import React, { useState, useEffect } from 'react';

const Statistics = () => {
  const [cycleData, setCycleData] = useState([]);
  const [moodData, setMoodData] = useState([]);
  const [cravingsData, setCravingsData] = useState([]);

  const fetchData = () => {
    setCycleData([
      { date: '2024-01-01', phase: 'Follicular', mood: 'Energetic' },
      { date: '2024-01-15', phase: 'Ovulation', mood: 'Happy' },
      { date: '2024-02-01', phase: 'Luteal', mood: 'Tired' }
    ]);
    setMoodData([5, 4, 3, 2, 1]);
    setCravingsData(['Chocolate', 'Salty snacks', 'Fruit']);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex font-primary flex-col lg:flex-row h-screen pl-90 pb-14 bg-gradient-to-tl from-cyan-300 to-red-300">
      {/* Main Wrapper with rounded corners */}
      <div className="flex flex-row lg:flex-row justify-center rounded-[3vw] bg-white/50 p-4 m-8 w-full h-full">
        {/* Cycle Data */}
        <div className="bg-white p-6 m-6 rounded-[1.5vw] w-[450px]">
          <h1 className="text-[2vw] text-center font-bold mb-10">Cycle Statistics</h1>
          <h2 className="text-xl font-semibold mb-3">Cycle Data</h2>
          <table className="w-full rounded-[1.5vw]">
            <thead>
              <tr className="bg-gradient-to-br from-red-200/40 to-indigo-200/40 ">
                <th className="border border-indigo-400 p-2">Date</th>
                <th className="border border-indigo-400 p-2">Phase</th>
                <th className="border border-indigo-400 p-2">Mood</th>
              </tr>
            </thead>
            <tbody>
              {cycleData.map((item, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-200/30">
                  <td className="border border-indigo-200 p-2">{item.date}</td>
                  <td className="border border-indigo-200 p-2">{item.phase}</td>
                  <td className="border border-indigo-200 p-2">{item.mood}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mood and Cravings Data */}
        <div className="bg-gray-100/90 p-6 ml-2 m-6 rounded-[1.5vw] w-[300px]">
          <h2 className="text-xl font-semibold mb-3">Mood Tracker</h2>
          <ul className="mb-6 text-indigo-600">
            {moodData.map((mood, index) => (
              <li key={index} className="p-2 border:indigo-400 last:border-b-0">Day {index + 1}: Mood Level {mood}</li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mb-3">Cravings</h2>
          <ul className="text-indigo-600">
            {cravingsData.map((craving, index) => (
              <li key={index} className="p-2 border-indigo last:border-b-0">{craving}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
