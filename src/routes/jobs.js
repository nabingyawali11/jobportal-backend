import express from "express";

import { addJobs, getAllJobs, getJobById, updateJob} from "../controllers/jobController.js";
import auth from "../middlewares/auth.js";
import rolesBasedAuth from "../middlewares/roleBasedAuth.js";



const router = express.Router();

router.get("/", getAllJobs);
router.post("/", [auth,rolesBasedAuth("Recruter")],addJobs); // need user login
router.get("/:id", getJobById);
router.put("/:id", [auth,rolesBasedAuth("Recruter")],updateJob); // need user login




export default router;
