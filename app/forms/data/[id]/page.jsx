"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export default function DataPage() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const printRef = useRef(null);

  useEffect(() => {
    Promise.all([
      fetch(`/api/forms/${id}`).then((r) => r.json()),
      fetch(`/api/forms/${id}/submissions`).then((r) => r.json()),
    ]).then(([f, s]) => {
      setForm(f);
      setSubmissions(s);
      setLoading(false);
    });
  }, [id]);

  // Excel Export Handler
  const handleExportExcel = async () => {
    if (!form || submissions.length === 0) return;

    // Dynamically import SheetJS to optimize page speed bundle
    const { utils, writeFile } = await import("xlsx");

    // Map responses into a flat array of objects (Rows x Columns)
    const formattedData = submissions.map((sub, index) => {
      const row = {
        "Response ID": `#${index + 1}`,
        "Submission Date": new Date(sub.submittedAt).toLocaleString(),
      };

      // Loop through form fields to map answers under their respective question labels
      form.fields.forEach((field) => {
        const val = sub.data[field.id];
        row[field.label] = Array.isArray(val) ? val.join(", ") : val || "—";
      });

      return row;
    });

    // Generate worksheet and workbook
    const worksheet = utils.json_to_sheet(formattedData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Submissions");

    // Download the actual file named after the form title
    const safeFileName = `${form.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_data.xlsx`;
    writeFile(workbook, safeFileName);
  };

  if (loading)
    return <div className="text-center py-24 text-(--text-3)">Loading…</div>;

  if (!form)
    return (
      <div className="text-center py-24">
        <p className="text-(--danger)">Form not found.</p>
        <Link href="/forms" className="btn-ghost">
          ← Back
        </Link>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 pb-16">
      {/* Interactive Desktop Header */}
      <div className="no-print flex justify-between items-start mb-8 flex-wrap gap-4">
        <div>
          <Link
            href="/forms"
            className="text-(--text-3) text-xs no-underline inline-flex items-center gap-1 mb-2"
          >
            ← My Forms
          </Link>
          <h1 className="font-['DM_Serif_Display',serif] text-3xl mb-1">
            {form.title}
          </h1>
          <p className="text-(--text-2) text-sm m-0">
            {submissions.length} response{submissions.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <CopyButton formId={id} />
          {submissions.length > 0 && (
            <button
              onClick={handleExportExcel}
              className="btn-ghost border border-(--border)"
            >
              📊 Download Excel
            </button>
          )}
        </div>
      </div>

      {/* Print-only Header */}
      <div className="hidden print-header">
        <h1 className="font-['DM_Serif_Display',serif]">{form.title}</h1>
        {form.description && <p>{form.description}</p>}
        <p className="text-[#666]">
          {submissions.length} response{submissions.length !== 1 ? "s" : ""} ·
          Exported {new Date().toLocaleString()}
        </p>
        <hr />
      </div>

      {/* Submissions Container */}
      <div ref={printRef}>
        {submissions.length === 0 ? (
          <div className="bg-(--surface) border border-(--border) rounded-xl py-16 px-8 text-center no-print">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-(--text-2) mb-6">No responses yet.</p>
            <Link href={`/view/${id}`} className="btn-primary">
              Share form to collect responses
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {submissions.map((sub, i) => (
              <div
                key={sub._id}
                className="bg-(--surface) border border-(--border) p-6 fade-up"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                {/* Entry Metadata Row */}
                <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                  <span className="bg-(--accent-light) text-(--accent) text-[0.78rem] font-bold px-3 py-1 rounded-md tracking-wide">
                    Response #{i + 1}
                  </span>
                  <span className="text-(--text-3) text-[0.78rem]">
                    {new Date(sub.submittedAt).toLocaleString()}
                  </span>
                </div>

                {/* Data Fields Grid */}
                <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3">
                  {form.fields.map((field) => {
                    const val = sub.data[field.id];
                    const display = Array.isArray(val)
                      ? val.join(", ")
                      : val || "—";
                    return (
                      <div
                        key={field.id}
                        className="bg-(--bg-2) border border-(--border) rounded p-3"
                      >
                        <div className="text-[0.72rem] font-semibold text-(--text-3) uppercase tracking-wider mb-1">
                          {field.label}
                        </div>
                        <div
                          className={`text-sm wrap-break ${display === "—" ? "text-(--text-3)" : "text-(--text)"}`}
                        >
                          {display}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Native Media Layout Stylesheet overrides */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-header { display: block !important; margin-bottom: 1.5rem; }
          body { background: white !important; color: black !important; font-size: 12px; }
          .card { border: 1px solid #ddd !important; page-break-inside: avoid; margin-bottom: 12px; }
          .fade-up { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
}
