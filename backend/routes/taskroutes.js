import express from "express";
import protect from "../middleware/authmiddleware.js";
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    dashboardData,taskStatistics
  } from "../controllers/taskcontroller.js";
const router = express.Router();

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.get("/dashboard", protect, dashboardData);
router.get("/statistics", protect, taskStatistics);
router.get("/:id", protect, getTaskById);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);


export default router;