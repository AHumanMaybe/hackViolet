import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import UpdateForm from './UpdateForm';
import { useAuth } from '../Contexts/authContext';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const greetings = [
    `Good morning, [name]! Ready to take on the day?`,
    `Hey [name], how’s your day going so far?`,
    `Hello, [name]! How’s everything feeling today?`,
    `Morning, [name]! How are you today?`,
    `Hi there, [name]! How’s your mood today?`,
    `How’s it going, [name]? Feeling good today?`,
    `[name], how are you holding up today?`,
    `Hey [name], keeping busy today?`,
    `Rise and shine, [name]! How are you doing?`,
    `What’s up, [name]? How are you feeling today?`
  ];
  const [greeting, setGreeting] = useState('');
  const [isFormVisible, setFormVisible] = useState(false);
  const {currentUser, userLoggedIn} = useAuth();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    if (currentUser && currentUser.email){ 
        console.log(currentUser.email);
        setGreeting(greetings[Math.floor(Math.random() * greetings.length)].replace('[name]', currentUser.email));
    }
    else {
        setGreeting("Helllllloo!!");
    }
    return () => clearInterval(timer);
  }, []);

  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };

  const handleLearnButton = () => {
    // Logic for Learn More button
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
    <div className="flex h-screen">
      <div className="flex-1 p-6">
        <h1 className="text-4xl font-bold mb-4">{greeting}</h1>
      </div>
      <div className="w-1/4 bg-gray-100 p-6 shadow-lg">
        <h2 className="text-2xl font-semibold">Today,</h2>
        <p className="text-2xl">{formatDate(currentTime)}</p>
        <p className="text-2xl">Day 1</p>
        <p>Current phase:</p>
        <p>Expect</p>
        <button
          onClick={handleLearnButton}
          className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-700 cursor-pointer"
        >
          Learn More
        </button>
        <p>Upcoming week</p>
      </div>
      {!isFormVisible && (
        <div className="absolute bottom-2/5 left-0 right-1/4 top-1/5 bg-gray-300 p-4 z-10">
          <h1 className="text-2xl">Log Today's Update?</h1>
          <div className="flex space-x-4">
            <button
              onClick={toggleForm}
              className="border p-2 rounded w-full bg-blue-500 text-white"
            >
              Quick Check-In
            </button>
            <button
              onClick={toggleForm}
              className="border p-2 rounded w-full bg-green-500 text-white"
            >
              Journal Entry
            </button>
          </div>
        </div>
      )}

      {isFormVisible && (
        <div className="absolute bottom-2/5 left-0 right-1/4 top-1/5 bg-gray-300 p-4 z-10">
          <UpdateForm onFormComplete={toggleForm}/>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-1/4 top-3/5 bg-gray-200 p-4">
        <h2>Calendar</h2>
        <Calendar />
      </div>
    </div>
  );
};

export default Dashboard;
