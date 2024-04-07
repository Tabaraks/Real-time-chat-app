const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  createChat,
  getAllChats,
  createGroupChat,
  renameGroupChat,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatController");

const router = express.Router();

router.route("/").post(protect, createChat);

router.route("/").get(protect, getAllChats);

router.route("/group").post(protect, createGroupChat);

router.route("/rename").put(protect, renameGroupChat);

router.route("/groupadd").put(protect, addToGroup);

router.route("/groupremove").put(protect, removeFromGroup);

module.exports = router;
