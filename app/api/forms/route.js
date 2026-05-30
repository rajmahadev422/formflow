import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Form from "@/models/Form";

export async function GET(req) {

  const userEmail = req.headers.get('x-user-email');
  if(!userEmail) return NextResponse.json({error: "User not found"}, {status: 404});
  
  try {
    await connectDB();
    const forms = await Form.find({userEmail}).sort({ createdAt: -1 });
    return NextResponse.json(forms);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch forms" },
      { status: 500 },
    );
  }
}

export async function POST(req) {

  const userEmail = req.headers.get('x-user-email');

  if(!userEmail) return NextResponse.json({error: "User not found"}, {status: 404});
  console.log(userEmail)
  try {
    await connectDB();
    let body = await req.json();
    body = {...body, userEmail};
    const form = await Form.create(body);
    return NextResponse.json(form, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create form" },
      { status: 500 },
    );
  }
}
