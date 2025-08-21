import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL = "http://localhost:3001";

// PUT /api/leaves/:id
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        });
    }

    console.log('URL:',`${BASE_URL}/leaves/${id}`);
    const body = await req.json();
    const res = await fetch(`${BASE_URL}/leaves/${id}`, {
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
    console.error("Error updating leaves:", err);
    return NextResponse.json({ message: "Failed to update leaves" }, { status: 500 });
  }
}

// DELETE /api/leaves/:id
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        });
    }
    
    const res = await fetch(`${BASE_URL}/leaves/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    return NextResponse.json({}, { status: res.status });
  } catch (err) {
    console.error("Error deleting leaves:", err);
    return NextResponse.json({ message: "Failed to delete leaves" }, { status: 500 });
  }
}
