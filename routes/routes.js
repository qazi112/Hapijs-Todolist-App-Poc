const controllers = require("../controllers/controller")

module.exports = [
    {
        method: "GET",
        path: "/",
        handler: controllers.home
    },
    {
        method: "POST",
        path: "/api/create/todo",
        handler: controllers.create_todo,
        config: {
            description : "Creates a Todo Document and return its _id"
        }
    },
    {
        method: "POST",
        path: "/api/create/task/{todo_id}",
        handler: controllers.create_task,
        config: {
            description: "Creates a new Task"
        }
    },
    {
        method: "GET",
        path: "/api/tasks/{todo_id?}",
        handler: controllers.getAllTasks,
        config: {
            description: "Get all tasks for the Todo list"
        }
    },
    {
        method: "POST",
        path: "/register",
        handler: controllers.register
    },
    {
        method: ["POST", "GET"],
        path: "/login",
        handler: controllers.login
    }

]