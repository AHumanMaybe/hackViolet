import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from 'date-fns';
import { useAuth } from "../Contexts/authContext";
import InfoCard from "../Components/InfoCard";
import MultCard from "../Components/MultCard";
import Journal from "../Components/Journal";
import axios from "axios";

// Firebase configuration
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
  
  const [view, setView] = useState('calendar'); // 'calendar', 'quickCheckIn', 'journalEntry'
  const [chatResponse, setChatResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDay, setCurrentDay] = useState(1);
  const [phase, setPhase] = useState('');
  const [greeting, setGreeting] = useState('');
  const [isFormVisible, setFormVisible] = useState(false);
  const { currentUser, userLoggedIn } = useAuth();

  const cards = [
    { id: 1, type: "multi", question: "Period today?", options: ["Spotting", "Light", "Medium", "Heavy", "Super Heavy", "Skip"] },
    { id: 2, type: "multi", question: "How are you feeling?", options: ["Fine", "Happy", "Sad", "Angry/Irritable", "Indifferent", "Grateful", "Skip"] },
    { id: 3, type: "multi", question: "Was there any pain?", options: ["Cramping", "Headache", "Breast Tenderness", "Ovulation", "Lower Back", "Skip"] },
    { id: 4, type: "multi", question: "Sex life?", options: ["Protected", "Unprotected", "Withdrawal", "High Sex Drive", "Low Sex Drive", "Skip"] },
    { id: 5, type: "multi", question: "Did you have any energy today?", options: ["Productive", "Exhausted", "Energized", "Tired", "Brain Fog", "Skip"] },
    { id: 6, type: "multi", question: "How was your mindset?", options: ["Motivated", "Unmotivated", "Brain Fog", "Stressed"] },
    { id: 7, type: "multi", question: "Cravings", options: ["Sweet", "Spicy", "Salty", "Greasy", "Carbs", "Skip"] },
    { id: 8, type: "info", question: "Take any medication today?" },
    { id: 9, type: "info", question: "Did you exercise today?" },
    { id: 10, type: "multi", question: "How much sleep did you get last night?", options: ["0 hr", "1-3 hr", "3-6 hr", "6-9 hr", "9+ hr"] },
    { id: 11, type: "info", question: "Weight" }
  ];
  
  const handleAnswerChange = (id, value) => {
    const questionText = cards.find(card => card.id === id).question;
    setAnswers((prev) => ({ ...prev, [questionText]: value }));
  };

  const handleLearnButton = () => {
    const phaseUrls = {
      "Period": "https://www.betterhealth.vic.gov.au/health/conditionsandtreatments/menstrual-cycle",
      "Follicular Phase": "https://www.healthline.com/health/womens-health/follicular-phase",
      "Ovulation": "https://www.mayoclinic.org/tests-procedures/ovulation-prediction-kits/about/pac-20393607",
      "Luteal Phase": "https://www.verywellhealth.com/luteal-phase-2619135",
    };
  
    // Redirect user to the corresponding phase website
    const url = phaseUrls[phase] || "https://flo.health/menstrual-cycle"; // Default to general info
    window.location.href = url;
  };

  const formatTimestamp = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  };

  const handleNext = async () => {
    if (currentIndex < cards.length - 1) {
        setCurrentIndex((prev) => prev + 1);
    } else {
        console.log("Final Answers:", answers);
        try {
            const timestamp = formatTimestamp();
            await setDoc(doc(db, currentUser.uid, "registerQuestions"), {
                [timestamp]: answers
            }, { merge: true });

            console.log("Data successfully sent to Firebase!");
            setView("calendar");
        } catch (error) {
            console.error("Error writing to Firestore:", error);
        }
    }
  };

  const greetings = [
      `Good morning, ${currentUser ? currentUser.email.substring(0, currentUser.email.indexOf("@")) : 'there'}! Ready to take on the day?`,
      `Hey ${currentUser ? currentUser.email.substring(0, currentUser.email.indexOf("@")) : 'there'}, how’s your day going so far?`,
      `Hello, ${currentUser ? currentUser.email.substring(0, currentUser.email.indexOf("@")) : 'there'}! How’s everything feeling today?`,
      `Morning, ${currentUser ? currentUser.email.substring(0, currentUser.email.indexOf("@")) : 'there'}! How are you today?`,
      `Hi there, ${currentUser ? currentUser.email.substring(0, currentUser.email.indexOf("@")) : 'there'}! How’s your mood today?`,
      `How’s it going, ${currentUser ? currentUser.email.substring(0, currentUser.email.indexOf("@")) : 'there'}? Feeling good today?`,
      `${currentUser ? currentUser.email.substring(0, currentUser.email.indexOf("@")) : 'there'}, how are you holding up today?`,
      `Hey ${currentUser ? currentUser.email.substring(0, currentUser.email.indexOf("@")) : 'there'}, keeping busy today?`,
      `Rise and shine, ${currentUser ? currentUser.email.substring(0, currentUser.email.indexOf("@")) : 'there'}! How are you doing?`,
      `What’s up, ${currentUser ? currentUser.email.substring(0, currentUser.email.indexOf("@")) : 'there'}? How are you feeling today?`
  ];

  useEffect(() => {
      const timer = setInterval(() => {
          setCurrentTime(new Date());
      }, 1000);
      
      const fetchAndLogCycleStartDate = async () => {
          const startDate = await fetchCycleInfo();
          const today = new Date();
          const diffTime = Math.abs(today - startDate);
          const dayOfCycle = Math.floor(diffTime / (1000 * 60 * 60 * 24)) % 28 + 1;
          setCurrentDay(dayOfCycle);
        
          if (dayOfCycle >= 1 && dayOfCycle <= 5) {
              setPhase('Period');
          } else if (dayOfCycle >= 6 && dayOfCycle <= 13) {
              setPhase('Follicular Phase');
          } else if (dayOfCycle === 14) {
              setPhase('Ovulation');
          } else if (dayOfCycle >= 15 && dayOfCycle <= 28) {
              setPhase('Luteal Phase');
          }
      }

      fetchLatestQuestion();

      fetchAndLogCycleStartDate();        

      if (currentUser && currentUser.email) {
          setGreeting(greetings[Math.floor(Math.random() * greetings.length)]);
      } else {
          setGreeting("Hello! Ready for today?");
      }
      return () => clearInterval(timer);
  }, [currentUser]);

  const fetchCycleInfo = async () => {
    // Make sure to implement your logic to fetch the cycle start date
    return new Date(); // Placeholder return value for now
  }

  const handleButtonClick = (type) => {
      setView(type);
  };

  const closeView = () => {
      setView('calendar');
  };

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

        respond without a numbered list and speak in the 2nd person using "you" and "your"
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
    <div className="flex font-primary flex-col lg:flex-row h-screen pl-85 pb-14 bg-gradient-to-tl from-cyan-300 to-red-300 ">
      {/* Main Wrapper with rounded corners */}
      <div className="flex flex-col lg:flex-row rounded-[3vw] bg-white/50 p-4 m-8 w-full h-full overflow-y-auto">
        {/* Greeting and Chat Response in a flex column, above the Log Today's Update */}
        <div className="flex flex-col items-center lg:w-1/2 m-4 w-full" >
          <div className="flex flex-col h-full justify-between space-y-4 items-center rounded-[1.2vw]">
            <h1 className="text-[2vw] font-bold mt-25 mb-4 ml-3 text-transparent bg-clip-text font-extrabold bg-gradient-to-tr from-rose-800/80 to-blue-800/80">{greeting}</h1>
          </div>
          <div className="flex flex-col items-center rounded-[1.2vw] bg-white p-6">
            <h2 className="text-xl">{loading ? "Loading..." : chatResponse}</h2>
          </div>
        </div>
  
        {/* Left Column: Calendar and Today's Update (Expands to Today) */}
        <div className="flex flex-col w-full lg:w-3/4 space-y-6 p-4 items-stretch flex-1">
          {/* Today's Update */}
          <div className="flex flex-col rounded-[1.5vw] bg-white p-4">
            <h1 className="text-[1.3vw] text-center font-bold p-2 pb-4 w-full">Log Today's Update?</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => handleButtonClick('quickCheckIn')}
                className="w-full h-[200px] rounded-[1.2vw] drop-shadow-md text-black/70 hover:text-white flex flex-col items-center justify-center text-center text-xl font-semibold
            bg-amber-400/80 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.320,1)]
            hover:rotate-x-6 hover:rotate-y-6 hover:scale-103"
              >
                Quick Check-In
              </button>
              <button
                onClick={() => handleButtonClick('journalEntry')}
                className="w-full h-[200px] rounded-[1.2vw] drop-shadow-md text-black/70 hover:text-white flex flex-col items-center justify-center text-center text-xl font-semibold
            bg-indigo-400/80 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.320,1)]
            hover:rotate-x-6 hover:rotate-y-6 hover:scale-103"
              >
                Journal Entry
              </button>
            </div>
          </div>
          {/* Conditional rendering */}
          {view === 'calendar' && (
            <div className="flex flex-col bg-white rounded-[1.5vw] p-4 h-full justify-between space-y-4">
              <h2 className="text-[1.3vw] text-center font-bold mb-4">Mini Calendar</h2>
                <div className="w-full flex justify-center">
                  <Calendar />
               </div>
            </div>
          )}
  
          {view === 'quickCheckIn' && (
            <div className="flex flex-col bg-white rounded-xl p-2 relative">
            {cards[currentIndex].type === "info" ? (
              <InfoCard
                key={cards[currentIndex].id}
                id={cards[currentIndex].id}
                question={cards[currentIndex].question}
                onAnswerChange={handleAnswerChange}
              />
            ) : (
              <MultCard
                key={cards[currentIndex].id}
                id={cards[currentIndex].id}
                question={cards[currentIndex].question}
                options={cards[currentIndex].options}
                onAnswerSelect={handleAnswerChange}
              />
            )}
          
            {/* Next Button Wrapper */}
            <div className="flex justify-center mt-4">
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-indigo-500 text-white font-semibold pl-10 pr-10 rounded-full shadow-md hover:bg-indigo-600 transition"
              >
                {currentIndex === cards.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          
            {/* Close Button Wrapper */}
            <div className="absolute top-4 right-4">
              <button
                onClick={closeView}
                className="text-gray-500 hover:text-red-500 transition"
              >
                ✖
              </button>
            </div>
          </div>
          
          )}
  
          {view === 'journalEntry' && (
            <div className="flex bg-white rounded-xl p-4 relative">
              <button
                onClick={closeView}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              >
                ✖
              </button>
              <Journal />
            </div>
          )}
        </div>
  
        {/* Right Column: Today (Always at the Right) */}
        <div className="flex justify-end w-full lg:w-1/2 ml-auto p-4">
          <div className="flex-1 bg-white rounded-[1.5vw] p-8 w-full max-w-lg overflow-y-auto">
            <h2 className="text-[1.3vw] font-black text-center m-3">Today</h2>
            <p className="text-2xl text-center text-gray-500">{formatTimestamp(currentTime).substring(0, formatTimestamp(currentTime).indexOf("_"))}</p>
            <p className="text-[3vw] text-center font-bold m-6">Day {currentDay}</p>
            <p className="text-left text-xl text-indigo-500 font-regular">Current phase:</p>
            <p className="text-left text-3xl font-semibold">{phase}</p>
            <p className="text-left text-lg"></p>
            <button
              onClick={handleLearnButton}
              className="text-lg drop-shadow-lg bg-indigo-500/90 mt-40 hover:font-bold text-white py-2 px-6 rounded-full hover:outline cursor-pointer block mx-auto"
            >
              Learn More ➜
            </button>
          </div>
        </div>
  
        {/* Conditional Form Display */}
        {isFormVisible && (
          <div className="absolute bottom-2/5 left-0 right-1/4 top-1/5 bg-gray-300 p-4 z-10">
            <UpdateForm onFormComplete={toggleForm} />
          </div>
        )}
      </div>
    </div>
  );  
};

export default Dashboard;
