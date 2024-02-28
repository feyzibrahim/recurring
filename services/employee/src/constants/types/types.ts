export const TYPES = {
  // Employee
  EmployeeAdapterInterface: Symbol.for("EmployeeAdapterInterface"),
  EmployeeUseCaseInterface: Symbol.for("EmployeeUseCaseInterface"),

  // Attendance
  AttendanceAdapterInterface: Symbol.for("AttendanceAdapterInterface"),
  AttendanceUseCaseInterface: Symbol.for("AttendanceUseCaseInterface"),

  // Salary
  SalaryAdapterInterface: Symbol.for("SalaryAdapterInterface"),
  SalaryUseCaseInterface: Symbol.for("SalaryUseCaseInterface"),

  // Leave
  LeaveAdapterInterface: Symbol.for("LeaveAdapterInterface"),
  LeaveUseCaseInterface: Symbol.for("LeaveUseCaseInterface"),

  // LeavePolicy
  LeavePolicyAdapterInterface: Symbol.for("LeavePolicyAdapterInterface"),
  LeavePolicyUseCaseInterface: Symbol.for("LeavePolicyUseCaseInterface"),

  // RabbitMQ
  RabbitMQServiceInitializer: Symbol.for("RabbitMQServiceInitializer"),
  RabbitMQUseCaseInterface: Symbol.for("RabbitMQUseCaseInterface"),
};
