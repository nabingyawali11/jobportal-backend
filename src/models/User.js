import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  address: String,

  email: {
    type: String,
    require: true,
    lowercase: true,
  },

  password: {
    type: String,
    require: true,
  },
roles:{
    type:[String],
    default:["Recruter"],
},
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("User", userSchema);
