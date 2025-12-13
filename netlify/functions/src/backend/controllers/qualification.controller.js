import Qualification from "../models/qualification.model.js";

export const getAll = async (req, res) => {
  const list = await Qualification.find().sort({ createdAt: -1 });
  res.json(list);
};

export const getById = async (req, res) => {
  const item = await Qualification.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Qualification not found" });
  res.json(item);
};

export const createOne = async (req, res) => {
  try {
    const created = await Qualification.create(req.body);
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const updateById = async (req, res) => {
  const updated = await Qualification.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Qualification not found" });
  res.json(updated);
};

export const removeById = async (req, res) => {
  const deleted = await Qualification.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Qualification not found" });
  res.json({ message: "Deleted", id: deleted._id });
};

export const removeAll = async (req, res) => {
  const result = await Qualification.deleteMany({});
  res.json({ message: "All qualifications removed", deletedCount: result.deletedCount });
};
