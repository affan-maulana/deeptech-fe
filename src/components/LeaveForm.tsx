"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Dropdown, Leave } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const leaveReasons = [
  "Vacation",
  "Sick Leave",
  "Personal Leave",
  "Family Emergency",
];

// Skema validasi diperbarui untuk satu tanggal
const leaveFormSchema = z.object({
  employeeId: z.string().min(1, "Employee is required."),
  reason: z.string().min(1, "Reason is required."),
  leaveDate: z.date().refine((val) => !!val, { message: "A leave date is required." }),
});

type LeaveFormValues = z.infer<typeof leaveFormSchema>;

interface LeaveFormProps {
  leave: Leave | null;
  employees: Dropdown[];
  onSubmit: (values: LeaveFormValues) => void;
  onClose: () => void;
}

export function LeaveForm({ leave, employees, onSubmit, onClose }: LeaveFormProps) {
  const form = useForm<LeaveFormValues>({
    resolver: zodResolver(leaveFormSchema),
    // Nilai default diperbarui untuk satu tanggal
    defaultValues: {
      employeeId: leave?.employeeId || "",
      reason: leave?.reason || "",
      leaveDate: leave && leave.leaveDate ? new Date(leave.leaveDate) : undefined,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="employeeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an employee" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.value} value={employee.value}>
                      {`${employee.label}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason for leave" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {leaveReasons.map((reason) => (
                    <SelectItem key={reason} value={reason}>
                      {reason}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="leaveDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Leave Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP") // Format tanggal yang lebih ramah
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single" // <-- Mode diubah menjadi 'single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save Request</Button>
        </div>
      </form>
    </Form>
  );
}