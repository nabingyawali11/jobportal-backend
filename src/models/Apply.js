import mongoose from "mongoose";

const applySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },

    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Jobs",
        required:true,
    },

status: {
  type: String,
  enum: ["Pending","Accepted","Rejected","Interview"], // optional validation
  default: "Pending"
},
    appliedAt: {
        type:Date,
        default:Date.now(),
    },
});

export default mongoose.model("Apply",applySchema);