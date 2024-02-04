import { createAsyncThunk } from "@reduxjs/toolkit";
import { reduxCommonRequest } from "@/api/redux_common";
import { API_ROUTES } from "@/lib/routes";

// Project details finding
export const getProjects = createAsyncThunk(
  "project/getProjects",
  async (_: undefined, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.PROJECT,
      method: "GET",
      url: "/api/project",
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Project details finding
export const createProject: any = createAsyncThunk(
  "project/createProject",
  async (data: any, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.PROJECT,
      method: "POST",
      url: "/api/project",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Get single Project Details
export const getProject: any = createAsyncThunk(
  "project/getProject",
  async (id: string, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.PROJECT,
      method: "GET",
      url: `/api/project/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Project details Editing
export const editProject: any = createAsyncThunk(
  "project/editProject",
  async (data: any, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.PROJECT,
      method: "PATCH",
      url: "/api/project",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Project deletion
export const deleteProject: any = createAsyncThunk(
  "project/deleteProject",
  async (id: string, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.PROJECT,
      method: "DELETE",
      url: `/api/project/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);
