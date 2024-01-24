import { createAsyncThunk } from "@reduxjs/toolkit";
import { commonRequest } from "@/api/api";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials: {}, { rejectWithValue }) => {
    try {
      const { data } = await commonRequest({
        method: "POST",
        url: "/auth/login",
        data: userCredentials,
        headers: {
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error: any) {
      console.log("userActions: error", error.message);
      if (error.response && error.response.data.error) {
        console.log(error.response.data.error);

        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
