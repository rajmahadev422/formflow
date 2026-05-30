"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export default function FormsPage() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/forms");

      if (!res.ok) {
        console.log(res.statusText);
        return;
      }
      const data = await res.json();
      setForms(data);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    load();
  }, []);

  const deleteForm = async (id) => {
    if (!confirm("Delete this form?")) return;
    await fetch(`/api/forms/${id}`, { method: "DELETE" });
    setForms((f) => f.filter((x) => x._id !== id));
  };



  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-['DM_Serif_Display',serif] text-3xl m-0">
            My Forms
          </h1>
          <p className="text-(--text-2) mt-1 text-sm">
            {forms.length} form{forms.length !== 1 ? "s" : ""} created
          </p>
        </div>
        <Link href="/forms/create" className="btn-primary">
          + New Form
        </Link>
      </div>

      {/* Main Content States */}
      {loading ? (
        <div className="text-center py-16 text-(--text-3)">Loading…</div>
      ) : forms.length === 0 ? (
        <div className="bg-(--surface) border border-(--border) rounded-xl py-16 px-8 text-center">
          <div className="text-5xl mb-4">📋</div>
          <p className="text-(--text-2) mb-6">
            No forms yet. Create your first one!
          </p>
          <Link href="/forms/create" className="btn-primary">
            ✨ Create Form
          </Link>
        </div>
      ) : forms?.error ? (
        <div className="bg-(--surface) border border-(--border) rounded-xl py-16 px-8 text-center">
          <div className="text-5xl mb-4">📋</div>
          <p className="text-(--text-2) mb-6">{forms.error}</p>
        </div>
      ) : (
        /* Forms Stack List */
        <div className="flex flex-col gap-3">
          {forms.map((form, i) => (
            <div
              key={form._id}
              className="bg-(--surface) border border-(--border) rounded-xl px-6 py-5 flex items-center gap-4 fade-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >

              {/* Meta Content & Truncation */}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-[0.95rem] text-(--text) whitespace-nowrap overflow-hidden text-ellipsis">
                  {form.title}
                </div>
                <div className="text-[0.78rem] text-(--text-3) mt-0.5">
                  {form.fields.length} fields ·{" "}
                  {new Date(form.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Actions Button Group */}
              <div className="flex gap-2 shrink-0 flex-wrap justify-end">
                
                <CopyButton formId={form._id}/>
                <Link
                  href={`/forms/data/${form._id}`}
                  className="bg-(--success-light) text-(--success) rounded-[7px] px-3.5 py-1.5 text-xs font-medium no-underline"
                >
                  Data
                </Link>
                <button
                  onClick={() => deleteForm(form._id)}
                  className="btn-danger px-3 py-1.5 text-xs"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
