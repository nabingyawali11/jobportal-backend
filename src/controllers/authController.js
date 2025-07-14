import { createAuthToken } from "../helpers/authHelper.js";
import authServices from "../services/authServices.js";

const register = async (req, res) => {
  const data = req.body;
  if (!data.name || !data.email || !data.password)
    return res.status(422).send("Required Data missing");
  if (data.password.length < 6)
    return res.status(400).send("Password length must be greater than 6");
  if (data.password !== data.confirmPassword)
    return res.status(400).send("Confirm Password doesn't match.");

  try {
    const user = await authServices.register(data);
// console.log(user);
    const token = createAuthToken(user);
    // console.log(token);
    res.cookie("authToken", token, {httpOnly:true});
//httpOnly:true=> means token will be save only in 
//                Browser so we can used forward spread syntax with
//                key to save with res data in local storage

  //  console.log("Cookie",res.authorization);
    res.status(201).json({...user,token});
  } catch (error) {
    res.status(500).send(error.message);
  }
};

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

export { register, login };
