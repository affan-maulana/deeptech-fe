
"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { set } from "zod";

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

const handleLogin = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    setError("");

    try {
      // Panggil Next.js API route
      const res = await api.post("/api/login", { email, password });
      // save user id to local storage
      localStorage.setItem("userId", res.data.data);

      if (res.status === 200) {
        window.location.href = "/admin/employee"; // redirect kalau sukses
      }
    } catch (error) {
      setLoading(false);
      throw error; // lempar error ke catch block
      // setError(err.response?.data?.message || "Login gagal");
    }
    setLoading(false);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error && (
            <div className="text-red-500 text-sm mb-2">{error}</div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleLogin} disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}