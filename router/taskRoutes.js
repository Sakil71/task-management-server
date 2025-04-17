import express from "express";
import { deleteTask, getAllTask, postTask, updateTaskStatus } from "../controler/taskController.js";

const router = express.Router();

router.get('/', getAllTask);
router.post('/', postTask);
router.delete('/:id', deleteTask);
router.patch('/:id', updateTaskStatus);


export default router;