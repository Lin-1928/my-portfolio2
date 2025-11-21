import express from "express";
import contactCtrl from "../controllers/contact.controller.js";

const router = express.Router();

// 1. 集合路由 /api/contacts
router.route("/api/contacts")
  .get(contactCtrl.list)       // 对应 controller.list
  .post(contactCtrl.create)    // 对应 controller.create
  .delete(contactCtrl.removeAll); // 对应 controller.removeAll


router.route("/api/contacts/:id")
  .delete(contactCtrl.remove); // 对应 controller.remove



export default router;

/*import express from "express";
import contactCtrl from "../controllers/contact.controller.js";

const router = express.Router();

router.route("/api/contacts")
  .get(contactCtrl.list)
  .post(contactCtrl.create)
  .delete(contactCtrl.removeAll);

router.route("/api/contacts/:contactId")
  .get(contactCtrl.read)
  .put(contactCtrl.update)
  .delete(contactCtrl.remove);

router.param("contactId", contactCtrl.contactByID);

export default router;*/