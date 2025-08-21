export interface Admin {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dob: string;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  gender: string;
  remainingLeaves: number;
}

export interface Leave {
  id: string;
  employeeId?: string;
  reason: string;
  leaveDate?: string;
  createdAt?: string;
}

export interface LeaveData {
  id: string;
  reason: string;
  startDate: string;
  endDate: string;
  createdAt?: string;
  updatedAt?: string;
  employee?: Employee;
}

export interface Dropdown {
  value: string;
  label: string;
}

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: string;
  dateOfBirth: string;
}