import Education from "../models/Education.js";
import extend from "lodash/extend.js"; // 如果你没装 lodash，可以删掉这行用 Object.assign

// 辅助函数
const checkAdmin = (req) => {
  return req.body.role === "admin";
};

// 1. Create (仅限 Admin)
const create = async (req, res) => {
  if (!checkAdmin(req)) {
    return res.status(403).json({ error: "权限不足：只有 Admin 可以创建" });
  }

  const education = new Education(req.body);
  try {
    await education.save();
    return res.status(200).json(education);
  } catch (err) {
    return res.status(400).json({ error: err.message || "创建失败" });
  }
};

// 2. List (所有人)
const list = async (req, res) => {
  try {
    let educations = await Education.find();
    res.json(educations);
  } catch (err) {
    return res.status(400).json({ error: "获取列表失败" });
  }
};

// 3. Middleware (必须保留)
const educationByID = async (req, res, next, id) => {
  try {
    let education = await Education.findById(id);
    if (!education)
      return res.status(400).json({ error: "Education not found" });
    req.education = education;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve education" });
  }
};

// 4. Read
const read = (req, res) => {
  return res.json(req.education);
};

// 5. Update (仅限 Admin)
const update = async (req, res) => {
  if (!checkAdmin(req)) {
    return res.status(403).json({ error: "权限不足" });
  }
  try {
    let education = req.education;
    // 如果没装 lodash，改用: education = Object.assign(education, req.body);
    education = extend(education, req.body); 
    await education.save();
    res.json(education);
  } catch (err) {
    return res.status(400).json({ error: "更新失败" });
  }
};

// 6. Remove (仅限 Admin)
const remove = async (req, res) => {
  if (!checkAdmin(req)) {
    return res.status(403).json({ error: "权限不足" });
  }
  try {
    let education = req.education;
    let deletedEducation = await education.deleteOne();
    res.json(deletedEducation);
  } catch (err) {
    return res.status(400).json({ error: "删除失败" });
  }
};

// 7. RemoveAll (仅限 Admin)
const removeAll = async (req, res) => {
  if (!checkAdmin(req)) {
    return res.status(403).json({ error: "权限不足" });
  }
  try {
    await Education.deleteMany();
    res.json({ message: "All educations deleted successfully" });
  } catch (err) {
    return res.status(400).json({ error: "删除失败" });
  }
};

export default { create, educationByID, read, list, remove, update, removeAll };

/*import Education from "../models/Education.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";

const create = async (req, res) => {
  const education = new Education(req.body);
  try {
    await education.save();
    return res.status(200).json(education);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    let educations = await Education.find();
    res.json(educations);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const educationByID = async (req, res, next, id) => {
  try {
    let education = await Education.findById(id);
    if (!education)
      return res.status(400).json({
        error: "Education not found",
      });
    req.education = education;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve education",
    });
  }
};

const read = (req, res) => {
  return res.json(req.education);
};

const update = async (req, res) => {
  try {
    let education = req.education;
    education = extend(education, req.body);
    await education.save();
    res.json(education);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let education = req.education;
    let deletedEducation = await education.deleteOne();
    res.json(deletedEducation);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const removeAll = async (req, res) => {
  try {
    await Education.deleteMany();
    res.json({ message: "All educations deleted successfully" });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, educationByID, read, list, remove, update, removeAll };*/