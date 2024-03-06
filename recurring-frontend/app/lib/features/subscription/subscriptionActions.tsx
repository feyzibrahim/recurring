import { createAsyncThunk } from "@reduxjs/toolkit";
import { reduxCommonRequest } from "@/api/redux_common";
import { API_ROUTES } from "@/lib/routes";

// Subscription details finding
export const getSubscriptions = createAsyncThunk(
  "subscription/getSubscriptions",
  async (_, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.SUBSCRIPTION,
      method: "GET",
      url: `/api/subscription/admin`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Get single Subscription Details
export const getSubscription: any = createAsyncThunk(
  "subscription/getSubscription",
  async (id: string, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.SUBSCRIPTION,
      method: "GET",
      url: `/api/subscription/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Subscription details Editing
export const editSubscription: any = createAsyncThunk(
  "subscription/editSubscription",
  async (data: any, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.SUBSCRIPTION,
      method: "PATCH",
      url: "/api/subscription",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);
