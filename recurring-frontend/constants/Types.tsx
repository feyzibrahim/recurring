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
  phoneNumber: number;
  email: string;
  username: Date;
  hireDate: Date;
  organization: string;
  isActive: boolean;
  salary?: number;
  role?: string;
  profileImageURL?: string;
  employeeType?: string;
  gender?: string;
  designation?: string;
  street?: string;
  state?: string;
  city?: string;
  country?: string;
  zipCode?: number;
}

export type { InputWithIconProps, EmployeeTypes };
