import { createAsyncThunk } from "@reduxjs/toolkit";
import { reduxCommonRequest } from "@/api/redux_common";
import { API_ROUTES } from "@/lib/routes";
import { ClientTypes } from "@/constants/Types";

// Client details finding
export const getClients = createAsyncThunk(
  "client/getClients",
  async (_: undefined, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.CLIENT_DEALS,
      method: "GET",
      url: `/api/client`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Client details finding
export const createClient: any = createAsyncThunk(
  "client/createClient",
  async (data: ClientTypes, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.CLIENT_DEALS,
      method: "POST",
      url: "/api/client",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Get single Client Details
export const getClient: any = createAsyncThunk(
  "client/getClient",
  async (slug: string, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.CLIENT_DEALS,
      method: "GET",
      url: `/api/client/${slug}`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Client details Editing
export const editClient: any = createAsyncThunk(
  "client/editClient",
  async (
    { data, slug }: { data: ClientTypes; slug: string },
    { rejectWithValue }
  ) => {
    return reduxCommonRequest({
      route: API_ROUTES.CLIENT_DEALS,
      method: "PATCH",
      url: `/api/client/${slug}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);
