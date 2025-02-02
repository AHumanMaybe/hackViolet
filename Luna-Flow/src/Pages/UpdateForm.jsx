import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import { useAuth } from "../Contexts/authContext";
import { useState } from "react";
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

function UpdateForm({onFormComplete}) {

    const { currentUser } = useAuth();
    const [answers, setAnswers] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);

    const cards = [
        { id: 1, type: "multi", question: "Period today?", options: ["Spotting", "Light", "Medium", "Heavy", "Super heavy"] },
        { id: 2, type: "multi", question: "How are you feeling?", options: ["Fine", "Happy", "Sad", "Angry", "Irritable", "Indifferent", "Grateful"] },
        { id: 3, type: "multi", question: "Was there any pain?", options: ["Cramping", "Headache", "Breast Tenderness", "Ovulation", "Lower Back"] },
        { id: 4, type: "multi", question: "Sex life?", options: ["Protected", "Unprotected", "Withdrawl", "High sex drive", "Low sex drive"] },
        { id: 5, type: "multi", question: "Did you have any energy today?", options: ["Productive", "Exhausted", "Energized", "Tired", "Brain fog"] },
        { id: 6, type: "multi", question: "How was your mindset?", options: ["Motivated", "Unmotivated", "Brain fog", "Stressed"] },
        { id: 7, type: "multi", question: "Cravings", options: ["Sweet", "Spicy", "Salty", "Greasy", "Carbs"] },
        { id: 8, type: "multi", question: "How much sleep did you get last night?", options: ["0 hr", "1-3 hr", "3-6 hr", "6-9 hr", "9+ hr"] }
    ]; 

    const handleAnswerChange = (id, value) => {
        const questionText = cards.find(card => card.id === id).question;
        setAnswers((prev) => ({ ...prev, [questionText]: value }));
    };

    const handleNext = async () => {
        if (currentIndex < cards.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            console.log("Final Answers:", answers);
            try {
                
                const timestamp = formatTimestamp()

                await setDoc(doc(db, currentUser.uid, "registerQuestions"), {
                    [timestamp]: answers
                }, { merge: true });
                console.log("Data successfully sent to Firebase!");
                onFormComplete();
            } catch (error) {
                console.error("Error writing to Firestore:", error);
            }
        }
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

    return (
        <div>
            {currentIndex < cards.length ? (
                <>
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
                </>
            ) : (
                <div>No more questions!</div>
            )}

            {/* Display all answers */}
            <div className="mt-6 p-4 border rounded-md">
                <h2 className="text-lg font-semibold">Collected Answers</h2>
                <pre>{JSON.stringify(answers, null, 2)}</pre>
            </div>
        </div>
    );
};

export default UpdateForm;