import { Admin, Dropdown, Employee, Leave } from "./types";

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
    phoneNumber: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    gender: "Female",
    remainingLeaves: 10,
  },
  {
    id: 102,
    firstName: "Bob",
    lastName: "Williams",
    email: "bob.w@example.com",
    phoneNumber: "234-567-8901",
    address: "456 Oak Ave, Anytown, USA",
    gender: "Male",
    remainingLeaves: 5,
  },
  {
    id: 103,
    firstName: "Charlie",
    lastName: "Brown",
    email: "charlie.b@example.com",
    phoneNumber: "345-678-9012",
    address: "789 Pine Ln, Anytown, USA",
    gender: "Male",
    remainingLeaves: 8,
  },
];

export const employeesDropdown: Dropdown[] = employees.map((employee) => ({
  value: employee.id.toString(),
  label: `${employee.firstName} ${employee.lastName}`,
}));

export const leaves: Leave[] = [
  {
    id: '1',
    employeeId: '101',
    reason: "Vacation",
    leaveDate: "2024-08-05", // <-- Perubahan
    createdAt: "2024-07-15T09:00:00Z",
  },
  {
    id: '2',
    employeeId: '102',
    reason: "Sick Leave",
    leaveDate: "2024-07-20", // <-- Perubahan
    createdAt: "2024-07-19T14:30:00Z",
  }
];