export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  gender: string;
  remainingLeaves?: number;
}

export interface Leave {
  id: number;
  employeeId: number;
  reason: string;
  startDate: string;
  endDate: string;
  createdAt?: string; // Tambahkan baris ini
}