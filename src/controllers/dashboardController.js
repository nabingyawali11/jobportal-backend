import dashboardServices from "../services/dashboardServices.js";

const updateStatus = async (req, res) => {
  const newStatus = req.body.status;
  const applicantId = req.params;

  const updatedData = await dashboardServices.updateStatus(newStatus, applicantId);
  res.status(200).json(updatedData);

  try {
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getAllAddedJobs = async (req, res) => {
  const userId = req.user.id;
  // console.log(userId);
  try {
    const jobs = await dashboardServices.getAllAddedJobs(userId);
    if (!jobs) return res.status(401).send("No Jobs Created...");

    res.status(201).json(jobs);
  } catch (error) {
    res.status(501).send(error.message);
  }
};

const getAllAplicants = async (req, res) => {
  try {
    const applicants = await dashboardServices.getAllAplicants();
    res.status(201).json(applicants);
  } catch (error) {
    res.status(501).send(error.message);
  }
};

const getAddedJobsApplicants = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  try {
    const data = await dashboardServices.getAddedJobsApplicants(userId);
    res.status(201).json(data);
  } catch (error) {
    res.status(501).send(error.message);
  }
};

export {
  updateStatus,
  getAllAddedJobs,
  getAllAplicants,
  getAddedJobsApplicants,
};
