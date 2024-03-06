"use client";

import { createSlice } from "@reduxjs/toolkit";
import {
  editSubscription,
  getSubscription,
  getSubscriptions,
} from "./subscriptionActions";

interface SubscriptionSliceType {
  subscriptions: any[] | null;
  loading: boolean;
  error: any;
  subscription: any | null;
}

const initialState: SubscriptionSliceType = {
  subscriptions: [],
  loading: false,
  error: null,
  subscription: null,
};

export const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    removeErrorOnClose: (state) => {
      return { ...state, error: null };
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all subscriptions
      .addCase(getSubscriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubscriptions.rejected, (state, { payload }) => {
        state.loading = false;
        state.subscriptions = null;
        state.error = payload;
      })
      .addCase(getSubscriptions.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.subscriptions = payload.subscriptions;
      })
      // Get single subscription details
      .addCase(getSubscription.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubscription.rejected, (state, { payload }) => {
        state.loading = false;
        state.subscription = null;
        state.error = payload;
      })
      .addCase(getSubscription.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.subscription = payload.subscription;
      })
      .addCase(editSubscription.pending, (state) => {
        state.loading = true;
      })
      .addCase(editSubscription.rejected, (state, { payload }) => {
        state.loading = false;
        state.subscription = null;
        state.error = payload;
      })
      .addCase(editSubscription.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.subscription = payload.subscription;
      });
  },
});

export const { removeErrorOnClose } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
