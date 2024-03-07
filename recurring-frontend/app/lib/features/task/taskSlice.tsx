"use client";

import { createSlice } from "@reduxjs/toolkit";
import {
  createTask,
  getTasks,
  getTask,
  editTask,
  deleteTask,
  getTasksByProjectId,
  getTasksByUserId,
  replayToTaskComment,
} from "./taskActions";
import { TaskTypes } from "@/constants/Types";

interface TaskSliceType {
  tasks: TaskTypes[] | null;
  loading: boolean;
  error: any;
  task: TaskTypes | null;
  length: number | null;
}

const initialState: TaskSliceType = {
  tasks: [],
  loading: false,
  error: null,
  task: null,
  length: null,
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    removeTaskOnClose: (state) => {
      return { ...state, task: null };
    },
    setTask: (state, { payload }) => {
      return { ...state, task: payload.task };
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
        state.length = payload.length;
      })
      // Task By user id
      .addCase(getTasksByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTasksByUserId.rejected, (state, { payload }) => {
        state.loading = false;
        state.tasks = null;
        state.error = payload;
      })
      .addCase(getTasksByUserId.fulfilled, (state, { payload }) => {
        console.log("file: taskSlice.tsx:79 -> .addCase -> payload", payload);
        state.loading = false;
        state.error = null;
        state.tasks = payload.tasks;
        state.length = payload.length;
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
        if (payload.task.status === "archive" && state.tasks) {
          state.tasks = state.tasks.filter(
            (item) => item._id !== payload.task._id
          );
        } else {
          if (state.tasks !== null) {
            const index = state.tasks.findIndex(
              (item) => item._id === payload.task._id
            );

            if (index !== -1) {
              state.tasks[index] = payload.task;
            }
          }
        }
      })
      .addCase(replayToTaskComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(replayToTaskComment.rejected, (state, { payload }) => {
        state.loading = false;
        state.task = null;
        state.error = payload;
      })
      .addCase(replayToTaskComment.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.task = payload.task;

        if (state.tasks !== null) {
          const index = state.tasks.findIndex(
            (item) => item._id === payload.task._id
          );

          if (index !== -1) {
            state.tasks[index] = payload.task;
          }
        }
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

export const { removeTaskOnClose, setTask } = taskSlice.actions;

export default taskSlice.reducer;
