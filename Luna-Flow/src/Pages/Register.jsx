import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import { useAuth } from "../Contexts/authContext";

import InfoCard from "../Components/InfoCard"
import { useState } from "react"

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

function Register(){

    const { currentUser, userLoggedIn } = useAuth()

    const [answers, setAnswers] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0)

    const questions = ["Question 1",
        "Question 2",
        "Question 3"
    ]

    const handleAnswerChange = (id, value) => {
        setAnswers((prev) => ({ ...prev, [questions[id]]: value }));
    }
    
    const handleSubmit = async () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            try {
                await setDoc(doc(db, "users", currentUser.id), {
                    registerQuestions: answers
                });

                console.log("Data successfully sent to Firebase!");
            } catch (error) {
                console.error("Error writing to Firestore:", error);
            }
            
            // TODO: make send to dashboard page after final submission
            console.log("No more cards");
        }
    }

    return(
        <>
            <div>
            {currentIndex < questions.length ? (
                <InfoCard 
                    key={currentIndex}
                    id={currentIndex}
                    question={questions[currentIndex]}
                    onAnswerChange={handleAnswerChange}
                />
            ) : (
                <div>No more questions!</div>
            )}
            
            {currentIndex < questions.length && (
                <button 
                    onClick={handleSubmit}>
                    {currentIndex === questions.length - 1 ? "Finish" : "Next"}
                </button>
            )}
        </div>
        </>
    )

}

export default Register