const Hapi = require("@hapi/hapi")
const db = require("./db")
const handlebars = require("handlebars")

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    })

    server.route(require("./routes/routes"))
    
    await server.register(require("@hapi/vision"))
    server.views({
        engines: {html: handlebars},
        relativeTo: __dirname,
        path: "views/"
    })

    await server.start()
    console.log("Server Started")
}


init()