import { useFormBuilderStore } from "@/lib/store";

export default function FieldCard({ field, index, total }) {
  const { updateField, removeField, moveField } = useFormBuilderStore();
  const hasOptions = ["select", "radio", "checkbox"].includes(field.type);

  const updateOption = (i, val) => {
    const opts = [...(field.options || [])];
    opts[i] = val;
    updateField(field.id, { options: opts });
  };
  const addOption = () =>
    updateField(field.id, {
      options: [
        ...(field.options || []),
        `Option ${(field.options?.length || 0) + 1}`,
      ],
    });
  const removeOption = (i) =>
    updateField(field.id, {
      options: field.options?.filter((_, idx) => idx !== i),
    });

  return (
    <div
      className="bg-(--surface) border border-(--border) rounded-xl p-5 fade-up"
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      <div className="flex gap-3 items-start">
        {/* Re-ordering Stack triggers */}
        <div className="flex flex-col gap-1 pt-1">
          <button
            onClick={() => index > 0 && moveField(index, index - 1)}
            disabled={index === 0}
            className={`bg-none border-none text-(--text-3) text-[0.85rem] px-1 py-0.5 ${
              index === 0
                ? "cursor-default opacity-30"
                : "cursor-pointer opacity-100"
            }`}
          >
            ▲
          </button>
          <button
            onClick={() => index < total - 1 && moveField(index, index + 1)}
            disabled={index === total - 1}
            className={`bg-none border-none text-(--text-3) text-[0.85rem] px-1 py-0.5 ${
              index === total - 1
                ? "cursor-default opacity-30"
                : "cursor-pointer opacity-100"
            }`}
          >
            ▼
          </button>
        </div>

        {/* Configurations Layout Panel */}
        <div className="flex-1 min-w-0">
          <div className="flex gap-3 mb-3 flex-wrap">
            <div className="flex-[1_1_200px]">
              <label className="label">Question</label>
              <input
                className="input"
                value={field.label}
                onChange={(e) =>
                  updateField(field.id, { label: e.target.value })
                }
                placeholder="Question text"
              />
            </div>
            <div className="flex-[0_0_140px]">
              <label className="label">Type</label>
              <input
                type="text"
                className="input capitalize"
                value={field.type}
                readOnly
              />
            </div>
          </div>

          {!hasOptions && (
            <div className="mb-3">
              <label className="label">Placeholder</label>
              <input
                className="input"
                value={field.placeholder || ""}
                onChange={(e) =>
                  updateField(field.id, { placeholder: e.target.value })
                }
                placeholder="Optional placeholder text"
              />
            </div>
          )}

          {hasOptions && (
            <div className="mb-3">
              <label className="label">Options</label>
              <div className="flex flex-col gap-1.5">
                {(field.options || []).map((opt, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      className="input flex-1"
                      value={opt}
                      onChange={(e) => updateOption(i, e.target.value)}
                    />
                    <button
                      onClick={() => removeOption(i)}
                      className="btn-danger px-2.5 py-1.5 text-[0.85rem]"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={addOption}
                  className="btn-ghost self-start text-xs px-3 py-1.2"
                >
                  + Add option
                </button>
              </div>
            </div>
          )}

          <label className="flex items-center gap-2 cursor-pointer text-sm text-(--text-2)">
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) =>
                updateField(field.id, { required: e.target.checked })
              }
              className="accent-(--accent) w-3.75 h-3.75"
            />
            Required field
          </label>
        </div>

        <button
          onClick={() => removeField(field.id)}
          className="btn-danger shrink-0"
          aria-label="Remove field"
        >
          🗑
        </button>
      </div>
    </div>
  );
}
