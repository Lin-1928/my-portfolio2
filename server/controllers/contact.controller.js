import Contact from "../models/Contact.js";

// Helper function: check if user is Admin
const checkAdmin = (req) => {
  return req.body.role === "admin";
};

// 1. Create (public - anyone can send a message)
const create = async (req, res) => {
  // No permission check needed, normal users can send messages
  const contact = new Contact(req.body);
  try {
    await contact.save();
    return res.status(200).json({ message: "Message sent successfully!" });
  } catch (err) {
    return res.status(400).json({ error: err.message || "Failed to send message" });
  }
};

// 2. List (for simplicity, no strict check, front-end only shows to Admin)
const list = async (req, res) => {
  try {
    let contacts = await Contact.find().sort('-createdAt'); // descending by createdAt
    res.json(contacts);
  } catch (err) {
    return res.status(400).json({ error: "Failed to fetch contact list" });
  }
};

// 3. Remove (Admin only)
const remove = async (req, res) => {
  if (!checkAdmin(req)) {
    return res.status(403).json({ error: "Permission denied: Only Admin can delete messages" });
  }

  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    return res.status(400).json({ error: "Failed to delete message" });
  }
};

// 4. RemoveAll (Admin only)
const removeAll = async (req, res) => {
  if (!checkAdmin(req)) {
    return res.status(403).json({ error: "Permission denied: Only Admin can delete all messages" });
  }
  try {
    await Contact.deleteMany();
    res.json({ message: "All messages deleted successfully" });
  } catch (err) {
    return res.status(400).json({ error: "Failed to delete all messages" });
  }
};

// Export only the necessary functions
export default { create, list, remove, removeAll };



/*import Contact from "../models/Contact.js";
import extend from "lodash/extend.js";
import errorHandler from "./error.controller.js";

const create = async (req, res) => {
  const contact = new Contact(req.body);
  try {
    await contact.save();
    return res.status(200).json(contact);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    let contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const contactByID = async (req, res, next, id) => {
  try {
    let contact = await Contact.findById(id);
    if (!contact)
      return res.status(400).json({
        error: "Contact not found",
      });
    req.contact = contact;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve contact",
    });
  }
};

const read = (req, res) => {
  return res.json(req.contact);
};

const update = async (req, res) => {
  try {
    let contact = req.contact;
    contact = extend(contact, req.body);
    await contact.save();
    res.json(contact);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let contact = req.contact;
    let deletedContact = await contact.deleteOne();
    res.json(deletedContact);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const removeAll = async (req, res) => {
  try {
    await Contact.deleteMany();
    res.json({ message: "All contacts deleted successfully" });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default { create, contactByID, read, list, remove, update, removeAll };*/