"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface Notification {
  id: string;
  message: string;
}

const NotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);
  const { events } = useSelector((state: RootState) => state.events);

  useEffect(() => {
    if (!user) return;

    // In a real application, you would set up a WebSocket connection here
    // For this example, we'll simulate real-time updates by watching the events state
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        message: `Events updated at ${new Date().toLocaleTimeString()}`,
      };
      setNotifications((prev) => [...prev, newNotification]);
    }, 10000); // Check for updates every 10 seconds

    return () => clearInterval(interval);
  }, [user, events]);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-blue-500 text-white p-2 rounded shadow-lg"
        >
          {notification.message}
          <button
            onClick={() => removeNotification(notification.id)}
            className="ml-2 text-sm hover:underline"
          >
            Dismiss
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;
