"use client";

import { createSlice } from "@reduxjs/toolkit";
import { loadUser, loginUser, logoutUser, registerUser } from "./userActions";

interface UserType {
  user: any;
  loading: boolean;
  error: any;
}

const initialState: UserType = {
  user: null,
  loading: false,
  error: null,
};

export const userSLice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.error = payload;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.user = payload.user;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.error = payload;
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.user = payload.user;
    });
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.error = payload;
    });
    builder.addCase(loadUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.user = payload.user;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.error = payload;
    });
    builder.addCase(logoutUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.user = null;
    });
  },
});

export const { clearError } = userSLice.actions;

export default userSLice.reducer;
