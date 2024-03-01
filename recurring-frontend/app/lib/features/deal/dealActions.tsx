import { createAsyncThunk } from "@reduxjs/toolkit";
import { reduxCommonRequest } from "@/api/redux_common";
import { API_ROUTES } from "@/lib/routes";
import { DealTypes } from "@/constants/Types";

// Deal details finding
export const getDeals = createAsyncThunk(
  "deal/getDeals",
  async (_: undefined, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.CLIENT_DEALS,
      method: "GET",
      url: `/api/deal`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Deal details finding
export const createDeal: any = createAsyncThunk(
  "deal/createDeal",
  async (data: DealTypes, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.CLIENT_DEALS,
      method: "POST",
      url: "/api/deal",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Get single Deal Details
export const getDeal: any = createAsyncThunk(
  "deal/getDeal",
  async (slug: string, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.CLIENT_DEALS,
      method: "GET",
      url: `/api/deal/${slug}`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Deal details Editing
export const editDeal: any = createAsyncThunk(
  "deal/editDeal",
  async (
    { data, slug }: { data: DealTypes; slug: string },
    { rejectWithValue }
  ) => {
    return reduxCommonRequest({
      route: API_ROUTES.CLIENT_DEALS,
      method: "PATCH",
      url: `/api/deal/${slug}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);
