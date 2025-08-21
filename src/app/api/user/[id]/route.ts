import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL = "http://localhost:3001";

// PUT /api/users/:id
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        });
    }

    console.log('URL:',`${BASE_URL}/users/${id}`);
    const body = await req.json();
    console.log("Request body:", body);
    const res = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log("response data:", data);

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Error updating users:", err);
    return NextResponse.json({ message: "Failed to update users" }, { status: 500 });
  }
}

// GET user by id
export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const res = await fetch(`${BASE_URL}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Error fetching user:", err);
    return NextResponse.json(
      { message: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
