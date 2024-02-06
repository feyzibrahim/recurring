import { createAsyncThunk } from "@reduxjs/toolkit";
import { reduxCommonRequest } from "@/api/redux_common";
import { API_ROUTES } from "@/lib/routes";

// Task details finding
export const getTasks = createAsyncThunk(
  "task/getTasks",
  async (_: undefined, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.PROJECT,
      method: "GET",
      url: "/api/task",
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Task details finding
export const getTasksByProjectId = createAsyncThunk(
  "task/getTasksByProjectId",
  async (projectSlug: string, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.PROJECT,
      method: "GET",
      url: `/api/task/project/${projectSlug}`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Task details finding
export const createTask: any = createAsyncThunk(
  "task/createTask",
  async (data: any, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.PROJECT,
      method: "POST",
      url: "/api/task",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Get single Task Details
export const getTask: any = createAsyncThunk(
  "task/getTask",
  async (id: string, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.PROJECT,
      method: "GET",
      url: `/api/task/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Task details Editing
export const editTask: any = createAsyncThunk(
  "task/editTask",
  async (data: any, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.PROJECT,
      method: "PATCH",
      url: "/api/task",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Task deletion
export const deleteTask: any = createAsyncThunk(
  "task/deleteTask",
  async (id: string, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.PROJECT,
      method: "DELETE",
      url: `/api/task/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);
