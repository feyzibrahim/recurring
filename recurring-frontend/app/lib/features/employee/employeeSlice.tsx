"use client";

import { createSlice } from "@reduxjs/toolkit";
import { createEmployee, getEmployee } from "./employeeActions";

interface EmployeeType {
  employee: any;
  loading: boolean;
  error: any;
}

const initialState: EmployeeType = {
  employee: null,
  loading: false,
  error: null,
};

export const employeeSLice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmployee.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getEmployee.rejected, (state, { payload }) => {
      state.loading = false;
      state.employee = null;
      state.error = payload;
    });
    builder.addCase(getEmployee.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.employee = payload.user;
    });
    builder.addCase(createEmployee.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createEmployee.rejected, (state, { payload }) => {
      state.loading = false;
      state.employee = null;
      state.error = [payload];
    });
    builder.addCase(createEmployee.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.employee = [...state.employee, ...payload.employee];
    });
  },
});

export default employeeSLice.reducer;
