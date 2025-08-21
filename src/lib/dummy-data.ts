import { Admin, Employee, Leave } from "./types";

export const admins: Admin[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    gender: "Male",
    dob: "1985-06-15",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    gender: "Female",
    dob: "1990-02-20",
  },
];

export const employees: Employee[] = [
  {
    id: 101,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.j@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    gender: "Female",
  },
  {
    id: 102,
    firstName: "Bob",
    lastName: "Williams",
    email: "bob.w@example.com",
    phone: "234-567-8901",
    address: "456 Oak Ave, Anytown, USA",
    gender: "Male",
  },
  {
    id: 103,
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie.b@example.com",
    phone: "345-678-9012",
    address: "789 Pine Ln, Anytown, USA",
    gender: "Male",
  },
];

export const leaves: Leave[] = [
  {
    id: 1,
    employeeId: 101,
    reason: "Vacation",
    startDate: "2024-08-01",
    endDate: "2024-08-10",
  },
  {
    id: 2,
    employeeId: 102,
    reason: "Sick Leave",
    startDate: "2024-07-20",
    endDate: "2024-07-21",
  },
  {
    id: 3,
    employeeId: 101,
    reason: "Personal Leave",
    startDate: "2024-09-05",
    endDate: "2024-09-06",
  },
  {
    id: 4,
    employeeId: 103,
    reason: "Vacation",
    startDate: "2024-10-10",
    endDate: "2024-10-15",
  },
];