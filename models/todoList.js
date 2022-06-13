const mongoose = require("mongoose")

const Schema = mongoose.Schema

const TaskSchema = Schema({
    title: {
        type: String,
        requred: true
    },
    description: String,
    status: {
        type: String,
        enum : ["COMPLETE", "PENDING"],
        default: "PENDING"
    }
}, {versionKey:false})

const TodoSchema = Schema({
    tasks : [TaskSchema]

},{versionKey:false})

const Task = mongoose.model("Task", TaskSchema)
const Todo = mongoose.model("Todo", TodoSchema)

module.exports = {Task, Todo}


