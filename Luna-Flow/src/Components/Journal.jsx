import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../Contexts/authContext";
import { useState } from "react";

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

function Journal({ onEntryChange }) {
    
    const { currentUser, userLoggedIn } = useAuth()

    const questions = ["What's on your mind?", "What's on your mind?", "What's on your mind?"]

    const [answer, setAnswer] = useState("Enter Answer Here");
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});

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

    const handleChange = (e) => {
        const value = e.target.value;
        setAnswers((prev) => ({
            ...prev,
            [selectedQuestionIndex]: value
        }));
        onEntryChange(selectedQuestionIndex, value);
    };

    const handleSubmit = async () => {
        console.log("All answers: ", answers);
        const timestamp = formatTimestamp()
        
        // Prepare data to store
        const entryData = {
            [timestamp]: answers[selectedQuestionIndex] // timestamp as field name, answer as value
        };
        try{
            await setDoc(doc(db, currentUser.uid, "journalEntries"), entryData, {merge: true})
        } catch (e) {
            console.log(e)
        }
    }   

    return (
        <div className="w-full">
            {/* Horizontal question selector */}
            <div className="flex w-1/2 flex-row overflow-x-scroll">
                {questions.map((question, index) => (
                    <div
                        key={index}
                        className={`p-4 cursor-pointer ${
                            selectedQuestionIndex === index ? "bg-gray-300" : ""
                        }`}
                        onClick={() => setSelectedQuestionIndex(index)}
                    >
                        {question}
                    </div>
                ))}
            </div>

            {/* Input field for the selected question */}
            <input
                className="w-full p-2 mt-4 border rounded"
                value={answers[selectedQuestionIndex] || ""}
                onChange={handleChange}
                placeholder="Enter Answer Here"
            />

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
                Submit Answers
            </button>
        </div>
    );
}

export default Journal;
