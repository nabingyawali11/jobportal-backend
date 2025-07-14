import bcrypt from "bcryptjs";
import User from "../models/User.js";

const register = async (data) => {
  const isUser = await User.findOne({ email: data.email });
  if (isUser) throw new Error("Email already registered.....");

  const encryptPassword = bcrypt.hashSync(data.password);

  const newUser = await User.create({
    name: data.name,
    email: data.email,
    password: encryptPassword,
    roles: data.roles,
    createdAt: data.createdAt,
  });
  return {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    password: encryptPassword,
    roles: newUser.roles,
    createdAt: newUser.createdAt,
  };
};

const login = async (data) => {
  const isUser = await User.findOne({ email: data.email });
  if (!isUser) throw new Error("Email or Password doesn't match.....");

  const matchPassword = bcrypt.compareSync(data.password, isUser.password);
  if (!matchPassword) throw new Error("email or Password Don't match!!!");

  return {
    id: isUser._id,
    name: isUser.name,
    email: isUser.email,
    password: isUser.password,
    roles: isUser.roles,
  };
};


export default {
    register,
    login,
}