interface InputWithIconProps {
  icon: React.ReactNode;
  placeholder: string;
  type: string;
  field: any;
}

interface EmployeeTypes {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  username: string;
  hiringDate: Date;
  organization: string;
  isActive: boolean;
  salary?: string;
  role?: string;
  profileImageURL?: string;
  employeeType?: string;
  gender?: string;
  designation?: string;
  address?: {
    street?: string;
    state?: string;
    city?: string;
    country?: string;
    zipCode?: string;
  };
}

interface ProjectTypes {
  _id: string;
  slug: string;
  name: string;
  startDate: Date;
  // tasks: [],
  endDate: Date;
  members: [string | EmployeeTypes];
  status: string;
  description: string;
  manager: string | EmployeeTypes;
  // client: string,
  // deal: string,
}
interface AttendanceTypes {
  _id: string;
  employeeId: string;
  date: Date;
  checkInTime: Date;
  checkOutTime: Date;
  status: string;
  description: string;
  remarks: string;
}

interface TaskTypes {
  id: string;
  _id: string;
  title: string;
  slug: string;
  organization: string;
  project: string | ProjectTypes;
  startDate: Date;
  dueDate: Date;
  status: string;
  priority: string;
  assignee: string | EmployeeTypes;
  description: string;
  tags: [];
  subTasks: [TaskTypes];
}

interface LeaveTypes {
  _id: string;
  employeeId: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ChatTypes {
  _id: string;
  participants: [EmployeeTypes];
  groupName: string;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  online: boolean;
}

interface MeetingTypes {
  _id: string;
  title: string;
  description: string;
  type: "offline" | "online";
  slug: string;
  organization: string;
  location?: string;
  date: string;
  startTime: string;
  endTime: string;
  organizer: string | EmployeeTypes;
  status: string;
  participants: EmployeeTypes[];
  createdAt: Date;
  updatedAt: Date;
}

export type {
  InputWithIconProps,
  EmployeeTypes,
  ProjectTypes,
  TaskTypes,
  AttendanceTypes,
  LeaveTypes,
  ChatTypes,
  MeetingTypes,
};
