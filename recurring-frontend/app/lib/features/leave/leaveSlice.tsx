"use client";

import { createSlice } from "@reduxjs/toolkit";
import {
  createLeave,
  getLeaves,
  getLeave,
  editLeave,
  deleteLeave,
  createLeaveByAdmin,
  getLeavesForUser,
} from "./leaveActions";
import { LeaveTypes } from "@/constants/Types";

interface LeaveSliceType {
  leaves: LeaveTypes[] | null;
  loading: boolean;
  error: any;
}

const initialState: LeaveSliceType = {
  leaves: [],
  loading: false,
  error: null,
};

export const attendanceSlice = createSlice({
  name: "leaves",
  initialState,
  reducers: {
    removeErrorOnClose: (state) => {
      return { ...state, error: null };
    },
  },
  extraReducers: (builder) => {
    // Get all leaves
    builder
      .addCase(getLeaves.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLeaves.rejected, (state, { payload }) => {
        state.loading = false;
        state.leaves = null;
        state.error = payload;
      })
      .addCase(getLeaves.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.leaves = payload.leaves;
      })

      // Get single leave details

      .addCase(getLeavesForUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLeavesForUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.leaves = null;
        state.error = payload;
      })
      .addCase(getLeavesForUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.leaves = payload.leaves;
      })
      .addCase(createLeave.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLeave.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(createLeave.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.leaves = [...(state.leaves || []), payload.leave] as LeaveTypes[];
      })
      .addCase(createLeaveByAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLeaveByAdmin.rejected, (state, { payload }) => {
        state.loading = false;
        // state.leaves = null;
        state.error = payload;
      })
      .addCase(createLeaveByAdmin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.leaves = [...(state.leaves || []), payload.leave] as LeaveTypes[];
      })
      .addCase(editLeave.pending, (state) => {
        state.loading = true;
      })
      .addCase(editLeave.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(editLeave.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        if (state.leaves !== null) {
          const index = state.leaves.findIndex(
            (item) => item._id === payload.leave._id
          );

          if (index !== -1) {
            state.leaves[index] = payload.leave;
          }
        }
      })
      .addCase(deleteLeave.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLeave.rejected, (state, { payload }) => {
        state.loading = false;
        state.leaves = null;
        state.error = payload;
      })
      .addCase(deleteLeave.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        if (state.leaves !== null) {
          state.leaves = state.leaves.filter(
            (leave) => leave._id === payload.leave._id
          );
        }
      });
  },
});

export const { removeErrorOnClose } = attendanceSlice.actions;

export default attendanceSlice.reducer;
