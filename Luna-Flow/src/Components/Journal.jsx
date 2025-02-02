import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useAuth } from "../Contexts/authContext";
import { useState, useEffect } from "react";

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

function Journal({ customTimestamp }) {
    const { currentUser } = useAuth();
    const [entry, setEntry] = useState("");

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

    const handleSubmit = async () => {
        if (!entry.trim()) {
            alert("Entry cannot be empty!");
            return;
        }

        // Use custom timestamp prop if available, otherwise use the current timestamp
        const timestamp = customTimestamp || formatTimestamp();
        
        const entryData = {
            [timestamp]: entry
        };

        try {
            await setDoc(doc(db, currentUser.uid, "journalEntries"), entryData, { merge: true });
            console.log("Entry saved:", entryData);
            setEntry(""); // Clear input after saving
        } catch (error) {
            console.error("Error saving journal entry:", error);
        }
    };

    return (
        <div className="flex flex-col w-96">
            {/* Input field */}
            <textarea
                className="w-full p-2 mt-4 border rounded"
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder="Write your journal entry here..."
                rows={4}
            />

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                className="w-full p-3 mt-10 mb-15 bg-indigo-300/80 hover:bg-indigo-500 hover:font-semibold text-black hover:text-white rounded-xl cursor-pointer 
                        transition-all duration-300 ease-in-out 
                        hover:shadow-xl hover:shadow-sky-200"
            >
                Save Entry
            </button>
        </div>
    );
}

export default Journal;
