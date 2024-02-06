"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  createTask,
  getTasks,
  getTask,
  editTask,
  deleteTask,
  getTasksByProjectId,
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

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTaskList: (
      state,
      action: PayloadAction<{
        source: string;
        destination: string;
        taskId: string;
      }>
    ) => {
      const { source, destination, taskId } = action.payload;

      // Find the task in the tasks array
      const taskToUpdate =
        state.tasks && state.tasks.find((task) => task._id === taskId);

      // Update the task's status if found
      if (taskToUpdate) {
        taskToUpdate.status = destination;
      }
    },
  },
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
      .addCase(getTasksByProjectId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTasksByProjectId.rejected, (state, { payload }) => {
        state.loading = false;
        state.tasks = null;
        state.error = payload;
      })
      .addCase(getTasksByProjectId.fulfilled, (state, { payload }) => {
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

export const { updateTaskList } = taskSlice.actions;

export default taskSlice.reducer;
