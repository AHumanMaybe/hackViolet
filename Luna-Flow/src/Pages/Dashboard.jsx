import UpdateForm from './UpdateForm';
import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useAuth } from "../Contexts/authContext";
import { format } from 'date-fns';

const firebaseConfig = {
    apiKey: "AIzaSyBHZGxb3ckOGzr-Jdrfaxp4kJOJ-m6zqE0",
    authDomain: "hack-violet-32ab4.firebaseapp.com",
    projectId: "hack-violet-32ab4",
    storageBucket: "hack-violet-32ab4.firebasestorage.app",
    messagingSenderId: "33323039241",
    appId: "1:33323039241:web:dcb75895819c3d365856d8",
    measurementId: "G-PLM4DXTTLW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Dashboard = () => {

  const { currentUser, userLoggedIn } = useAuth();
  const [isFormVisible, setFormVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [latestQuestion, setLatestQuestion] = useState(null);

  const formatDate = (date) => {
    return format(date, 'MM/dd/yyyy');
  };

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
    `What’s up, ${name}? How are you feeling today?`,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);

    fetchLatestQuestion(); // Fetch latest questions and trigger AI summary

    return () => clearInterval(timer);
  }, []);

  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  }
  
  const fetchLatestQuestion = async () => {
    if (!userLoggedIn) return; // Ensure userID is provided
    console.log(currentUser.uid)
    // Reference to the registerQuestions document for the specific user
    const registerQuestionsRef = doc(db, currentUser.uid, "registerQuestions"); // Use the specific doc ID if needed
  
    try {
      const docSnap = await getDoc(registerQuestionsRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
  
        // Extract fields with timestamps and find the latest one
        const timestamps = Object.keys(data);
        if (timestamps.length > 0) {
          // Find the most recent timestamp (assuming the field names are in the format "timestamp1", "timestamp2", etc.)
          const latestTimestamp = timestamps.sort((a, b) => b.localeCompare(a))[0];
          const latestQuestion = data[latestTimestamp];
          
          generateSummary(latestQuestion); // Send data to ChatGPT immediately
        }
      } else {
        console.log("No document found!");
      }
    } catch (error) {
      console.error("Error fetching latest question:", error);
    }

  };
  

  const generateSummary = async (questionSet) => {
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

      // Convert questions and answers into a formatted string for ChatGPT
      const questionAnswerText = Object.entries(questionSet)
        .map(([question, answer]) => `${question}: ${answer}`)
        .join("\n");


      console.log(questionAnswerText)

      const prompt = `
        Here is the latest period tracking data:
        ${questionAnswerText}

        Based on this data, please provide:
        1. A brief summary of the user's cycle phase.
        2. A short recommendation for self-care or health tips.
      `;

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 100,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      setChatResponse(response.data.choices[0].message.content);
    } catch (error) {
      setChatResponse("Error fetching AI summary. Please try again.");
    }
    setLoading(false);
  };

  const handleButtonClick = () => {
    console.log("Button clicked!");
    // Add logic for Quick Check-In and Journal Entry here
  };
  
  const handleLearnButton = () => {
    console.log("Learn More clicked!");
    // Add logic for handling Learn More button
  };
  

  return (
    <div className="flex font-primary flex-col lg:flex-row h-screen pl-90 pb-14 bg-gradient-to-tl from-cyan-300 to-red-300 ">
      {/* Main Wrapper with rounded corners */}
      <div className="flex flex-col lg:flex-row rounded-[3vw] bg-white/50 p-6 m-8 w-full h-full">
        
        {/* Left Column: Calendar and Today's Update (Expands to Today) */}
        <div className="flex flex-col w-full lg:w-3/4 space-y-6 p-4">
          {/* Today's Update */}
          <div className="flex flex-col rounded-[1.5vw] bg-white p-4">
            <h1 className="text-[1.3vw] text-center font-bold p-2 w-full">Log Today's Update?</h1>
            <div className="flex space-x-4">
              <button
                onClick={handleButtonClick}
                className="w-full h-[200px] rounded-[1.2vw] drop-shadow-md text-black/70 hover:text-white flex flex-col items-center justify-center text-center text-xl font-semibold
          bg-amber-400/80 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.320,1)]
          hover:rotate-x-6 hover:rotate-y-6 hover:scale-103"
              >
                Quick Check-In
              </button>
              <button
                onClick={handleButtonClick}
                className="w-full h-[200px] rounded-[1.2vw] drop-shadow-md text-black/70 hover:text-white flex flex-col items-center justify-center text-center text-xl font-semibold
          bg-indigo-400/80 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.320,1)]
          hover:rotate-x-6 hover:rotate-y-6 hover:scale-103"
              >
                Journal Entry
              </button>
            </div>
          </div>
       
          {/* Calendar */}
          <div className="flex flex-col bg-white rounded-[1.5vw] p-4">
            <h2 className="text-[1.3vw] text-center font-bold w-full p-2 mb-2">Mini Calendar</h2>
            <Calendar />
          </div>
        </div>
      
        {/* Right Column: Today (Always at the Right) */}
        <div className="flex justify-end w-full lg:w-1/3 ml-auto p-4">
          <div className="flex-1 bg-white/70 rounded-[1.5vw] p-8 w-full max-w-lg">
            <h2 className="text-[1.3vw] font-black text-center m-3">Today</h2>
            <p className="text-2xl text-center text-gray-500">{formatDate(currentTime)}</p>
            <p className="text-[3vw] text-center font-bold m-6">Day 1</p>
            <p className="text-left text-xl">Current phase:</p>
            <p className="text-left text-xl">Expect</p>
            <button
              onClick={handleLearnButton}
              className="text-sm drop-shadow-md bg-indigo-500 m-6 text-white py-2 px-6 rounded-full hover:outline cursor-pointer block mx-auto"
            >
              Learn More
            </button>
            <p className="text-left text-xl pt-10">Upcoming week</p>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Dashboard;
