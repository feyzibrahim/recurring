import { createAsyncThunk } from "@reduxjs/toolkit";
import { reduxCommonRequest } from "@/api/redux_common";
import { API_ROUTES } from "@/lib/routes";

// Employee details finding
export const getEmployee = createAsyncThunk(
  "employee/getEmployee",
  async (_: undefined, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.EMPLOYEE,
      method: "GET",
      url: "/api/employee",
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Employee details finding
export const createEmployee = createAsyncThunk(
  "employee/createEmployee",
  async (data: any, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.EMPLOYEE,
      method: "POST",
      url: "/api/employee",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);
