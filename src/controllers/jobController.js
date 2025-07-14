import jobServices from "../services/jobServices.js";

//Add Jobs
const addJobs = async (req, res) => {
  const data = req.body;

  const userId = req.user.id;

  if (!data.title) return res.status(422).send("Job title is required");
  if (!data.company) return res.status(422).send("Company name is required");
  if (!data.salary) return res.status(422).send("salary  is required");
  if (!data.deadline) return res.status(422).send("deadline  is required");
  if (!data.location) return res.status(422).send("location  is required");

  data.deadline = new Date(data.deadline);

  try {
    const createdJob = await jobServices.createJobs({
      createdBy: userId,
      ...data,
    });
    res.status(201).json(createdJob);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//Get Jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await jobServices.getAllJobs();
    res.json(jobs);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//Get Job by Id
const getJobById = async (req, res) => {
  const id = req.params.id;

  console.log("resquest", res);

  try {
    const job = await jobServices.getJobById(id);

    if (!job) return res.status(400).send("Product is not found");

    res.json(job);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//Update job
const updateJob = async (req, res) => {
  const userId = req.params.id;
  const data = res.body;

  try {
    const job = await jobServices.getJobById(id);
    if (!job) return res.status(400).send("Product is not found");

    const updatejob = await jobServices.updateJob(id, data);
    res.json(updateJob);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//Delete Job
// const deleteJob = async (req,res) => {
//   const id = req.body.id;
//   const
//   try {
//       const job = await jobServices.getJobById(id);
//     if (!job) return res.status(400).send("Product is not found");

//    const deletejob = await jobServices.deleteJob(id);

//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// }


export {
  addJobs,
  getAllJobs,
  getJobById,
  updateJob,
  //  deleteJob,
 
};
