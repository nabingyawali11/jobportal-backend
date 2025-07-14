import mongoose from "mongoose";
import Jobs from "../models/Jobs.js";

const createJobs = async (data) => {
  //  console.log(data)
  return await Jobs.create({ ...data });
};

const getAllJobs = async () => {
  return await Jobs.find();
};

const getJobById = async (id) => {
  return await Jobs.findById(id);
};

const updateJob = async (id,data) => {
  return await Jobs.findByIdAndUpdate(id,data);
};

const deleteJob = async (id) => {
  return await Jobs.findByIdAndDelete(id);
};



export default {
  createJobs,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};
