"use client";

import Link from "next/link";
import {
  CircleUser,
  Menu,
  Users,
  Calendar,
  User,
  LayoutDashboard,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ProfileDialog } from "../ProfileDialog"; // 2. Import komponen dialog baru
import { api } from "@/lib/api";

const navItems = [
  // { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  // { href: "/dashboard/admins", icon: Briefcase, label: "Admins" },
  { href: "/admin/employee", icon: Users, label: "Employees" },
  { href: "/admin/leaves", icon: Calendar, label: "Leaves" },
  // { href: "/admin/use", icon: User, label: "Profile" },
];

export function Header() {
  const pathname = usePathname();
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogout = async () => {
    // Implement logout logic here
    await api.post("/api/logout");
    console.log("User logged out");
    window.location.href = "/"; // Redirect to login page
  };

  const handleGetUser = async () => {
    // get userId from local storage
    const id = localStorage.getItem("userId");
    const response = await api.get(`/api/user/${id}`);
    console.log("Fetched user:", response.data.data);
    setUserData(response.data.data);
    setIsProfileDialogOpen(true); // Open the profile dialog
  };
  return (
    <>
      <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="/admin/leaves"
                className="flex items-center gap-2 text-lg font-semibold mb-4"
              >
                <span>Leave Management</span>
              </Link>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                    pathname === item.href && "bg-muted text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="w-full flex-1">
          {/* Bisa ditambahkan search bar di sini jika perlu */}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* 4. Ubah item menu ini untuk membuka dialog */}
            <DropdownMenuItem onClick={() => handleGetUser()}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <ProfileDialog
        open={isProfileDialogOpen}
        onOpenChange={setIsProfileDialogOpen}
        data={userData} // 3. Pass user data to the dialog
      />
    </>
  );
}
