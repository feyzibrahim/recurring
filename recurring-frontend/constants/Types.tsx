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
  subTasks: [SubTaskTypes];
  notes: [NotesTypes];
}

interface SubTaskTypes {
  _id: string;
  title: string;
  status: "planning" | "active" | "completed" | "archive" | "backlog";
}
interface NotesTypes {
  _id: string;
  text: string;
  user: string | EmployeeTypes;
  createdAt: Date;
  updatedAt: Date;
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

interface CountByDay {
  date: Date;
  count: number;
}

interface TaskCount {
  date: Date;
  completed: number;
  planning: number;
  backlog: number;
  active: number;
}

interface MessageTypes {
  message: string;
  from: string;
  to: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ClientTypes {
  _id: string;
  details: {
    name: string;
    contactPerson?: string;
    profileImageURL?: string;
  };
  email: string;
  type: "individual" | "company";
  phone: string;
  organization: string;
  slug: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  industry: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ActivityTypes {
  _id: string;
  title: string;
  description: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}
interface NoteTypes {
  _id: string;
  content: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}

interface DealTypes {
  _id: string;
  title: string;
  description: string;
  organization: string;
  amount: number;
  expectedCloseDate: Date;
  status: "lead" | "qualified" | "proposal" | "negotiation" | "closed" | "lost";
  priority: "low" | "medium" | "high";
  lastContacted: Date;
  slug: string;
  client: ClientTypes;
  createdBy: string;
  activity: [ActivityTypes];
  note: [NoteTypes];
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
  CountByDay,
  TaskCount,
  SubTaskTypes,
  NotesTypes,
  MessageTypes,
  ClientTypes,
  DealTypes,
  ActivityTypes,
  NoteTypes,
};
