import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


const isStrongPassword = (pw) => {
  // At least 8 chars, one uppercase, one lowercase, one number
  return typeof pw === "string" && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pw);
};

const signToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || "devsecret", { expiresIn: "7d" });
};

// Auth
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!isStrongPassword(password)) {
      return res.status(400).json({ message: "Password must be 8+ chars with uppercase, lowercase, and a number" });
    }
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already registered" });
    const user = await User.create({ name, email, password });
    res.status(201).json({ id: user._id, name: user.name, email: user.email });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    const token = signToken(user);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const logout = async (req, res) => {
  // Stateless JWT: client should discard token
  res.json({ message: "Logged out (discard token on client)" });
};

export const profile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

// CRUD
export const getAll = async (req, res) => {
  const list = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(list);
};

export const getById = async (req, res) => {
  const item = await User.findById(req.params.id).select("-password");
  if (!item) return res.status(404).json({ message: "User not found" });
  res.json(item);
};

export const createOne = async (req, res) => {
  try {
    const created = await User.create(req.body);
    res.status(201).json({ id: created._id, email: created.email });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const updateById = async (req, res) => {
  // If password provided, Mongoose pre-save won't run on findByIdAndUpdate; so handle manually
  const { password, ...rest } = req.body;
  let doc = await User.findById(req.params.id);
  if (!doc) return res.status(404).json({ message: "User not found" });
  Object.assign(doc, rest);
  if (password) doc.password = password; // triggers pre('save')
  await doc.save();
  res.json({ id: doc._id, email: doc.email });
};

export const removeById = async (req, res) => {
  const deleted = await User.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "User not found" });
  res.json({ message: "Deleted", id: deleted._id });
};

export const removeAll = async (req, res) => {
  const result = await User.deleteMany({});
  res.json({ message: "All users removed", deletedCount: result.deletedCount });
};
