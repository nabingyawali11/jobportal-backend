import applyServices from "../services/applyServices.js";

const applyJobs = async (req, res) => {
  const applyData = req.body;
  const userData = req.user;
  console.log(req.user);
  try {
    const applied = await applyServices.applyJobs({
      userId: userData.id,
      ...applyData,
    });
    console.log("Applied", applied);

    res.status(201).json(applied);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getOnlyApplyJobs = async (req, res) => {
  const userId = req.user.id;
  console.log("USerID:", userId);
  try {
    const getAllApplyJobs = await applyServices.getOnlyApplyJobs(userId);

    res.status(201).json(getAllApplyJobs);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getAllApplyJobs = async (req, res) => {
  try {
    const jobs = await applyServices.getAllApplyJobs();
    res.status(201).json(jobs);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getApplyJobsById = async (req, res) => {
  const jobId = req.params.id;
  try {
    const data = await applyServices.getApplyJobsById(jobId);
    res.status(201).json(data);
  } catch (error) {
    res.status(501).send(error.message);
  }
};

export { applyJobs, getOnlyApplyJobs, getAllApplyJobs, getApplyJobsById };
