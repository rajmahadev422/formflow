import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Form from "@/models/Form";

export async function GET() {
  try {
    await connectDB();
    const forms = await Form.find({}).sort({ createdAt: -1 });
    return NextResponse.json(forms);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch forms" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const form = await Form.create(body);
    return NextResponse.json(form, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create form" },
      { status: 500 },
    );
  }
}
