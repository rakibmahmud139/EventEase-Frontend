import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { createEvent } from "../redux/eventSlice";

const EventForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    location: "",
    maxAttendees: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(createEvent(eventData)).unwrap();
      setEventData({ name: "", date: "", location: "", maxAttendees: 0 });
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
        <label htmlFor="name" className="block mb-1">
          Event Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={eventData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="date" className="block mb-1">
          Date
        </label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="location" className="block mb-1">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={eventData.location}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="maxAttendees" className="block mb-1">
          Max Attendees
        </label>
        <input
          type="number"
          id="maxAttendees"
          name="maxAttendees"
          value={eventData.maxAttendees}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Event
      </button>
    </form>
  );
};

export default EventForm;
