const express = require("express");
const {
  insertTask,
  fetchSingleTask,
  fetchAllTask,
  updatedTask,
  deleteTask,
} = require("../Controllers/TaskController.js");
const router = express.Router();
router.post("/", insertTask);
router.get("/allrecord", fetchAllTask);
router.get("/singletask", fetchSingleTask);
router.patch("/updatedtask", updatedTask);
router.delete("/deleteTask", deleteTask);
module.exports = router;
