import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await fetch(
      "https://event-ease-backend-five.vercel.app/api/v1/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    if (!response.ok) throw new Error("Login failed");
    return await response.json();
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await fetch(
      "https://event-ease-backend-five.vercel.app/api/v1/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    if (!response.ok) throw new Error("Registration failed");
    return await response.json();
  }
);

interface AuthState {
  user: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
