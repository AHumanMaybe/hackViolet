import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { db } from '../firebase'; // Ensure you have Firebase configured
import { collection, addDoc, updateDoc, doc, getDocs } from 'firebase/firestore';

const localizer = momentLocalizer(moment);

function CalendarPage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const querySnapshot = await getDocs(collection(db, 'events'));
            const fetchedEvents = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), start: doc.data().start.toDate(), end: doc.data().end.toDate() }));
            setEvents(fetchedEvents);
        };
        fetchEvents();
    }, []);

    const handleSelectSlot = async ({ start, end }) => {
        const title = prompt('Enter event title:');
        if (title) {
            const newEvent = { title, start, end };
            const docRef = await addDoc(collection(db, 'events'), newEvent);
            setEvents([...events, { id: docRef.id, ...newEvent }]);
        }
    };

    const handleSelectEvent = async (event) => {
        const newTitle = prompt('Edit event title:', event.title);
        if (newTitle) {
            await updateDoc(doc(db, 'events', event.id), { title: newTitle });
            setEvents(events.map(ev => ev.id === event.id ? { ...ev, title: newTitle } : ev));
        }
    };

    return (
        <div style={{ height: '80vh', padding: '20px' }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                style={{ background: 'white', borderRadius: '10px', padding: '10px' }}
            />
        </div>
    );
}

export default CalendarPage;
