import mongoose from "mongoose";
import Apply from "../models/Apply.js";
import Jobs from "../models/Jobs.js";

const applyJobs = async (data) => {
  // const isJob = await Apply.findOne({ jobId: data.jobId });
  // if (isJob) {
  //   console.log("Services",isJob);
  //     throw new Error("Job already Applied....");
  //   }

    return await Apply.create(data);
};








const getOnlyApplyJobs = async (userId) => {


  return await Apply.aggregate([
    {
      $lookup: {
        from: "jobs", // Collection to join
        localField: "jobId", // Field from "applied" collection
        foreignField: "_id", // Field from "jobs" collection
        as: "jobDetails", // Output array field
      },
    },
    {
      $unwind: "$jobDetails",
    },
   {
      $match: { userId: new mongoose.Types.ObjectId(userId) }
    
    },
  ]);
};






const getAllApplyJobs = async () => {
  return await Apply.find();
}

const getApplyJobsById = async (jobId) => {
  return await Apply.findOne({ jobId: jobId });
}


export default { applyJobs, getOnlyApplyJobs,getAllApplyJobs,getApplyJobsById};
