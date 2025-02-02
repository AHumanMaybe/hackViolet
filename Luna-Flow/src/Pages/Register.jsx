import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import { useAuth } from "../Contexts/authContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import InfoCard from "../Components/InfoCard";
import MultCard from "../Components/MultCard";

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

function Register() {
    const { currentUser } = useAuth();
    const [answers, setAnswers] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate(); // Initialize navigate

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
        return date.toISOString().replace(/[:.]/g, "-"); // Standardized timestamp
    };

    const handleNext = async () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            console.log("Final Answers:", answers);
            try {
                const timestamp = formatTimestamp();

                await setDoc(doc(db, currentUser.uid, "cycleInfo"), {
                    cycleStartDate: new Date(),
                    currentDay: 1
                })

                await setDoc(doc(db, currentUser.uid, "registerQuestions"), {
                    [timestamp]: answers
                }, { merge: true });

                console.log("Data successfully sent to Firebase!");
                navigate("/dash"); // Navigate to Dashboard
            } catch (error) {
                console.error("Error writing to Firestore:", error);
            }
        }
    };

    return (
        <div className="flex font-primary flex-col lg:flex-row h-screen pl-90 pb-14 bg-gradient-to-tl from-cyan-300 to-red-300">
            {/* Main Wrapper with rounded corners */}
            <div className="flex flex-col w-full h-full rounded-[3vw] bg-white/50 p-4 m-8">
                
                {/* "Let's Get Started" Section */}
                <div className="flex justify-center w-full mb-6">
                    <h1 className="text-[3vw] pt-10 pb-10 font-light text-center">Let's Get You Set Up</h1>
                </div>
    
                {/* Cards Wrapper: Centered horizontally in a white background */}
                <div className="flex flex-col items-center w-full bg-white p-8 rounded-[1.5vw] shadow-lg space-y-6">
                    {currentIndex < cards.length ? (
                        <>
                            <div className="flex justify-center w-full p-8 space-y-6 transform scale-150">
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
                                </div>
    
                            <button onClick={handleNext} className="mt-4 p-2 pl-10 pr-10 bg-indigo-500 text-white rounded-full">
                                {currentIndex === cards.length - 1 ? "Finish" : "Next"}
                            </button>
                        </>
                    ) : (
                        <div>No more questions!</div>
                    )}
                </div>
    
            </div>
        </div>
    );    
    
}

export default Register;
