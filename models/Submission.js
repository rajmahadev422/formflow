import mongoose, { Schema } from "mongoose";

const SubmissionSchema = new Schema({
  formId: { type: Schema.Types.ObjectId, ref: "Form", required: true },
  data: { type: Schema.Types.Mixed, required: true },
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Submission ||
  mongoose.model("Submission", SubmissionSchema);
