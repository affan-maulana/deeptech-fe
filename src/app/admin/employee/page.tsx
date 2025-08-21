"use client";

import { useState } from "react";
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
import { employees as initialEmployees } from "@/lib/dummy-data";
import { Employee } from "@/lib/types";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  // Handler to open the "Add New Employee" modal
  const handleAddNew = () => {
    setSelectedEmployee(null);
    setIsFormOpen(true);
  };

  // Handler to open the "Edit Employee" modal
  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsFormOpen(true);
  };

  // Handler for form submission (Create or Update)
  const handleFormSubmit = (employeeData: Omit<Employee, "id">) => {
    if (selectedEmployee) {
      // Update existing employee
      setEmployees(
        employees.map((emp) =>
          emp.id === selectedEmployee.id
            ? { ...emp, ...employeeData }
            : emp
        )
      );
    } else {
      // Add new employee
      const newEmployee: Employee = {
        id: Math.max(...employees.map((e) => e.id), 0) + 1, // Generate a new ID
        ...employeeData,
      };
      setEmployees([...employees, newEmployee]);
    }
    setIsFormOpen(false);
  };

  // Handler for deleting an employee
  const handleDelete = (employeeId: number) => {
    setEmployees(employees.filter((emp) => emp.id !== employeeId));
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
                <TableHead>Phone</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <Link
                      href={`/dashboard/employees/${employee.id}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {`${employee.firstName} ${employee.lastName}`}
                    </Link>
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>{employee.gender}</TableCell>
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