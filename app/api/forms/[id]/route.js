import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Form from "@/models/Form";

export async function GET(_req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const form = await Form.findById(id);
    if (!form) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(form);
  } catch {
    return NextResponse.json({ error: "Failed to fetch form" }, { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    await Form.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
