const {Task, Todo} = require("../models/todoList")
const User = require('../models/user')
const {userTypeSchema} = require("../joi-schema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

module.exports = {
    home: async (request, h) => {
        console.log("Hit")
        return h.response({name: "test"}).code(200)
        .header("Access-Control-Allow-Origin", "http://localhost:5500/")  
        .header("Access-Control-Allow-Credentials", true)
    },
    create_todo : async (request, h) => {
        console.log(request.payload)
        const todo = new Todo()
        await todo.save()

        return h.response(todo._id)
    },
    create_task: async (request, h) => {
        const todo_id = request.params.todo_id;
        // Check if todo_exists
        try {
           
            const task = new Task(request.payload)
            await Todo.updateOne({_id:todo_id}, {$push: {tasks: task}})
            
            const data = await Todo.findOne({_id: todo_id}).exec()
            return h.response(data)
        } catch (error) {
            console.log(error)
            return h.response({error: error})
        }

    },
    getAllTasks : async (request, h) => {
        const todo_id = request.params.todo_id
        const tasks = await Todo.findOne({_id: todo_id}).select("-_id").populate("tasks")
        return h.response(tasks.tasks)
    },
    register: async (request, h) => {
        try {
            console.log(request.payload)
            const {first_name, last_name, email, password} = request.payload
            await userTypeSchema.validateAsync(request.payload)
            
            const oldUser = await User.findOne({email: email}).exec()
            if(oldUser){
                return h.response({message: "User Already exists"})
            }
            encryptedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                first_name,
                last_name,
                email: email.toLowerCase(), // sanitize: convert email to lowercase
                password: encryptedPassword,
            });
            
            const token = jwt.sign(
                { user_id: user._id, email },
                "ARSALAN",
                {
                  expiresIn: "2h",
                }
            );
            
            user.token = token;
            
            return h.response(user)
        } catch (error) {
            console.log({error:error})
            return h.response({error})
        }
        
       
    },
    login: async (request, h) => {
        console.log(request.method)
        return "Login"
    }
}