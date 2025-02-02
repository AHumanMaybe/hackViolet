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

  const { currentUser, userLoggedIn} = useAuth()

  // Function to format the date to show the current weekday
  const formatDate = (date) => format(date, 'EEEE'); // 'EEEE' formats to the full weekday name

  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

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
            setView("calendar")
        } catch (error) {
            console.error("Error writing to Firestore:", error);
        }
    }
  };
    const [currentTime, setCurrentTime] = useState(new Date());
    const [currentDay, setCurrentDay] = useState(1);
    const [phase, setPhase] = useState('');
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
    
  fetchLatestQuestion(); // Fetch latest questions and trigger AI summary
  
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        
        fetchLatestQuestion(); // Fetch latest questions and trigger AI summary
      
        const fetchAndLogCycleStartDate = async () => {
            const startDate = await fetchCycleInfo();
            const today = new Date();
            const diffTime =  Math.abs(today - startDate);
            const dayOfCycle = (Math.floor(diffTime / (1000 * 60 * 60 * 24)) % 28) + 1;
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
            else{
                console.log("Failed");
            }
          
            console.log({dayOfCycle});
            console.log({phase});
        }

        fetchAndLogCycleStartDate();        
        if (currentUser && currentUser.email){ 
            console.log(currentUser.email);
            setGreeting(greetings[Math.floor(Math.random() * greetings.length)].replace('[name]', currentUser.email));
        }
        else {
            setGreeting("Helllllloo!!");
        }
        return () => clearInterval(timer);
    }, []);

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
      const questionAnswerText = Object.entries(questionSet)
        .map(([question, answer]) => `${question}: ${answer}`)
        .join("\n");

      console.log("Question/Answer Text:", questionAnswerText);

      const prompt = `Here is the latest period tracking data:\n${questionAnswerText}\nBased on this data, please provide a summary and some expectations of what may come soon based on where they are likely to be in their cycle. Use 2nd person speak, words like "you" and "your"`;

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 50,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log("ChatGPT Response:", response.data);
      setChatResponse(response.data.choices[0].message.content);
    } catch (error) {
      setChatResponse("Error fetching AI summary. Please try again.");
    }
    setLoading(false);
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
          hover:rotate-x-6 hover:rotate-y-6 hover:scale-103">
                Journal Entry
              </button>
            </div>
          </div>
          {/* Conditional rendering */}
          {view === 'calendar' && (
            <div className="flex flex-col bg-white rounded-[1.5vw] p-4">
            <h2 className="text-[1.3vw] text-center font-bold w-full p-2 mb-2">Mini Calendar</h2>
            <Calendar />
          </div>
        </div>
          )}

          {view === 'quickCheckIn' && (
            <div className="flex flex-col bg-white rounded-xl p-4 relative">
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

                <button onClick={handleNext}>
                    {currentIndex === cards.length - 1 ? "Finish" : "Next"}
                </button>
              <button
                onClick={closeView}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              >
                ✖
              </button>
            </div>
          )}

          {view === 'journalEntry' && (
            <div className="flex flex-col bg-white rounded-xl p-4 relative">
              <button
                onClick={closeView}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              >
                ✖
              </button>
              <Journal/>
            </div>
          )}
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