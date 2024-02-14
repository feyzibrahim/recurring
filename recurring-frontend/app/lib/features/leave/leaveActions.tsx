import { createAsyncThunk } from "@reduxjs/toolkit";
import { reduxCommonRequest } from "@/api/redux_common";
import { API_ROUTES } from "@/lib/routes";

// Leave details finding
export const getLeaves = createAsyncThunk(
  "leave/getLeaves",
  async ({ filter }: { filter: string }, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.EMPLOYEE,
      method: "GET",
      url: `/api/leave${filter && `?${filter}`}`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Leave details finding
export const getLeavesForUser = createAsyncThunk(
  "leave/getLeavesForUser",
  async ({ filter }: { filter: string }, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.EMPLOYEE,
      method: "GET",
      url: `/api/leave/for-user${filter && `?${filter}`}`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Leave details finding
export const createLeave: any = createAsyncThunk(
  "leave/createLeave",
  async (data: any, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.EMPLOYEE,
      method: "POST",
      url: "/api/leave",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

export const createLeaveByAdmin: any = createAsyncThunk(
  "leave/createLeaveByAdmin",
  async (data: any, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.EMPLOYEE,
      method: "POST",
      url: "/api/leave/admin",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Get single Leave Details
export const getLeave: any = createAsyncThunk(
  "leave/getLeave",
  async (id: string, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.EMPLOYEE,
      method: "GET",
      url: `/api/leave/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Leave details Editing
export const editLeave: any = createAsyncThunk(
  "leave/editLeave",
  async (data: any, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.EMPLOYEE,
      method: "PATCH",
      url: "/api/leave",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Leave deletion
export const deleteLeave: any = createAsyncThunk(
  "leave/deleteLeave",
  async (id: string, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.EMPLOYEE,
      method: "DELETE",
      url: `/api/leave/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);
