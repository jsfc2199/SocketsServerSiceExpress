"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./class/server");
const environment_1 = require("./global/environment");
const router_1 = require("./routes/router");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const server = new server_1.Server();
//siempre antes de las rutas
//bodyParser para leer datos de un post, indicamos que lo que sea que posteen, genere un objeto de js
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//config cors
server.app.use((0, cors_1.default)({ origin: true, credentials: true }));
//config de las rutas
server.app.use('/', router_1.router);
server.start(() => {
    console.log(`server running on port ${environment_1.SERVER_PORT}`);
});
