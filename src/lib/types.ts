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
  phone: string;
  address: string;
  gender: string;
}

export interface Leave {
  id: number;
  employeeId: number;
  reason: string;
  startDate: string;
  endDate: string;
}