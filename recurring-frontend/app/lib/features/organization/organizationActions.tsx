import { createAsyncThunk } from "@reduxjs/toolkit";
import { reduxCommonRequest } from "@/api/redux_common";
import { API_ROUTES } from "@/lib/routes";

// Organization details finding
export const getOrganizations = createAsyncThunk(
  "organization/getOrganizations",
  async (_, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.AUTH,
      method: "GET",
      url: `/api/user/organization/admin`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Get single Organization Details
export const getOrganization: any = createAsyncThunk(
  "organization/getOrganization",
  async (id: string, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.AUTH,
      method: "GET",
      url: `/api/organization/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);

// Organization details Editing
export const editOrganization: any = createAsyncThunk(
  "organization/editOrganization",
  async (data: any, { rejectWithValue }) => {
    return reduxCommonRequest({
      route: API_ROUTES.AUTH,
      method: "PATCH",
      url: "/api/organization",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
      rejectWithValue,
    });
  }
);
