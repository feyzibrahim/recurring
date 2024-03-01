"use client";

import { createSlice } from "@reduxjs/toolkit";
import { createDeal, getDeals, editDeal, getDeal } from "./dealActions";
import { DealTypes } from "@/constants/Types";

interface DealSliceType {
  deals: DealTypes[] | null;
  loading: boolean;
  error: any;
  deal: DealTypes | null;
}

const initialState: DealSliceType = {
  deals: [],
  loading: false,
  error: null,
  deal: null,
};

export const dealSlice = createSlice({
  name: "deal",
  initialState,
  reducers: {
    removeErrorOnClose: (state) => {
      return { ...state, error: null };
    },
  },
  extraReducers: (builder) => {
    // Get all deals
    builder
      .addCase(getDeals.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDeals.rejected, (state, { payload }) => {
        state.loading = false;
        state.deals = null;
        state.error = payload;
      })
      .addCase(getDeals.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.deals = payload.deals;
      })
      .addCase(getDeal.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDeal.rejected, (state, { payload }) => {
        state.loading = false;
        state.deal = null;
        state.error = payload;
      })
      .addCase(getDeal.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.deal = payload.deal;
      })
      .addCase(createDeal.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDeal.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(createDeal.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        if (payload.update) {
          if (state.deals !== null) {
            const index = state.deals.findIndex(
              (item) => item._id === payload.deal._id
            );

            if (index !== -1) {
              state.deals[index] = payload.deal;
            }
          }
        } else {
          state.deals = [...(state.deals || []), payload.deal] as DealTypes[];
        }
      })
      .addCase(editDeal.pending, (state) => {
        state.loading = true;
      })
      .addCase(editDeal.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(editDeal.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        if (state.deals !== null) {
          const index = state.deals.findIndex(
            (item) => item._id === payload.deal._id
          );

          if (index !== -1) {
            state.deals[index] = payload.deal;
          }
        }
      });
  },
});

export const { removeErrorOnClose } = dealSlice.actions;

export default dealSlice.reducer;
