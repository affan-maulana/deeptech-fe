import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BASE_URL = "http://localhost:3001";


// GET /api/leaves → ambil semua leaves
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const res = await fetch(`${BASE_URL}/leaves`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Error fetching leaves:", err);
    return NextResponse.json(
      { message: "Failed to fetch leaves" },
      { status: 500 }
    );
  }
}

// POST /api/leaves → tambah leave
export async function POST(req: Request) {
  try {

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const body = await req.json();
    const res = await fetch(`${BASE_URL}/leaves`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Error creating leave:", err);
    return NextResponse.json(
      { message: "Failed to create leave" },
      { status: 500 }
    );
  }
}
