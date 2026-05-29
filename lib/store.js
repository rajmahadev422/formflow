import { create } from "zustand";

const generateId = () => Math.random().toString(36).slice(2, 10);

export const useFormBuilderStore = create((set) => ({
  title: "",
  description: "",
  fields: [],

  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  addField: (type) =>
    set((state) => ({
      fields: [
        ...state.fields,
        {
          id: generateId(),
          type,
          label: `Question ${state.fields.length + 1}`,
          placeholder: "",
          required: false,
          options: ["select", "radio", "checkbox"].includes(type)
            ? ["Option 1", "Option 2"]
            : undefined,
        },
      ],
    })),

  updateField: (id, updates) =>
    set((state) => ({
      fields: state.fields.map((f) => (f.id === id ? { ...f, ...updates } : f)),
    })),

  removeField: (id) =>
    set((state) => ({ fields: state.fields.filter((f) => f.id !== id) })),

  moveField: (fromIndex, toIndex) =>
    set((state) => {
      const fields = [...state.fields];
      const [moved] = fields.splice(fromIndex, 1);
      fields.splice(toIndex, 0, moved);
      return { fields };
    }),
    
  reset: () => set({ title: "", description: "", fields: [] }),
}));
