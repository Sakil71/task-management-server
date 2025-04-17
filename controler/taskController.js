import { ObjectId } from "mongodb";
import { getDBCollection } from "../db/db.js";

export const getAllTask = async (req, res) => {
    try {
        const taskCollection = await getDBCollection("tasks");
        const result = (await taskCollection.find({}).toArray()).reverse();
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch task" });
    }
}

export const postTask = async (req, res) => {
    const newTask = req.body;
    try {
        const taskCollection = await getDBCollection("tasks");
        const result = await taskCollection.insertOne(newTask);
        res.status(201).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteTask = async (req, res) => {
    const taskId = req.params.id;
    try {
        const taskCollection = await getDBCollection("tasks");
        const result = await taskCollection.deleteOne({ _id: new ObjectId(taskId) });
        
        if (result.deletedCount === 0) {
            res.status(404).json({ error: "Task not found" });
        }
        else {
            res.json({ message: "Task deleted successfully" });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const updateTaskStatus = async (req, res) => {
    const taskId = req.params.id;
    const task = req.body;

    try {
        const taskCollection = await getDBCollection("tasks");
        const result = await taskCollection.updateOne(
            { _id: new ObjectId(taskId) },
            { $set: task }
        );
        if (result.matchedCount === 0) {
            res.status(404).json({ error: "Task not found" });
        }
        else {
            res.json({ message: "task status updated successfully" });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}