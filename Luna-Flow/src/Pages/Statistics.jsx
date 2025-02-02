import React, { useState, useEffect } from 'react';

const Statistics = () => {
  // State to hold data for statistics, for example cycle data, mood, etc.
  const [cycleData, setCycleData] = useState([]);
  const [moodData, setMoodData] = useState([]);
  const [cravingsData, setCravingsData] = useState([]);

  // Mock function to simulate fetching or updating data.
  const fetchData = () => {
    // Here, we could fetch data from an API or local storage.
    setCycleData([
      { date: '2024-01-01', phase: 'Follicular', mood: 'Energetic' },
      { date: '2024-01-15', phase: 'Ovulation', mood: 'Happy' },
      { date: '2024-02-01', phase: 'Luteal', mood: 'Tired' }
    ]);
    setMoodData([5, 4, 3, 2, 1]); // Example scale data: 1-5 mood tracking
    setCravingsData(['Chocolate', 'Salty snacks', 'Fruit']);
  };

  useEffect(() => {
    fetchData(); // Call the mock data fetch on component mount
  }, []);

  return (
    <div className="statistics-container p-6">
      <h1 className="text-3xl font-bold mb-4">Statistics</h1>

      {/* Display cycle data */}
      <div className="cycle-data mb-8">
        <h2 className="text-2xl font-semibold">Cycle Data</h2>
        <table className="table-auto border-collapse border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Phase</th>
              <th className="border border-gray-300 p-2">Mood</th>
            </tr>
          </thead>
          <tbody>
            {cycleData.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{item.date}</td>
                <td className="border border-gray-300 p-2">{item.phase}</td>
                <td className="border border-gray-300 p-2">{item.mood}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Display mood data */}
      <div className="mood-data mb-8">
        <h2 className="text-2xl font-semibold">Mood Tracker</h2>
        <div className="mood-scale">
          <ul>
            {moodData.map((mood, index) => (
              <li key={index}>Day {index + 1}: Mood Level {mood}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Display cravings data */}
      <div className="cravings-data">
        <h2 className="text-2xl font-semibold">Cravings</h2>
        <ul>
          {cravingsData.map((craving, index) => (
            <li key={index}>{craving}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Statistics;

