import { Server } from "./class/server"
import { SERVER_PORT } from "./global/environment"
import { router } from "./routes/router"

const server = new Server()

//config de las rutas
server.app.use('/', router)


server.start(() => {
    console.log(`server running on port ${SERVER_PORT}`)
})