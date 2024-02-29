"use client";

import { createSlice } from "@reduxjs/toolkit";
import {
  createClient,
  getClients,
  editClient,
  getClient,
} from "./clientActions";
import { ClientTypes } from "@/constants/Types";

interface ClientSliceType {
  clients: ClientTypes[] | null;
  loading: boolean;
  error: any;
  client: ClientTypes | null;
}

const initialState: ClientSliceType = {
  clients: [],
  loading: false,
  error: null,
  client: null,
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    removeErrorOnClose: (state) => {
      return { ...state, error: null };
    },
  },
  extraReducers: (builder) => {
    // Get all clients
    builder
      .addCase(getClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClients.rejected, (state, { payload }) => {
        state.loading = false;
        state.clients = null;
        state.error = payload;
      })
      .addCase(getClients.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.clients = payload.clients;
      })
      .addCase(getClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClient.rejected, (state, { payload }) => {
        state.loading = false;
        state.client = null;
        state.error = payload;
      })
      .addCase(getClient.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.client = payload.client;
      })
      .addCase(createClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(createClient.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(createClient.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        if (payload.update) {
          if (state.clients !== null) {
            const index = state.clients.findIndex(
              (item) => item._id === payload.client._id
            );

            if (index !== -1) {
              state.clients[index] = payload.client;
            }
          }
        } else {
          state.clients = [
            ...(state.clients || []),
            payload.client,
          ] as ClientTypes[];
        }
      })
      .addCase(editClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(editClient.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(editClient.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        if (state.clients !== null) {
          const index = state.clients.findIndex(
            (item) => item._id === payload.client._id
          );

          if (index !== -1) {
            state.clients[index] = payload.client;
          }
        }
      });
  },
});

export const { removeErrorOnClose } = clientSlice.actions;

export default clientSlice.reducer;
