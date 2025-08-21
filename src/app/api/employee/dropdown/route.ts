import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BASE_URL = "http://localhost:3001";


// GET /api/employee → ambil semua employee
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const res = await fetch(`${BASE_URL}/employee/dropdown`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Error fetching employees:", err);
    return NextResponse.json(
      { message: "Failed to fetch employees" },
      { status: 500 }
    );
  }
}
