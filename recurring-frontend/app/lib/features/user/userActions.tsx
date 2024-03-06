import { createAsyncThunk } from "@reduxjs/toolkit";
import { reduxCommonRequest } from "@/api/redux_common";
import { API_ROUTES } from "@/lib/routes";

// User details finding
export const getUsers = createAsyncThunk(
  "user/getUsers",
  async ({ query }: { query: string }, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.AUTH,
      method: "GET",
      url: `/api/user/admin${query ? `?role=${query}` : ""}`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Get single User Details
export const getUser: any = createAsyncThunk(
  "user/getUser",
  async (id: string, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.AUTH,
      method: "GET",
      url: `/api/user/admin/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// User details Editing
export const editUser: any = createAsyncThunk(
  "user/editUser",
  async (data: any, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.AUTH,
      method: "PATCH",
      url: "/api/user/admin",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);
