"use client";

import { createSlice } from "@reduxjs/toolkit";
import {
  createAttendance,
  getAttendances,
  getAttendance,
  editAttendance,
  deleteAttendance,
  createAttendanceByAdmin,
  getAttendanceByUserId,
} from "./attendanceActions";
import { AttendanceTypes } from "@/constants/Types";

interface AttendanceSliceType {
  attendances: AttendanceTypes[] | null;
  loading: boolean;
  error: any;
  attendance: AttendanceTypes | null;
}

const initialState: AttendanceSliceType = {
  attendances: [],
  loading: false,
  error: null,
  attendance: null,
};

export const attendanceSlice = createSlice({
  name: "attendances",
  initialState,
  reducers: {
    removeErrorOnClose: (state) => {
      return { ...state, error: null };
    },
  },
  extraReducers: (builder) => {
    // Get all attendances
    builder
      .addCase(getAttendances.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAttendances.rejected, (state, { payload }) => {
        state.loading = false;
        state.attendances = null;
        state.error = payload;
      })
      .addCase(getAttendances.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.attendances = payload.attendances;
      })

      // Get single attendance details
      .addCase(getAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAttendance.rejected, (state, { payload }) => {
        state.loading = false;
        state.attendance = null;
        state.error = payload;
      })
      .addCase(getAttendance.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.attendance = payload.attendance;
      })
      .addCase(getAttendanceByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAttendanceByUserId.rejected, (state, { payload }) => {
        state.loading = false;
        state.attendances = null;
        state.error = payload;
      })
      .addCase(getAttendanceByUserId.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.attendances = payload.attendances;
      })
      .addCase(createAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAttendance.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(createAttendance.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        if (payload.update) {
          if (state.attendances !== null) {
            const index = state.attendances.findIndex(
              (item) => item._id === payload.task._id
            );

            if (index !== -1) {
              state.attendances[index] = payload.task;
            }
          }
        } else {
          state.attendances = [
            ...(state.attendances || []),
            payload.attendance,
          ] as AttendanceTypes[];
        }
      })
      .addCase(createAttendanceByAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAttendanceByAdmin.rejected, (state, { payload }) => {
        state.loading = false;
        // state.attendances = null;
        state.error = payload;
      })
      .addCase(createAttendanceByAdmin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.attendances = [
          ...(state.attendances || []),
          payload.attendance,
        ] as AttendanceTypes[];
      })
      .addCase(editAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(editAttendance.rejected, (state, { payload }) => {
        state.loading = false;
        state.attendance = null;
        state.error = payload;
      })
      .addCase(editAttendance.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.attendance = payload.attendance;
      })
      .addCase(deleteAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAttendance.rejected, (state, { payload }) => {
        state.loading = false;
        state.attendances = null;
        state.error = payload;
      })
      .addCase(deleteAttendance.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        if (state.attendances !== null) {
          state.attendances = state.attendances.filter(
            (attendance) => attendance._id === payload.attendance._id
          );
        }
      });
  },
});

export const { removeErrorOnClose } = attendanceSlice.actions;

export default attendanceSlice.reducer;
