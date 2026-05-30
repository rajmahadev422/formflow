"use client"
import Navbar from "@/components/Navbar";
import { useAuth } from "@/lib/store";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

const steps = [
  {
    icon: "✏️",
    title: "Create a Form",
    desc: "Use the builder to add fields — text, dropdowns, checkboxes, dates, and more. Give your form a title and description.",
  },
  {
    icon: "🔗",
    title: "Share the Link",
    desc: "Each form gets a unique link. Share it with anyone — they can fill it from any device without needing an account.",
  },
  {
    icon: "📊",
    title: "View Responses",
    desc: "All submissions are collected in the Data page. Download them as a PDF with a single click.",
  },
];

const features = [
  { icon: "📝", label: "8 Field Types" },
  { icon: "🎨", label: "Dark & Light Mode" },
  { icon: "📱", label: "Mobile Responsive" },
  { icon: "📄", label: "PDF Export" },
  { icon: "🗄️", label: "MongoDB Storage" },
  { icon: "⚡", label: "Built with Next.js" },
];

export default function LandingPage() {
  const {data: session} = useSession();
  const {setUser} = useAuth();

    useEffect(() => {
      if (session && session.user) {
        setUser(session.user);
      }
    }, [session, setUser]);

  return (
    <div className="bg-(--bg)">
      <Navbar />
      {/* Hero Section */}
      <section className="text-center p-8">
        <div className="inline-flex items-center gap-2 bg-(--accent-light) text-(--accent) rounded-full px-4 py-1.2 text-xs font-semibold mb-6 tracking-widest">
          ✦ FORM BUILDER
        </div>
        <h1 className="font-['DM_Serif_Display',serif] text-[clamp(2.5rem,6vw,4rem)] line-height-[1.1] text-(--text) mb-5">
          Build forms{" "}
          <em className="text-(--accent) italic not-italic-none">beautifully</em>
          <br />in minutes
        </h1>
        <p className="text-(--text-2) text-lg leading-relaxed max-w-130 mx-auto mb-10">
          FormFlow lets you create, share, and analyze forms — with a clean interface and PDF export built in.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link 
            href="/forms/create" 
            className="bg-(--accent) text-white px-8 py-3 rounded-xl no-underline font-semibold text-base inline-flex items-center gap-1.5"
          >
            ✨ Create a Form
          </Link>
          <Link 
            href="/forms" 
            className="bg-(--surface) text-(--text) border border-(--border) px-8 py-3 rounded-xl no-underline font-semibold text-base inline-flex items-center gap-1.5"
          >
            📋 My Forms
          </Link>
        </div>
      </section>

      {/* Features Badge Section */}
      <section className="max-w-180 mx-auto px-6 pb-12">
        <div className="flex flex-wrap gap-2 justify-center">
          {features.map((f) => (
            <span 
              key={f.label} 
              className="bg-(--surface-2) border border-(--border) rounded-lg px-3.5 py-1.5 text-[0.85rem] text-(--text-2) font-medium flex items-center gap-1.5"
            >
              {f.icon} {f.label}
            </span>
          ))}
        </div>
      </section>

      {/* How it Works & Fields Section */}
      <section className="max-w-225 mx-auto px-6 py-8 pb-24">
        <h2 className="font-['DM_Serif_Display',serif] text-[clamp(1.6rem,4vw,2.2rem)] text-center text-(--text) mb-3">
          How it works
        </h2>
        <p className="text-center text-(--text-2) mb-12">Three steps from idea to insights</p>
        
        {/* Step Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className="bg-(--surface) border border-(--border) rounded-xl p-7 relative"
            >
              <div className="absolute top-4 right-4 text-xs font-bold text-(--text-3) font-['DM_Serif_Display',serif]">
                0{i + 1}
              </div>
              <div className="text-3xl mb-4">{step.icon}</div>
              <h3 className="text-base font-semibold text-(--text) mb-2.5">{step.title}</h3>
              <p className="text-(--text-2) text-[0.875rem] leading-relaxed m-0">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Supported Fields Card */}
        <div className="bg-(--surface) border border-(--border) rounded-xl mt-8 p-8">
          <h3 className="font-['DM_Serif_Display',serif] text-xl mb-4 text-(--text)">Supported field types</h3>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
            {[
              { type: "Text", desc: "Short answers" },
              { type: "Textarea", desc: "Long answers" },
              { type: "Number", desc: "Numeric input" },
              { type: "Email", desc: "Email address" },
              { type: "Dropdown", desc: "Select one option" },
              { type: "Radio", desc: "Single choice" },
              { type: "Checkbox", desc: "Multiple choice" },
              { type: "Date", desc: "Date picker" },
            ].map((f) => (
              <div 
                key={f.type} 
                className="bg-(--bg-2) border border-(--border) rounded-lg p-3"
              >
                <div className="font-semibold text-[0.875rem] text-(--text) mb-0.5">{f.type}</div>
                <div className="text-[0.78rem] text-(--text-3)">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}