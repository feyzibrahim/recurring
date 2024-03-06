"use client";

import { createSlice } from "@reduxjs/toolkit";
import { editUser, getUser, getUsers } from "./userActions";
import { EmployeeTypes } from "@/constants/Types";

interface UserSliceType {
  users: EmployeeTypes[] | null;
  loading: boolean;
  error: any;
  user: EmployeeTypes | null;
}

const initialState: UserSliceType = {
  users: [],
  loading: false,
  error: null,
  user: null,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    removeErrorOnClose: (state) => {
      return { ...state, error: null };
    },
  },
  extraReducers: (builder) => {
    // Get all users
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.users = null;
        state.error = payload;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.users = payload.users;
      })
      // Get single user details
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload.user;
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(editUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload;
      })
      .addCase(editUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload.user;
      });
  },
});

export const { removeErrorOnClose } = userSlice.actions;

export default userSlice.reducer;
