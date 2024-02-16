import { createAsyncThunk } from "@reduxjs/toolkit";
import { reduxCommonRequest } from "@/api/redux_common";
import { API_ROUTES } from "@/lib/routes";

// Chat details finding
export const getChats = createAsyncThunk(
  "chat/getChats",
  async ({ filter }: { filter: string }, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.CHAT,
      method: "GET",
      url: `/api/chat${filter && `?${filter}`}`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Chat details finding
export const createChat: any = createAsyncThunk(
  "chat/createChat",
  async (data: any, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.CHAT,
      method: "POST",
      url: "/api/chat",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);
