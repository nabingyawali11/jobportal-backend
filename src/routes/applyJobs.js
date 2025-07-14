import express from "express";
import auth from "../middlewares/auth.js";
import { applyJobs,getOnlyApplyJobs,getAllApplyJobs,getApplyJobsById } from "../controllers/applyController.js";
import rolesBasedAuth from "../middlewares/roleBasedAuth.js";

const router = express.Router();

router.post("/",[auth,rolesBasedAuth("seeker")],applyJobs);
router.get("/",getAllApplyJobs);
router.get("/:id",getApplyJobsById);

 router.get("/user",[auth,rolesBasedAuth("seeker")],getOnlyApplyJobs);
//  router.get("/:id",auth,getApplyJobsById);


//  router.post("/dashboard",[auth,rolesBasedAuth("Recruter")],updateJobStatus);
export default router;