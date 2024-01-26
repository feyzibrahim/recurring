import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonReduxRequest } from "@/api/client";

// Initial Data Reload
export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_: undefined, { rejectWithValue }) => {
    return commonReduxRequest({
      method: "GET",
      url: "/user",
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Login the user
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials: {}, { rejectWithValue }) => {
    return commonReduxRequest({
      method: "POST",
      url: "/auth/login",
      data: userCredentials,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Signup the user
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userCredentials: {}, { rejectWithValue }) => {
    return commonReduxRequest({
      method: "POST",
      url: "/auth/register",
      data: userCredentials,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",

  async (_: undefined, { rejectWithValue }) => {
    return commonReduxRequest({
      method: "GET",
      url: "/user/logout",
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);
