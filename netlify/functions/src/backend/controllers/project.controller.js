import Project from "../models/project.model.js";

export const getAll = async (req, res) => {
  const list = await Project.find().sort({ createdAt: -1 });
  res.json(list);
};

export const getById = async (req, res) => {
  const item = await Project.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Project not found" });
  res.json(item);
};

export const createOne = async (req, res) => {
  try {
    const created = await Project.create(req.body);
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const updateById = async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Project not found" });
  res.json(updated);
};

export const removeById = async (req, res) => {
  const deleted = await Project.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: "Project not found" });
  res.json({ message: "Deleted", id: deleted._id });
};

export const removeAll = async (req, res) => {
  const result = await Project.deleteMany({});
  res.json({ message: "All projects removed", deletedCount: result.deletedCount });
};
