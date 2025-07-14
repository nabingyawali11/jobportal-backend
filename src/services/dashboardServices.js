import mongoose from "mongoose";
import Jobs from "../models/Jobs.js";
import Apply from "../models/Apply.js";


const updateStatus = async (newStatus, applicantId) => {
 const applicantDetails = await Apply.findByIdAndUpdate(applicantId);
 
};

const getAllAddedJobs = async (createdBy) => {
  return await Jobs.aggregate([
    {
      $match: { createdBy: new mongoose.Types.ObjectId(createdBy) },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        company: 1,
        logo: 1,
        experience: 1,
        salary: 1,
        description: 1,
        location: 1,
        type: 1,
        deadline: 1,
        requirements: 1,
        status: 1,
        postedDate: 1,
        createdBy:1,
      },
    },
  ]);
};

const getAllAplicants = async () => {
  return await Apply.find();
};

const getAddedJobsApplicants = async (createdBy) => {

  //AddedJobs Detials extract of creactedf users
  const addedJobs = await getAllAddedJobs(createdBy);
  const addedJobIds = addedJobs.map(item => item._id);   // JOb Id of addedJobs

  // console.log("Added:", addedJobIds);

return  await Apply.aggregate([
  {
    $match:{jobId:{$in:addedJobIds}}
  },
  {
    $group:{
      _id:"$jobId",
      applicants: {  $addToSet: "$userId", }
    }
  },
  {
    $project:{
      jobId:"$_id",
      applicants:1,
      _id:0,
    }
  },  
]);
};

export default {
  updateStatus,
  getAllAddedJobs,
  getAllAplicants,
  getAddedJobsApplicants,
};
