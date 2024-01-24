"use client";

import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./userActions";

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
  reducers: {},
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
  },
});

export default userSLice.reducer;
