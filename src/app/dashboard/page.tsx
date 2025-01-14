"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { logout } from "../redux/authSlice";
import { fetchEvents } from "../redux/eventSlice";
import EventList from "../components/EventList";
import EventForm from "../components/EventForm";
import NotificationSystem from "../components/NotificationSystem";

export default function Dashboard() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { events, status } = useSelector((state: RootState) => state.events);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      dispatch(fetchEvents());
    }
  }, [user, router, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div className="max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Event Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>
      <EventForm />
      {status === "loading" && <p>Loading events...</p>}
      {status === "failed" && <p>Error loading events. Please try again.</p>}
      {status === "succeeded" && <EventList events={events} />}
      <NotificationSystem />
    </div>
  );
}
