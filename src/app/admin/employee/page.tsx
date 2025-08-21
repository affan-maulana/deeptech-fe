"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EmployeeForm } from "@/components/EmployeeForm";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog";
import { Employee } from "@/lib/types";
import { Edit } from "lucide-react";
import { api } from "@/lib/api";
import { AxiosError } from "axios";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Load data employee dari backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get("/api/employee");
        if (res.status !== 200) {
          throw new Error("Failed to fetch employees");
        }

        setEmployees(res.data.data);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
      }
    };
    fetchEmployees();
  }, []);

  const handleAddNew = () => {
    setSelectedEmployee(null);
    setIsFormOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsFormOpen(true);
  };

  // Create / Update employee
  const handleFormSubmit = async (employeeData: Omit<Employee, "id">) => {
    try {
      // remove remainingLeaves from employee data
      const { remainingLeaves, ...updatedEmployeeData } = employeeData;
      if (selectedEmployee) {
        const res = await api.put(`/api/employee/${selectedEmployee.id}`, updatedEmployeeData);
        if (res.status !== 200) {
          throw new Error("Failed to update employee");
        }
        setEmployees(
          employees.map((emp) =>
            emp.id === selectedEmployee.id ? res.data.data : emp
          )
        );
      } else {
        const res = await api.post("/api/employee", updatedEmployeeData);
        setEmployees([...employees, res.data.data]);
      }
      setIsFormOpen(false);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.debug("Failed to create employee", err?.response);
      const alertMessage = err?.response?.data?.message || "Unknown error";
      alert("Oops, " + alertMessage);
    }
  };

  // Delete employee
  const handleDelete = async (employeeId: number) => {
    try {
      await api.delete(`/api/employee/${employeeId}`);
      setEmployees(employees.filter((emp) => emp.id !== employeeId));
    } catch (err) {
      console.error("Failed to delete employee:", err);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Employees</CardTitle>
              <CardDescription>
                Manage your employees and their details.
              </CardDescription>
            </div>
            <Button onClick={handleAddNew}>Add New Employee</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Remaining Leaves</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.phoneNumber}</TableCell>
                  <TableCell>{employee.gender}</TableCell>
                  <TableCell>{employee.address}</TableCell>
                  <TableCell>{employee.remainingLeaves}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(employee)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DeleteConfirmationDialog
                        onConfirm={() => handleDelete(employee.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Employee Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedEmployee ? "Edit Employee" : "Add New Employee"}
            </DialogTitle>
          </DialogHeader>
          <EmployeeForm
            employee={selectedEmployee}
            onSubmit={handleFormSubmit}
            onClose={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
