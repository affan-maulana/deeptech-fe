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
import { LeaveForm } from "@/components/LeaveForm";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialog";
import { LeaveData } from "@/lib/types";
import { Edit } from "lucide-react";
import { format } from "date-fns";
import { api } from "@/lib/api";

// Helper untuk mengubah tanggal ke format YYYY-MM-DD
const formatDate = (date: Date) => format(date, "yyyy-MM-dd");

export default function LeavesPage() {
  const [leaves, setLeaves] = useState<LeaveData[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<LeaveData | null>(null);
  const [employees, setEmployees] = useState([]); // Simulasi data karyawan


  // Fetch list leaves dari API
  const fetchLeaves = async () => {
    try {
      const res = await fetch("/api/leaves", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch leaves");
      const data = await res.json();
      setLeaves(data.data);
    } catch (err) {
      console.error(err);
      alert("Gagal ambil data leaves");
    } finally {
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await fetch("/api/employee/dropdown", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch employees");
      const data = await res.json();
      setEmployees(data.data);
    } catch (err) {
      console.error(err);
      alert("Gagal ambil data employees");
    } finally {
    }
  };

  useEffect(() => {
    fetchLeaves();
    fetchEmployees();
  }, []);

  const handleAddNew = () => {
    setSelectedLeave(null);
    setIsFormOpen(true);
  };

  const handleEdit = (leave: LeaveData) => {
    setSelectedLeave(leave);
    setIsFormOpen(true);
  };

  const handleDelete = async (leaveId: string) => {
    try {
      await api.delete(`/api/leaves/${leaveId}`);
      setLeaves(leaves.filter((l) => l.id !== leaveId));
    } catch (err) {
      console.error("Failed to delete leave:", err);
    }
  };

  const handleFormSubmit = async (data: {
    employeeId: string;
    reason: string;
    leaveDate: Date; // <-- Menerima satu tanggal
  }) => {
    const leaveDate = data.leaveDate;
    console.debug("masukkk");

    if (selectedLeave) {
      console.debug("selectedLeave", selectedLeave);

      // Update
      const updatedLeave: LeaveData = {
        ...selectedLeave,
        reason: data.reason,
        startDate: formatDate(leaveDate), // <-- Perbarui field
        endDate: formatDate(leaveDate), // <-- Perbarui field
      };
      const updateForm = {
        reason: data.reason,
        startDate: formatDate(leaveDate), // <-- Perbarui field
        endDate: formatDate(leaveDate), // <-- Perbarui field
      };
      try {
        await api.put("/api/leaves/" + selectedLeave.id, updateForm);
        setLeaves((prevLeaves) =>
            prevLeaves.map((l) => (l.id === selectedLeave.id ? updatedLeave : l))
        );
      } catch (error: Error | any) {
        console.debug("Failed to create leave", error?.response?.data?.message);
        const alertMessage = error?.response?.data?.message || "Unknown error";
        alert("Oops, " + alertMessage);
      }
    } else {
      const newLeave = {
        employeeId: data.employeeId,
        reason: data.reason,
        startDate: formatDate(leaveDate),
        endDate: formatDate(leaveDate),
      };
      try {
        const res = await api.post("/api/leaves", newLeave);
        setLeaves((prevLeaves) => [...prevLeaves, res.data.data]);
      } catch (error: any) {
        console.debug("Failed to create leave", error.response.data.message);
        const alertMessage = error?.response?.data?.message || "Unknown error";
        alert("Oops, " + alertMessage);
      }
    }
    setIsFormOpen(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Leave Requests</CardTitle>
              <CardDescription>
                Manage all employee leave requests.
              </CardDescription>
            </div>
            <Button onClick={handleAddNew}>Add New Request</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Leave Date</TableHead> {/* <-- Judul kolom diubah */}
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaves.map((leave) => {
                return (
                  <TableRow key={leave.id}>
                    <TableCell className="font-medium">
                      {leave.employee
                        ? `${leave.employee.firstName} ${leave.employee.lastName}`
                        : "Unknown"}
                    </TableCell>
                    <TableCell>{leave.reason}</TableCell>
                    <TableCell>{leave.startDate}</TableCell>{" "}
                    {/* <-- Tampilkan satu tanggal */}
                    <TableCell>
                      {leave.createdAt
                        ? new Date(leave.createdAt).toLocaleDateString()
                        : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(leave)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DeleteConfirmationDialog
                          onConfirm={() => handleDelete(leave.id)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog Tambah/Edit Cuti */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedLeave ? "Edit Leave Request" : "Add New Leave Request"}
            </DialogTitle>
          </DialogHeader>
          <LeaveForm
            leave={selectedLeave}
            employees={employees}
            onSubmit={handleFormSubmit}
            onClose={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
