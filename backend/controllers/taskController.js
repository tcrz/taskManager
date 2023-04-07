const mongoose = require("mongoose")
const Task = require("../models/taskModel")
const asyncHandler = require("express-async-handler")
const validateRequestBody = require("../utils")



// Check if id param is valid
const ValidateIdParam = (id, res) => {
    try {
        const newId = new mongoose.Types.ObjectId(id)
    } catch (err) {
        res.status(404)
        throw new Error("Task not found")
    }
}

// get tasks
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({user_id: req.user._id})
    res.status(200).json({tasks})
})

//create task
const createTask  = asyncHandler(async (req, res) => {
    // console.log(req.body)
    const {title, priority, status, dueDate} = req.body
    validateRequestBody(req.body, res)
    const newTask = Task({user_id: req.user._id, title, priority, status, dueDate})
    await newTask.save()
    res.status(201).json({message: "Task created successfully"})
})

//get task
const getTask  = asyncHandler(async (req, res) => {
    ValidateIdParam(req.params.id, res)
    const task = await Task.findById(req.params.id)
    if (!task) {
        res.status(404)
        throw new Error("Task not found")
    }
    res.status(200).json({task})
})

//update task
const updateTask = asyncHandler(async (req, res) => {
    ValidateIdParam(req.params.id, res)
    validateRequestBody(req.body, res)
    const task = await Task.findById(req.params.id)
    if (!task) {
        res.status(404)
        throw new Error("Task not found")
    }

    if(task.user_id.toString() !== req.user._id) {
        res.status(401)
        throw new Error("Not authorized")
    }
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {timestamps: true, runValidators: true, new: true}).exec()
    res.status(200).json({message: "Task updated successfully", updatedTask})
})

//delete task
const deleteTask = asyncHandler(async (req, res) => {
    ValidateIdParam(req.params.id, res)
    const task = await Task.findById(req.params.id)
    if (!task) {
        res.status(404)
        throw new Error("Task not found")
    }

    if(task.user_id.toString() !== req.user._id) {
        res.status(401)
        throw new Error("Not authorized")
    }
    const deletedTask = await Task.findByIdAndDelete(req.params.id)
    res.json({message: "Task deleted succesfully"})
})

module.exports = {
    getTasks, 
    createTask,
    getTask,
    updateTask,
    deleteTask
}