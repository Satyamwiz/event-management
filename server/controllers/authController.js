import bcrypt from 'bcryptjs';
import User from "../models/user.js";
import { generateToken } from "../lib/utils/generatewt.js";
export const signup = async (req, res) => {
  const { username, fullname, password, email } = req.body;
  if (!username || !password || !email) return res.status(400).json({ message: "All fields are required" });

  const userExists = await User.findOne({ username });
  if (userExists) return res.status(400).json({ message: "Username already exists" });

  const emailExists = await User.findOne({ email });
  if (emailExists) return res.status(400).json({ message: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    fullname,
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    generateToken(newUser._id, res);
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullname,
      username: newUser.username,
      email: newUser.email,
      followers: newUser.followers,
      following: newUser.following,
      profileImg: newUser.profileImg,
      coverImg: newUser.coverImg,
    });
  } catch (error) {
    res.status(400).json({ error: "Invalid user data" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password || "");
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    generateToken(user._id, res);
    res.status(201).json({
      _id: user._id,
      fullName: user.fullname,
      username: user.username,
      email: user.email,
      followers: user.followers,
      following: user.following,
      profileImg: user.profileImg,
      coverImg: user.coverImg,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error logging in" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(201).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error logging out" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getMe controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
