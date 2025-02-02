import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useAuth } from "../Contexts/authContext";

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

  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [latestQuestion, setLatestQuestion] = useState(null);

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
      const apiKey = //ADD HERE

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

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-6">
        <h1 className="text-4xl font-bold mb-4">{greeting}</h1>

        {/* ChatGPT Response Section */}
        {loading ? (
          <p>Loading summary...</p>
        ) : (
          chatResponse && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h2 className="text-xl font-semibold">Your Summary & Tips:</h2>
              <p>{chatResponse}</p>
            </div>
          )
        )}
      </div>

      <div className="w-1/4 bg-gray-100 p-6 shadow-lg">
        <h2 className="text-2xl font-semibold">Today,</h2>
        <p className="text-2xl">{currentTime.toLocaleDateString()}</p>
        <p className="text-2xl">Day 1</p>
        <p>Current phase:</p>
        <p>Expect</p>
      </div>

      <div className="absolute bottom-0 left-0 right-1/4 top-3/5 bg-gray-200 p-4">
        <h2>Calendar</h2>
        <Calendar />
      </div>
    </div>
  );
};

export default Dashboard;
