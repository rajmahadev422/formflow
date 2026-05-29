"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import FormFooter from "@/components/FormFooter";

export default function ViewFormPage() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetch(`/api/forms/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm(data);
        setLoading(false);
      });
  }, [id]);

  const setValue = (fieldId, val) => {
    setValues((v) => ({ ...v, [fieldId]: val }));
    setErrors((e) => {
      const n = { ...e };
      delete n[fieldId];
      return n;
    });
  };

  const toggleCheckbox = (fieldId, option) => {
    const cur = values[fieldId] || [];
    setValue(
      fieldId,
      cur.includes(option) ? cur.filter((x) => x !== option) : [...cur, option],
    );
  };

  const validate = () => {
    const errs = {};
    form?.fields.forEach((f) => {
      if (!f.required) return;
      const v = values[f.id];
      if (!v || (Array.isArray(v) && v.length === 0) || v === "") {
        errs[f.id] = "This field is required";
      }
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      await fetch(`/api/forms/${id}/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setSubmitted(true);
    } catch {
      alert("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="text-center py-24 px-6 text-(--text-3)">
        Loading form…
      </div>
    );

  if (!form || form.error)
    return (
      <div className="text-center py-24 px-6">
        <p className="text-(--danger) mb-4">Form not found.</p>
        <Link href="/forms" className="btn-ghost">
          ← Back to Forms
        </Link>
      </div>
    );

  if (submitted)
    return (
      <div className="max-w-140 mx-auto py-24 px-6 text-center">
        <div className="text-[3.5rem] mb-4">✅</div>
        <h2 className="font-['DM_Serif_Display',serif] text-3xl mb-3">
          Response submitted!
        </h2>
        <p className="text-(--text-2) mb-8">
          Thank you for filling out <strong>{form.title}</strong>.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => {
              setSubmitted(false);
              setValues({});
            }}
            className="btn-ghost"
          >
            Submit another
          </button>
          <Link href={`/`} className="btn-primary">
            Create Your Own From →
          </Link>
        </div>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 pb-16">
      {/* Form Header Card */}
      <div className="bg-(--surface) border border-(--border) rounded-xl p-7 mb-5 border-t-4 border-t-(--accent)">
        <h1 className="font-['DM_Serif_Display',serif] text-3xl mb-2">
          {form.title}
        </h1>
        {form.description && (
          <p className="text-(--text-2) m-0 leading-relaxed">
            {form.description}
          </p>
        )}
        <p className="text-(--text-3) text-[0.78rem] mt-3 mb-0">
          * Required fields
        </p>
      </div>

      {/* Dynamic Fields List */}
      <div className="flex flex-col gap-3.5">
        {form.fields.map((field, i) => (
          <div
            key={field.id}
            className="bg-(--surface) border border-(--border) rounded-xl px-6 py-5 fade-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <label className="block font-semibold mb-2.5 text-[0.95rem]">
              {field.label}
              {field.required && (
                <span className="text-(--danger) ml-1">*</span>
              )}
            </label>

            {field.type === "text" && (
              <input
                className="input"
                placeholder={field.placeholder}
                value={values[field.id] || ""}
                onChange={(e) => setValue(field.id, e.target.value)}
              />
            )}
            {field.type === "textarea" && (
              <textarea
                className="input resize-y"
                placeholder={field.placeholder}
                value={values[field.id] || ""}
                onChange={(e) => setValue(field.id, e.target.value)}
                rows={3}
              />
            )}
            {field.type === "number" && (
              <input
                className="input"
                type="number"
                placeholder={field.placeholder}
                value={values[field.id] || ""}
                onChange={(e) => setValue(field.id, e.target.value)}
              />
            )}
            {field.type === "email" && (
              <input
                className="input"
                type="email"
                placeholder={field.placeholder}
                value={values[field.id] || ""}
                onChange={(e) => setValue(field.id, e.target.value)}
              />
            )}
            {field.type === "date" && (
              <input
                className="input"
                type="date"
                value={values[field.id] || ""}
                onChange={(e) => setValue(field.id, e.target.value)}
              />
            )}
            {field.type === "select" && (
              <select
                className="input"
                value={values[field.id] || ""}
                onChange={(e) => setValue(field.id, e.target.value)}
              >
                <option value="">Select an option…</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}
            {field.type === "radio" && (
              <div className="flex flex-col gap-2">
                {field.options?.map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2 cursor-pointer text-sm text-(--text-2)"
                  >
                    <input
                      type="radio"
                      name={field.id}
                      value={opt}
                      checked={values[field.id] === opt}
                      onChange={() => setValue(field.id, opt)}
                      className="accent-(--accent) w-4 h-4"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            )}
            {field.type === "checkbox" && (
              <div className="flex flex-col gap-2">
                {field.options?.map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2 cursor-pointer text-sm text-(--text-2)"
                  >
                    <input
                      type="checkbox"
                      checked={(values[field.id] || []).includes(opt)}
                      onChange={() => toggleCheckbox(field.id, opt)}
                      className="accent-(--accent) w-4 h-4"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            )}

            {errors[field.id] && (
              <p className="text-(--danger) text-[0.78rem] mt-1.5 mb-0">
                ⚠ {errors[field.id]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-3 justify-between items-center flex-wrap">
        <button
          onClick={handleSubmit}
          className="btn-primary min-w-30"
          disabled={submitting}
        >
          {submitting ? "Submitting…" : "Submit →"}
        </button>
      </div>

      <FormFooter />
    </div>
  );
}
