import { createAsyncThunk } from "@reduxjs/toolkit";
import { reduxCommonRequest } from "@/api/redux_common";
import { API_ROUTES } from "@/lib/routes";

// Employee details finding
export const getEmployees = createAsyncThunk(
  "employee/getEmployees",
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
export const getExEmployees = createAsyncThunk(
  "employee/getExEmployees",
  async (_: undefined, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.EMPLOYEE,
      method: "GET",
      url: "/api/employee/ex",
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Employee details finding
export const createEmployee: any = createAsyncThunk(
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

// Get single Employee Details
export const getEmployee: any = createAsyncThunk(
  "employee/getEmployee",
  async (id: string, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.EMPLOYEE,
      method: "GET",
      url: `/api/employee/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Employee details Editing
export const editEmployee: any = createAsyncThunk(
  "employee/editEmployee",
  async (data: any, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.EMPLOYEE,
      method: "PATCH",
      url: "/api/employee",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Employee deletion
export const deleteEmployee: any = createAsyncThunk(
  "employee/deleteEmployee",
  async (id: string, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.EMPLOYEE,
      method: "DELETE",
      url: `/api/employee/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Employee details Editing
export const terminateEmployee: any = createAsyncThunk(
  "employee/terminateEmployee",
  async ({ data, id }: { data: any; id: string }, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.EMPLOYEE,
      method: "POST",
      url: `/api/employee/terminate/${id}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);
