import mongoose, { MongooseError } from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { 
    type: String,
     required: true,
    },
  company: { 
    type: String, 
    required: true,
 },
  logo: String,

  experience: String,

  salary: { 
    type: String,
     required: true,
     },

  description: String,

  location: { 
    type: String,
     required: true,
     },

  type: String,

  deadline: { 
    type: Date,
     required:true, 
},
  requirements: { 
    type: [String],
   
},

status: {
  type: String,
  enum: ["Open", "Closed"], // optional validation
  default: "Open"
},

  postedDate: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
   required: true,
  },
});

export default mongoose.model("Jobs", jobSchema);
