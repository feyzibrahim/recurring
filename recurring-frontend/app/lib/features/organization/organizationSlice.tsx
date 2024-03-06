"use client";

import { createSlice } from "@reduxjs/toolkit";
import {
  editOrganization,
  getOrganization,
  getOrganizations,
} from "./organizationActions";
import { OrganizationTypes } from "@/constants/Types";

interface OrganizationSliceType {
  organizations: OrganizationTypes[] | null;
  loading: boolean;
  error: any;
  organization: OrganizationTypes | null;
}

const initialState: OrganizationSliceType = {
  organizations: [],
  loading: false,
  error: null,
  organization: null,
};

export const organizationSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {
    removeErrorOnClose: (state) => {
      return { ...state, error: null };
    },
  },
  extraReducers: (builder) => {
    // Get all organizations
    builder
      .addCase(getOrganizations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrganizations.rejected, (state, { payload }) => {
        state.loading = false;
        state.organizations = null;
        state.error = payload;
      })
      .addCase(getOrganizations.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.organizations = payload.organizations;
      })
      // Get single organization details
      .addCase(getOrganization.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrganization.rejected, (state, { payload }) => {
        state.loading = false;
        state.organization = null;
        state.error = payload;
      })
      .addCase(getOrganization.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.organization = payload.organization;
      })
      .addCase(editOrganization.pending, (state) => {
        state.loading = true;
      })
      .addCase(editOrganization.rejected, (state, { payload }) => {
        state.loading = false;
        state.organization = null;
        state.error = payload;
      })
      .addCase(editOrganization.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.organization = payload.organization;
      });
  },
});

export const { removeErrorOnClose } = organizationSlice.actions;

export default organizationSlice.reducer;
