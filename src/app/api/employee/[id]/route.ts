import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL = "http://localhost:3001";

// PUT /api/employee/:id
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        });
    }

    console.log('URL:',`${BASE_URL}/employee/${params.id}`);
    const body = await req.json();
    const res = await fetch(`${BASE_URL}/employee/${params.id}`, {
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
    console.error("Error updating employee:", err);
    return NextResponse.json({ message: "Failed to update employee" }, { status: 500 });
  }
}

// DELETE /api/employee/:id
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        });
    }
    
    const res = await fetch(`${BASE_URL}/employee/${params.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    return NextResponse.json({}, { status: res.status });
  } catch (err) {
    console.error("Error deleting employee:", err);
    return NextResponse.json({ message: "Failed to delete employee" }, { status: 500 });
  }
}
