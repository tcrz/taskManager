const mongoose = require("mongoose")
const { Schema } = mongoose;

const taskSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: [true, "Title is requied"]
    },
    status: {
        type: String,
        enum: ["completed", "uncompleted"],
        required: [true, "Status is required"]
    },
    priority: {
        type: String,
        enum: ["high", "low"],
        required: [true, "Priority is required"]
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"]
    }

}, { timestamps: true})

module.exports = mongoose.model("Task", taskSchema)