import express from "express";
import { login, register ,updateProfile} from "../controllers/authController.js";
import auth from "../middlewares/auth.js";
import multerFileUpload from "../middlewares/multerFileUpload.js"

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/profile", [auth, multerFileUpload], updateProfile);



export default router;
