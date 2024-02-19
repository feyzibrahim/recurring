"use client";

import { createSlice } from "@reduxjs/toolkit";
import {
  createMeeting,
  getMeetings,
  editMeeting,
  getMeetingByUserId,
  getMeeting,
} from "./meetingActions";
import { MeetingTypes } from "@/constants/Types";

interface MeetingSliceType {
  meetings: MeetingTypes[] | null;
  loading: boolean;
  error: any;
  meeting: MeetingTypes | null;
}

const initialState: MeetingSliceType = {
  meetings: [],
  loading: false,
  error: null,
  meeting: null,
};

export const meetingSlice = createSlice({
  name: "meeting",
  initialState,
  reducers: {
    removeErrorOnClose: (state) => {
      return { ...state, error: null };
    },
  },
  extraReducers: (builder) => {
    // Get all meetings
    builder
      .addCase(getMeetings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMeetings.rejected, (state, { payload }) => {
        state.loading = false;
        state.meetings = null;
        state.error = payload;
      })
      .addCase(getMeetings.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.meetings = payload.meetings;
      })
      .addCase(getMeeting.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMeeting.rejected, (state, { payload }) => {
        state.loading = false;
        state.meeting = null;
        state.error = payload;
      })
      .addCase(getMeeting.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.meeting = payload.meeting;
      })

      .addCase(getMeetingByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMeetingByUserId.rejected, (state, { payload }) => {
        state.loading = false;
        state.meetings = null;
        state.error = payload;
      })
      .addCase(getMeetingByUserId.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.meetings = payload.meetings;
      })
      .addCase(createMeeting.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMeeting.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(createMeeting.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        if (payload.update) {
          if (state.meetings !== null) {
            const index = state.meetings.findIndex(
              (item) => item._id === payload.meeting._id
            );

            if (index !== -1) {
              state.meetings[index] = payload.meeting;
            }
          }
        } else {
          state.meetings = [
            ...(state.meetings || []),
            payload.meeting,
          ] as MeetingTypes[];
        }
      })
      .addCase(editMeeting.pending, (state) => {
        state.loading = true;
      })
      .addCase(editMeeting.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(editMeeting.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        if (state.meetings !== null) {
          const index = state.meetings.findIndex(
            (item) => item._id === payload.meeting._id
          );

          if (index !== -1) {
            state.meetings[index] = payload.meeting;
          }
        }
      });
  },
});

export const { removeErrorOnClose } = meetingSlice.actions;

export default meetingSlice.reducer;
