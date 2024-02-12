"use client";

import { createSlice } from "@reduxjs/toolkit";
import {
  createProject,
  getProjects,
  getProject,
  editProject,
  deleteProject,
} from "./projectActions";
import { ProjectTypes } from "@/constants/Types";

interface ProjectSliceType {
  projects: ProjectTypes[] | null;
  loading: boolean;
  error: any;
  project: ProjectTypes | null;
}

const initialState: ProjectSliceType = {
  projects: [],
  loading: false,
  error: null,
  project: null,
};

export const employeeSLice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all projects
    builder
      .addCase(getProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProjects.rejected, (state, { payload }) => {
        state.loading = false;
        state.projects = null;
        state.error = payload;
      })
      .addCase(getProjects.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.projects = payload.projects;
      })
      // Get single project details
      .addCase(getProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProject.rejected, (state, { payload }) => {
        state.loading = false;
        state.project = null;
        state.error = payload;
      })
      .addCase(getProject.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.project = payload.project;
      })
      .addCase(createProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProject.rejected, (state, { payload }) => {
        state.loading = false;
        state.projects = null;
        state.error = payload;
      })
      .addCase(createProject.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.projects = [
          ...(state.projects || []),
          payload.project,
        ] as ProjectTypes[];
      })
      .addCase(editProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProject.rejected, (state, { payload }) => {
        state.loading = false;
        // state.project = null;
        state.error = payload;
      })
      .addCase(editProject.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        if (payload.project.status !== "archive") {
          state.project = payload.project;
        } else {
          if (state.projects !== null) {
            state.projects = state.projects.filter(
              (emp) => emp._id === payload.project._id
            );
            state.project = payload.project;
          }
        }
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProject.rejected, (state, { payload }) => {
        state.loading = false;
        state.projects = null;
        state.error = payload;
      })
      .addCase(deleteProject.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        if (state.projects !== null) {
          state.projects = state.projects.filter(
            (emp) => emp._id === payload.project._id
          );
        }
      });
  },
});

export default employeeSLice.reducer;
