import mongoose, { Schema } from "mongoose";

const FormFieldSchema = new Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  label: { type: String, required: true },
  placeholder: { type: String },
  required: { type: Boolean, default: false },
  options: [{ type: String }],
});

const FormSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    fields: [FormFieldSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Form || mongoose.model("Form", FormSchema);
