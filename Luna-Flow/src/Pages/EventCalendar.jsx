import React, { useState, useEffect } from 'react';
import Journal from '../Components/Journal';
import { initializeApp } from "firebase/app";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { doc, getDoc, setDoc, getFirestore } from 'firebase/firestore'; // Firebase Firestore methods
import { useAuth } from '../Contexts/authContext';

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

const EventCalendar = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState('');

  const formatDate = (date) => {
    const year = date.getFullYear().toString(); // Get the full year
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const day = date.getDate().toString().padStart(2, '0'); // Ensure 2 digits for day
    const hours = date.getHours().toString().padStart(2, '0'); // Ensure 2 digits for hours
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure 2 digits for minutes
    const seconds = date.getSeconds().toString().padStart(2, '0'); // Ensure 2 digits for seconds

    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  };

  // Fetch journal data from a specific document
  const fetchJournalEntries = async () => {
    if (!userLoggedIn || !currentUser?.uid) return; // Ensure userID is provided
    
    const journalDocRef = doc(db, currentUser.uid, "journalEntries");

    try {
      const docSnap = await getDoc(journalDocRef);

      if (docSnap.exists()) {
        const journalData = docSnap.data();
        console.log("Fetched journal data: ", journalData);

        const formattedSelectedDate = formatDate(selectedDate); // Format the selected date

        console.log(formattedSelectedDate)

        // Iterate through the journal data and check if the timestamp matches the selected date
        const filteredEntries = Object.entries(journalData).filter(([timestamp, event]) => {
          // Check if the event has a valid timestamp
          if (timestamp) {
            const eventDate = timestamp.substring(0, timestamp.indexOf("_")); // Extract date portion
            console.log(eventDate)
            return eventDate === formattedSelectedDate.substring(0, formattedSelectedDate.indexOf("_")); // Compare the selected date with the timestamp
          }
          return false; // If no valid timestamp, skip this event
        });

        // Only set the values (journal entries) from the filtered entries
        setEvents(filteredEntries.map(([_, event]) => event)); // Extract the event titles
      } else {
        console.log("No journal document found.");
      }
    } catch (error) {
      console.error("Error fetching journal entries:", error);
    }
  };

  // Fetch journal entries when the selected date or currentUser changes
  useEffect(() => {
    fetchJournalEntries(); // Fetch journal entries for the selected date
  }, [selectedDate, currentUser]); // Trigger whenever selectedDate or currentUser changes

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEventChange = (e) => {
    setNewEvent(e.target.value);
  };

  const addEvent = async () => {
    if (newEvent.trim() === '') return;

    const eventData = {
      title: newEvent,
      timestamp: new Date(), // Add a timestamp for ordering
    };

    // Assuming journal entries are stored in a specific document under the current user
    const journalDocRef = doc(db, currentUser.uid, "journalEntries"); // Replace with your actual document ID
    await setDoc(journalDocRef, {
      [`${new Date().getTime()}`]: eventData // Save the event under a dynamic field name (event timestamp)
    }, { merge: true });

    setNewEvent('');
  };

  return (
    <div className="flex font-primary flex-col lg:flex-row h-screen pl-90 pb-14 bg-gradient-to-tl from-cyan-300 to-red-300">
      {/* Main Wrapper with rounded corners */}
      <div className="flex flex-row lg:flex-row justify-center rounded-[3vw] bg-white/50 p-4 m-8 w-full h-full">
        
        {/* Left Column: Cycle Calendar */}
        <div className="flex flex-col bg-white p-8 m-6 rounded-[1.5vw] w-[450px]">
          <h1 className="text-[1.9vw] text-center font-bold mb-6">Cycle Calendar</h1>
          <h2 className="text-xl font-semibold mb-4">Select a Date</h2>
          <Calendar onChange={handleDateChange} value={selectedDate} className="w-full h-[400px] mb-4" />
          <Journal customTimestamp={formatDate(selectedDate)} />
        </div>
        
        {/* Right Column: Logged Journal */}
        <div className="bg-white p-8 m-6 rounded-[1.5vw] w-[300px]">
          <h3 className="text-lg font-semibold">
            Logged journal on {formatDate(selectedDate).substring(0, formatDate(selectedDate).indexOf("_"))}:
          </h3>
          <ul>
            {events.length > 0 ? (
              events.map((event, index) => (
                <li key={index} className="border-b p-2 last:border-b-0">{event}</li>
              ))
            ) : (
              <p className="text-gray-500 mt-8">No entries for this date.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
  
};

export default EventCalendar;
