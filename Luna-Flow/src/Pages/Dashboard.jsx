import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Dashboard = ({ name }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const greetings = [
    `Good morning, ${name}! Ready to take on the day?`,
    `Hey ${name}, how’s your day going so far?`,
    `Hello, ${name}! How’s everything feeling today?`,
    `Morning, ${name}! How are you today?`,
    `Hi there, ${name}! How’s your mood today?`,
    `How’s it going, ${name}? Feeling good today?`,
    `${name}, how are you holding up today?`,
    `Hey ${name}, keeping busy today?`,
    `Rise and shine, ${name}! How are you doing?`,
    `What’s up, ${name}? How are you feeling today?`
  ];
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);

    return () => clearInterval(timer);
  }, []);

  const handleButtonClick = () => {
 
  };

  const handleLearnButton = () => {

  };

  const formatTime = (time) => {
    return time.toLocaleTimeString();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen pl-64 bg-gradient-to-t from-indigo-300 to-sky-200">
      {/* Main Wrapper with rounded corners */}
      <div className="flex flex-col lg:flex-row rounded-xl bg-white/50 p-6 m-7 w-full h-full">
        
        {/* Left Column: Calendar and Today's Update */}
        <div className="flex flex-col w-full lg:w-1/4 space-y-4 p-6">
          {/* Today's Update */}
          <div className="flex rounded-xl bg-white p-4">
            <h1 className="text-2xl text-center w-full">Log Today's Update?</h1>
            <div className="flex space-x-4">
              <button
                onClick={handleButtonClick}
                className="border p-2 rounded w-full bg-teal-500 text-white"
              >
                Quick Check-In
              </button>
              <button
                onClick={handleButtonClick}
                className="border p-2 rounded w-full bg-indigo-500 text-white"
              >
                Journal Entry
              </button>
            </div>
          </div>
      
          {/* Calendar */}
          <div className="flex bg-white rounded-xl p-4">
            <h2 className="text-center w-full">Calendar</h2>
            <Calendar />
          </div>
        </div>
      
        {/* Center Column: Today */}
        <div className="flex justify-end w-full lg:w-1/2 ml-auto"> {/* This ensures Today section is on the right */}
          <div className="flex-1 bg-white/70 rounded-xl p-6 m-1 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-center m-6">Today</h2>
            <p className="text-2xl text-center text-gray-500">{formatDate(currentTime)}</p>
            <p className="text-2xl text-center font-bold m-10">Day 1</p>
            <p className="text-left">Current phase:</p>
            <p className="text-left">Expect</p>
            <button
              onClick={handleLearnButton}
              className="bg-indigo-500 text-white py-3 px-6 rounded-full hover:bg-indigo-500 cursor-pointer block mx-auto"
            >
              Learn More
            </button>
            <p className="text-left">Upcoming week</p>
          </div>
        </div>
      </div>
    </div>
  );
  
  
  
};

export default Dashboard;
