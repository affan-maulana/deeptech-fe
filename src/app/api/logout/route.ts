import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    // Forward ke backend NestJS
    const backendRes = await fetch("http://localhost:3001/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    // remove token from cookie
    cookieStore.delete("token");

    return NextResponse.json({ message: "Logout successful" }, { status: backendRes.status });
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json({ message: "Logout failed" }, { status: 500 });
  }
}
