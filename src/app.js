import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import logger from "./middlewares/logger.js";
import connectDB from "./database.js";

import jobs from "./routes/jobs.js";
import auth from "./routes/auth.js";
import applyJobs from "./routes/applyJobs.js";
import dashboard from "./routes/dashboard.js";

const app = express();
dotenv.config();
connectDB();

//which is middleware(replce of body-parser) => used to formate data came from user to server to understand by user like json data
app.use(express.urlencoded({ extended: true })); // to parse form data
app.use(express.json()); // to parse JSON bodies

app.use(logger);

app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3001", // allow this origin only
  credentials: true                // if using cookies or authorization headers
}));

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.json({
    appname: "project_1",
    version: "1.0.0",
    port: PORT,
  });
});

app.use("/api/jobs", jobs);

app.use("/api/auth", auth);

app.use("/api/apply", applyJobs);

app.use("/api/dashboard",dashboard);

app.listen(3000, () => {
  console.log(`Server is listen a port ${PORT}....`);
});
