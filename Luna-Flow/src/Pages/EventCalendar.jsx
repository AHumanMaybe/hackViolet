import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const EventCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEventChange = (e) => {
    setNewEvent(e.target.value);
  };

  const addEvent = () => {
    if (newEvent.trim() === '') return;
    setEvents([...events, { date: selectedDate.toDateString(), title: newEvent }]);
    setNewEvent('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-t from-[#A5B4FC] to-[#BAE6FD]">
      <div className="flex flex-row space-x-6">
        <div className="bg-gray-200 p-8 rounded-lg shadow-md w-[450px]">
          <h1 className="text-3xl font-bold mb-6">Journal Cycle Calendar</h1>
          <h2 className="text-xl font-semibold mb-4">Select a Date</h2>
          <Calendar onChange={handleDateChange} value={selectedDate} className="mb-4" />
          <input 
            type="text" 
            value={newEvent} 
            onChange={handleEventChange} 
            placeholder="Add an event" 
            className="border p-2 w-full rounded mb-2" 
          />
          <button onClick={addEvent} className="bg-[#FFFFFFB3] text-black p-2 w-full rounded">Add Event</button>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-[300px]">
          <h3 className="text-lg font-semibold">Logged journal on {selectedDate.toDateString()}:</h3>
          <ul>
            {events.filter(event => event.date === selectedDate.toDateString()).length > 0 ? (
              events.filter(event => event.date === selectedDate.toDateString()).map((event, index) => (
                <li key={index} className="border-b p-2 last:border-b-0">{event.title}</li>
              ))
            ) : (
              <p className="text-gray-500">No events for this date.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
