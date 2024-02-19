import { createAsyncThunk } from "@reduxjs/toolkit";
import { reduxCommonRequest } from "@/api/redux_common";
import { API_ROUTES } from "@/lib/routes";

// Meeting details finding
export const getMeetings = createAsyncThunk(
  "meeting/getMeetings",
  async ({ filter }: { filter: string }, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.CHAT,
      method: "GET",
      url: `/api/meeting${filter && `?${filter}`}`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Meeting details finding
export const getMeetingByUserId = createAsyncThunk(
  "meeting/getMeetingByUserId",
  async (
    { userSlug, filter }: { userSlug: string; filter: string },
    { rejectWithValue }
  ) => {
    return reduxCommonRequest({
      route: API_ROUTES.CHAT,
      method: "GET",
      url: `/api/meeting/admin/${userSlug}${filter && `?${filter}`}`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Meeting details finding
export const createMeeting: any = createAsyncThunk(
  "meeting/createMeeting",
  async (data: any, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.CHAT,
      method: "POST",
      url: "/api/meeting",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Get single Meeting Details
export const getMeeting: any = createAsyncThunk(
  "meeting/getMeeting",
  async (slug: string, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.CHAT,
      method: "GET",
      url: `/api/meeting/${slug}`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Meeting details Editing
export const editMeeting: any = createAsyncThunk(
  "meeting/editMeeting",
  async ({ data, slug }: { data: any; slug: string }, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.CHAT,
      method: "PATCH",
      url: `/api/meeting/${slug}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);
