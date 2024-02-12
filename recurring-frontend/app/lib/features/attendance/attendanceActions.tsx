import { createAsyncThunk } from "@reduxjs/toolkit";
import { reduxCommonRequest } from "@/api/redux_common";
import { API_ROUTES } from "@/lib/routes";

// Attendance details finding
export const getAttendances = createAsyncThunk(
  "attendance/getAttendances",
  async (_: undefined, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.EMPLOYEE,
      method: "GET",
      url: "/api/attendance/",
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Attendance details finding
export const getAttendanceByUserId = createAsyncThunk(
  "attendance/getAttendanceByUserId",
  async (
    { userSlug, filter }: { userSlug: string; filter: string },
    { rejectWithValue }
  ) => {
    return reduxCommonRequest({
      route: API_ROUTES.EMPLOYEE,
      method: "GET",
      url: `/api/attendance/admin/${userSlug}${filter && `?${filter}`}`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Attendance details finding
export const createAttendance: any = createAsyncThunk(
  "attendance/createAttendance",
  async (data: any, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.EMPLOYEE,
      method: "POST",
      url: "/api/attendance",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

export const createAttendanceByAdmin: any = createAsyncThunk(
  "attendance/createAttendanceByAdmin",
  async (data: any, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.EMPLOYEE,
      method: "POST",
      url: "/api/attendance/admin",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Get single Attendance Details
export const getAttendance: any = createAsyncThunk(
  "attendance/getAttendance",
  async (id: string, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.EMPLOYEE,
      method: "GET",
      url: `/api/attendance/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Attendance details Editing
export const editAttendance: any = createAsyncThunk(
  "attendance/editAttendance",
  async (data: any, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.EMPLOYEE,
      method: "PATCH",
      url: "/api/attendance",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Attendance deletion
export const deleteAttendance: any = createAsyncThunk(
  "attendance/deleteAttendance",
  async (id: string, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.EMPLOYEE,
      method: "DELETE",
      url: `/api/attendance/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);
