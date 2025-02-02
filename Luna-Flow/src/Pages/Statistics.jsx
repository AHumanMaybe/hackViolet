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
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-t from-[#A5B4FC] to-[#BAE6FD]">
      <div className="flex flex-row space-x-6">
        {/* Cycle Data */}
        <div className="bg-gray-200 p-6 rounded-lg shadow-md w-[450px]">
          <h1 className="text-3xl font-bold mb-4">Cycle Statistics</h1>
          <h2 className="text-xl font-semibold mb-3">Cycle Data</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-300">
                <th className="border border-gray-400 p-2">Date</th>
                <th className="border border-gray-400 p-2">Phase</th>
                <th className="border border-gray-400 p-2">Mood</th>
              </tr>
            </thead>
            <tbody>
              {cycleData.map((item, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-100">
                  <td className="border border-gray-300 p-2">{item.date}</td>
                  <td className="border border-gray-300 p-2">{item.phase}</td>
                  <td className="border border-gray-300 p-2">{item.mood}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mood and Cravings Data */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-[300px]">
          <h2 className="text-xl font-semibold mb-3">Mood Tracker</h2>
          <ul className="mb-4">
            {moodData.map((mood, index) => (
              <li key={index} className="p-2 border-b last:border-b-0">Day {index + 1}: Mood Level {mood}</li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mb-3">Cravings</h2>
          <ul>
            {cravingsData.map((craving, index) => (
              <li key={index} className="p-2 border-b last:border-b-0">{craving}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
