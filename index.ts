import { Server } from "./class/server"
import { SERVER_PORT } from "./global/environment"
import { router } from "./routes/router"
import bodyParser from "body-parser"
import cors from 'cors'

const server = Server.instance

//siempre antes de las rutas
//bodyParser para leer datos de un post, indicamos que lo que sea que posteen, genere un objeto de js
server.app.use(bodyParser.urlencoded({extended: true}))
server.app.use(bodyParser.json())

//config cors
server.app.use( cors({origin: true, credentials: true}))

//config de las rutas
server.app.use('/', router)

server.start(() => {
    console.log(`server running on port ${SERVER_PORT}`)
})