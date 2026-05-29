import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Submission from "@/models/Submission";

export async function GET(_req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const submissions = await Submission.find({ formId: id }).sort({ submittedAt: -1 });
    return NextResponse.json(submissions);
  } catch {
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const submission = await Submission.create({ formId: id, data: body });
    return NextResponse.json(submission, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
