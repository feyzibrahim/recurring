"use client";

import { createSlice } from "@reduxjs/toolkit";
import {
  createEmployee,
  getEmployees,
  getEmployee,
  editEmployee,
  deleteEmployee,
  terminateEmployee,
  getExEmployees,
} from "./employeeActions";
import { EmployeeTypes } from "@/constants/Types";

interface EmployeeSliceType {
  employees: EmployeeTypes[] | null;
  loading: boolean;
  error: any;
  employee: EmployeeTypes | null;
}

const initialState: EmployeeSliceType = {
  employees: [],
  loading: false,
  error: null,
  employee: null,
};

export const employeeSLice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all employees
    builder
      .addCase(getEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployees.rejected, (state, { payload }) => {
        state.loading = false;
        state.employees = null;
        state.error = payload;
      })
      .addCase(getEmployees.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.employees = payload.employees;
      })
      // Terminated Employees
      .addCase(getExEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(getExEmployees.rejected, (state, { payload }) => {
        state.loading = false;
        state.employees = null;
        state.error = payload;
      })
      .addCase(getExEmployees.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.employees = payload.employees;
      })
      // Get single employee details
      .addCase(getEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEmployee.rejected, (state, { payload }) => {
        state.loading = false;
        state.employee = null;
        state.error = payload;
      })
      .addCase(getEmployee.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.employee = payload.employee;
      })
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEmployee.rejected, (state, { payload }) => {
        state.loading = false;
        state.employees = null;
        state.error = payload;
      })
      .addCase(createEmployee.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.employees = [
          ...(state.employees || []),
          payload.employee,
        ] as EmployeeTypes[];
      })
      .addCase(editEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(editEmployee.rejected, (state, { payload }) => {
        state.loading = false;
        state.employee = null;
        state.error = payload;
      })
      .addCase(editEmployee.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.employee = payload.employee;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmployee.rejected, (state, { payload }) => {
        state.loading = false;
        state.employees = null;
        state.error = payload;
      })
      .addCase(deleteEmployee.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        if (state.employees !== null) {
          state.employees = state.employees.filter(
            (emp) => emp._id === payload.employee._id
          );
        }
      })
      .addCase(terminateEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(terminateEmployee.rejected, (state, { payload }) => {
        state.loading = false;
        state.employees = null;
        state.error = payload;
      })
      .addCase(terminateEmployee.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        if (state.employees !== null) {
          state.employees = state.employees.filter(
            (emp) => emp._id === payload.employee._id
          );
        }
      });
  },
});

export default employeeSLice.reducer;
