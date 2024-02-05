"use client";

import { createSlice } from "@reduxjs/toolkit";
import {
  createTask,
  getTasks,
  getTask,
  editTask,
  deleteTask,
} from "./taskActions";
import { TaskTypes } from "@/constants/Types";

interface TaskSliceType {
  tasks: TaskTypes[] | null;
  loading: boolean;
  error: any;
  task: TaskTypes | null;
}

const initialState: TaskSliceType = {
  tasks: [],
  loading: false,
  error: null,
  task: null,
};

export const employeeSLice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all tasks
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTasks.rejected, (state, { payload }) => {
        state.loading = false;
        state.tasks = null;
        state.error = payload;
      })
      .addCase(getTasks.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.tasks = payload.tasks;
      })
      // Get single task details
      .addCase(getTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTask.rejected, (state, { payload }) => {
        state.loading = false;
        state.task = null;
        state.error = payload;
      })
      .addCase(getTask.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.task = payload.task;
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.rejected, (state, { payload }) => {
        state.loading = false;
        state.tasks = null;
        state.error = payload;
      })
      .addCase(createTask.fulfilled, (state, { payload }) => {
        console.log(
          "file: taskSlice.tsx:70 -> .addCase -> payload",
          payload.task
        );
        state.loading = false;
        state.error = null;
        state.tasks = [...(state.tasks || []), payload.task] as TaskTypes[];
      })
      .addCase(editTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTask.rejected, (state, { payload }) => {
        state.loading = false;
        state.task = null;
        state.error = payload;
      })
      .addCase(editTask.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.task = payload.task;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.rejected, (state, { payload }) => {
        state.loading = false;
        state.tasks = null;
        state.error = payload;
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        if (state.tasks !== null) {
          state.tasks = state.tasks.filter(
            (task) => task._id === payload.task._id
          );
        }
      });
  },
});

export default employeeSLice.reducer;
