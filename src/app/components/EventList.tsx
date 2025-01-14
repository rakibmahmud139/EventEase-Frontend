import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { registerForEvent } from "../redux/eventSlice";

interface Event {
  _id: string;
  name: string;
  date: string;
  location: string;
  maxAttendees: number;
  attendees: string[];
}

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleRegister = async (eventId: string) => {
    try {
      await dispatch(registerForEvent(eventId)).unwrap();
    } catch (error) {
      console.error("Error registering for event:", error);
    }
  };

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div key={event._id} className="border p-4 rounded shadow">
          <h3 className="text-xl font-semibold">{event.name}</h3>
          <p>Date: {new Date(event.date).toLocaleString()}</p>
          <p>Location: {event.location}</p>
          <p>
            Attendees: {event.attendees.length} / {event.maxAttendees}
          </p>
          {event.attendees.length < event.maxAttendees &&
            !event.attendees.includes(user._id) && (
              <button
                onClick={() => handleRegister(event._id)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Register
              </button>
            )}
        </div>
      ))}
    </div>
  );
};

export default EventList;
