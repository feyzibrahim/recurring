"use client";

import { createSlice } from "@reduxjs/toolkit";
import { createEmployee, getEmployee } from "./employeeActions";
import { EmployeeTypes } from "@/constants/Types";

interface EmployeeSliceType {
  employees: EmployeeTypes[] | null;
  loading: boolean;
  error: any;
}

const initialState: EmployeeSliceType = {
  employees: [],
  loading: false,
  error: null,
};

export const employeeSLice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmployee.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getEmployee.rejected, (state, { payload }) => {
      state.loading = false;
      state.employees = null;
      state.error = payload;
    });
    builder.addCase(getEmployee.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.employees = payload.employees;
    });
    builder.addCase(createEmployee.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createEmployee.rejected, (state, { payload }) => {
      state.loading = false;
      state.employees = null;
      state.error = payload;
    });
    builder.addCase(createEmployee.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.employees = [
        ...(state.employees || []),
        payload.employee,
      ] as EmployeeTypes[];
    });
  },
});

export default employeeSLice.reducer;
