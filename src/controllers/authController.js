import { createAuthToken } from "../helpers/authHelper.js";
import authServices from "../services/authServices.js";

// Register Controller
const register = async (req, res) => {
  const data = req.body;
  if (!data.name || !data.email || !data.password)
    return res.status(422).send("Required Data missing");
if (data.password.length < 6)
    return res.status(400).send("Password length must be greater than 6");
if (data.password !== data.confirmPassword)
    return res.status(400).send("Confirm Password doesn't match.");

console.log("User",data);
  try {
    const user = await authServices.register(data);
console.log("User",user);
    const token = createAuthToken(user);

    res.cookie("authToken", token, { httpOnly: true });
    //httpOnly:true=> means token will be save only in
    //                Browser so we can used forward spread syntax with
    //                key to save with res data in local storage

    res.status(201).json({ ...user, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Login Controller
const login = async (req, res) => {
  const data = req.body;
  if (data.password.length < 6)
    return res.status(400).send("Password length must be greater than 6.");
  if (!data.email || !data.password)
    return res.status(422).send("Email or Password Doesn't match..");

  try {
    const user = await authServices.login(data);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateProfile = async (req, res) => {
  const profileDatas = req.body;
  const profileFiles = req.files;
  const userData = req.user;
  if (!userData.id) return res.status(400).json({ error: "User ID is required" });
  console.log("Body:=>",profileDatas);
  console.log("Files:=>",profileFiles);
  try {
        const updates = {};

    // Handle file URLs
    if (profileFiles?.avatar?.[0]) updates.avatarUrl = profileFiles.avatar[0].filename;
    if (profileFiles?.resume?.[0]) updates.resumeUrl = profileFiles.resume[0].filename;
    // if (profileFiles?.cv?.[0]) updates.cvUrl = profileFiles.cv[0].filename;
    if (profileFiles?.coverLetter?.[0]) updates.coverLetterUrl = profileFiles.coverLetter[0].filename;

    // Handle education (from JSON string)
    if (profileDatas.education) {
      try {
        updates.education = JSON.parse(profileDatas.education);
      } catch (err) {
        return res.status(400).json({ error: "Invalid education format" });
      }
    }

    // Handle location fields
    if (profileDatas.city || profileDatas.state || profileDatas.country) {
      updates.location = {
        city: profileDatas.city,
        state: profileDatas.state,
        country: profileDatas.country,
      };
    }

    updates.updatedAt = new Date();
    const data = await authServices.profile(userData.id,updates);

    
// Convert mongoose document to plain JS object:
    const profileObj = data.toObject();

    // Extract user data and spread it at top-level
    const { user, ...profileWithoutUser } = profileObj;

    // Compose final response: user data at top + rest
    const formateData = {
      ...user,
      profile: profileWithoutUser,
    };

    return res.status(201).json(formateData);
  } catch (error) {
    res.status(501).send(error.message);
  }
};
export { register, login, updateProfile };
