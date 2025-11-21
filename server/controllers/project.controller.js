

//2
import Project from "../models/Project.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";

// 创建 project（只允许 admin）
const create = async (req, res) => {
  if (req.body.role !== "admin") {
    return res.status(403).json({ error: "Only admin can create projects" });
  }

  const project = new Project(req.body);
  try {
    await project.save();
    return res.status(200).json(project);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// 获取所有 project（所有用户都可以）
const list = async (req, res) => {
  try {
    let projects = await Project.find();
    res.json(projects);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// 根据 ID 获取单个 project（所有用户都可以）
const projectByID = async (req, res, next, id) => {
  try {
    let project = await Project.findById(id);
    if (!project) {
      return res.status(400).json({ error: "Project not found" });
    }
    req.project = project;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve project" });
  }
};

// 读取单个 project（所有用户都可以）
const read = (req, res) => {
  return res.json(req.project);
};

// 更新 project（只允许 admin）
const update = async (req, res) => {
  if (req.body.role !== "admin") {
    return res.status(403).json({ error: "Only admin can update projects" });
  }

  try {
    let project = req.project;
    project = extend(project, req.body);
    await project.save();
    res.json(project);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// 删除 project（只允许 admin）
const remove = async (req, res) => {
  if (req.body.role !== "admin") {
    return res.status(403).json({ error: "Only admin can delete projects" });
  }

  try {
    let project = req.project;
    let deletedProject = await project.deleteOne();
    res.json(deletedProject);
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

// 删除所有 project（只允许 admin）
const removeAll = async (req, res) => {
  if (req.body.role !== "admin") {
    return res.status(403).json({ error: "Only admin can delete all projects" });
  }

  try {
    await Project.deleteMany();
    res.json({ message: "All projects deleted successfully" });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

export default { create, projectByID, read, list, remove, update, removeAll };









/*import Project from "../models/Project.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";

const create = async (req, res) => {
  const project = new Project(req.body);
  try {
    await project.save();
    return res.status(200).json(project);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    let projects = await Project.find();
    res.json(projects);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const projectByID = async (req, res, next, id) => {
  try {
    let project = await Project.findById(id);
    if (!project)
      return res.status(400).json({
        error: "Project not found",
      });
    req.project = project;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve project",
    });
  }
};

const read = (req, res) => {
  return res.json(req.project);
};

const update = async (req, res) => {
  try {
    let project = req.project;
    project = extend(project, req.body);
    await project.save();
    res.json(project);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let project = req.project;
    let deletedProject = await project.deleteOne();
    res.json(deletedProject);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const removeAll = async (req, res) => {
  try {
    await Project.deleteMany();
    res.json({ message: "All projects deleted successfully" });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, projectByID, read, list, remove, update, removeAll };*/