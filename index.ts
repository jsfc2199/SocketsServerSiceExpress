import { Server } from "./class/server"
import { SERVER_PORT } from "./global/environment"

const server = new Server()


server.start(() => {
    console.log(`server running on port ${SERVER_PORT}`)
})