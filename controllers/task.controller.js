
import Task from "../models/task.js";


import pkg from "body-parser"; 
const { json } = pkg;

export const getAllTasks = async (req,res,next) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);

    } catch (error) {
        next(error)
        
    }
    
}

export const getTaskById = async (req,res,next) => {
    try {
        const task = await Task.findById(req.params.taskId);
        if(!task)
            return res.status(404).json({message:"not found"});
        res.json(task);
    } catch (error) {
        next(error);
        
    }
    
}

export const createTask = async(req,res,next) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({message:"Yarata olmadingov", error})
        
    }
}

export const updateTask = async(req,res,next) =>{
    try {
        const task = await Task.findByIdAndUpdate(req.params.taskId, req,body, {new:true});
        if(!task)
            return res.status(404).json({message: "not Found"});
        res.json(task)
    } catch (error) {
        next(error);
    }
}

export const deleteTask = async (req,res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.taskId);
        if(!task)
            return res.status(404).json({message:"Yana topilmadi"})
        res.sendStatus(204)
    } catch (error) {
        next(error);
        
    }
}