import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    school: String,
    degree: String,
    field: String,
    start: Date,
    end: Date,
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    avatarUrl: String,

    resumeUrl: String,

    // cvUrl: String,

    coverLetterUrl: String,

    education: [educationSchema],

    location: {
      city: String,
      state: String,
      country: String,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("SeekerUser", profileSchema);
