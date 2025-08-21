"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Definisikan item navigasi dalam sebuah array agar mudah dikelola
const navItems = [
  // { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
//   { href: "/admin/users", icon: Briefcase, label: "Admins" },
  { href: "/admin/employee", icon: Users, label: "Employees" },
  { href: "/admin/leave", icon: Calendar, label: "Leaves" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/admin/leaves" className="flex items-center gap-2 font-semibold">
            <span className="">Leave Management</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  // Terapkan style aktif jika pathname cocok
                  pathname === item.href && "bg-muted text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}