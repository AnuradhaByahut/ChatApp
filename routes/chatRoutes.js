 /*const express = require("express");
const {
   accessChat,
   fetchChats,
   createGroupChat,
   removeFromGroup,
   addToGroup,
   renameGroup,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
 router.post("/", protect, accessChat); 
 router.get("/", protect, fetchChats); 
 router.route("/group").post(protect, createGroupChat);
 router.route("/rename").put(protect, renameGroup);
 router.route("/groupremove").put(protect, removeFromGroup);
 router.route("/groupadd").put(protect, addToGroup);

module.exports = router;   */


const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, accessChat);
router.get("/", protect, fetchChats);
router.post("/group", protect, createGroupChat);
router.put("/rename", protect, renameGroup);
router.put("/groupremove", protect, removeFromGroup);
router.put("/groupadd", protect, addToGroup);

module.exports = router;
