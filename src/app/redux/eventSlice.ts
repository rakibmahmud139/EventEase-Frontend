import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const response = await fetch(
      "https://event-ease-backend-five.vercel.app/api/v1/events",
      {
        headers: {
          Authorization: state.auth.user.token,
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch events");
    return await response.json();
  }
);

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData: any, { getState }) => {
    const state = getState() as RootState;
    const response = await fetch(
      "https://event-ease-backend-five.vercel.app/api/v1/events/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: state.auth.user.token,
        },
        body: JSON.stringify(eventData),
      }
    );
    if (!response.ok) throw new Error("Failed to create event");
    return await response.json();
  }
);

export const registerForEvent = createAsyncThunk(
  "events/registerForEvent",
  async (eventId: string, { getState }) => {
    const state = getState() as RootState;
    const response = await fetch(
      `https://event-ease-backend-five.vercel.app/api/v1/events/${eventId}/register`,
      {
        method: "POST",
        headers: {
          Authorization: state.auth.user.token,
        },
      }
    );
    if (!response.ok) throw new Error("Failed to register for event");
    return await response.json();
  }
);

interface EventState {
  events: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EventState = {
  events: [],
  status: "idle",
  error: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(registerForEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(
          (event) => event._id === action.payload._id
        );
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      });
  },
});

export default eventSlice.reducer;
