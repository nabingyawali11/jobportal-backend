import express from "express";
import { updateStatus , getAllAddedJobs,getAllAplicants,getAddedJobsApplicants} from "../controllers/dashboardController.js";
import auth from "../middlewares/auth.js";
import rolesBasedAuth from "../middlewares/roleBasedAuth.js";

const router = express.Router();

router.post("/applicants/status/:id",[auth,rolesBasedAuth("Recruter")],updateStatus);
router.get("/added/jobs",[auth,rolesBasedAuth("Recruter")],getAllAddedJobs);
router.get("/apllicants",[auth,rolesBasedAuth("Recruter")],getAllAplicants);
router.get("/added/jobs/applicants",[auth,rolesBasedAuth("Recruter")],getAddedJobsApplicants);



export default router;