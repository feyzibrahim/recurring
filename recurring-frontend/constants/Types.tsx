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
  members: [];
  status: string;
  description: string;
  manager: string;
  // client: string,
  // deal: string,
}

interface TaskTypes {
  _id: string;
  title: string;
  slug: string;
  organization: string;
  project: string;
  startDate: Date;
  dueDate: Date;
  status: string;
  priority: string;
  assignee: string;
  description: string;
  tags: [];
  subTasks: [TaskTypes];
}

export type { InputWithIconProps, EmployeeTypes, ProjectTypes, TaskTypes };
