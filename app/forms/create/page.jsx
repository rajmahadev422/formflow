"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormBuilderStore } from "@/lib/store";
import FieldCard from "@/components/FieldCard";

const FIELD_TYPES = [
  { type: "text", label: "Short Text", icon: "T" },
  { type: "textarea", label: "Long Text", icon: "¶" },
  { type: "number", label: "Number", icon: "#" },
  { type: "email", label: "Email", icon: "@" },
  { type: "select", label: "Dropdown", icon: "▾" },
  { type: "radio", label: "Radio", icon: "◉" },
  { type: "checkbox", label: "Checkbox", icon: "☑" },
  { type: "date", label: "Date", icon: "📅" },
];

export default function CreatePage() {
  const {
    title,
    description,
    fields,
    setTitle,
    setDescription,
    addField,
    reset,
  } = useFormBuilderStore();

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [add, setAdd] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Please add a form title");
      return;
    }
    if (fields.length === 0) {
      alert("Please add at least one field");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, fields }),
      });
      const form = await res.json();

      if (!res.ok) return console.log(res.statusText);
      setSaved(true);
      reset();
      setTimeout(() => router.push(`/view/${form._id}`), 800);
    } catch {
      alert("Failed to save form");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 pb-16">
      <div className="mb-8">
        <h1 className="font-['DM_Serif_Display',serif] text-3xl mb-1">
          Create Form
        </h1>
        <p className="text-(--text-2) text-sm m-0">
          Add fields, configure options, and save to get a shareable link
        </p>
      </div>

      {/* Primary Info Form Config */}
      <div className="bg-(--surface) border border-(--border) rounded p-6 mb-5">
        <div className="mb-4">
          <label className="label">Form Title *</label>
          <input
            className="input text-base"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Customer Feedback Survey"
          />
        </div>
        <div>
          <label className="label">Description</label>
          <textarea
            className="input resize-y"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description or instructions for respondents"
            rows={2}
          />
        </div>
      </div>

      {/* Empty State vs Configured List */}
      {fields.length !== 0 && (
        <div className="flex flex-col gap-3 mb-5">
          {fields.map((field, i) => (
            <FieldCard
              key={field.id}
              field={field}
              index={i}
              total={fields.length}
            />
          ))}
        </div>
      )}
      {/* Builder Fields Toolbar Grid */}

      {/* The flipping element container */}
      <div
        className={`mb-6 w-full h-full transition-transform duration-500 transform-3d ${
          add ? "transform-[rotateX(180deg)]" : "transform-[rotateX(0deg)]"
        }`}
      >
        {/* FRONT SIDE: The Add First Field Empty State Button */}
        <div
          onClick={() => setAdd(true)}
          className="absolute inset-0 w-full h-full backface-hidden bg-(--surface) border border-(--border) rounded py-12 px-6 text-center border-dashed cursor-pointer flex flex-col justify-center items-center"
        >
          <div className="text-4xl mb-3">➕</div>
          <p className="text-(--text-2) m-0">
            Add your first field using the toolbar below
          </p>
        </div>

        {/* BACK SIDE: The Field Selection Toolbar Grid */}
        <div className="w-full h-full backface-hidden transform-[rotateX(180deg)] bg-(--surface-2) border border-(--border) rounded p-4 flex flex-col justify-center">
          <div className="text-xs font-semibold text-(--text-3) tracking-widest mb-3 uppercase">
            Add Field
          </div>
          <div className="flex flex-wrap gap-2">
            {FIELD_TYPES.map((t) => (
              <button
                key={t.type}
                onClick={() => {
                  addField(t.type);
                  setAdd(false);
                }}
                className="btn-ghost px-3.5 py-1.5 text-xs bg-(--surface) border border-(--border)"
              >
                <span className="font-mono font-bold text-(--accent)">
                  {t.icon}
                </span>{" "}
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form Submission Actions Row */}
      <div className="flex gap-3 justify-end">
        <button onClick={reset} className="btn-ghost">
          Reset
        </button>
        <button
          onClick={handleSave}
          className="btn-primary min-w-30"
          disabled={saving || saved}
        >
          {saved ? "✅ Saved!" : saving ? "Saving…" : "💾 Save Form"}
        </button>
      </div>
    </div>
  );
}
