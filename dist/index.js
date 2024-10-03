"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./class/server");
const environment_1 = require("./global/environment");
const server = new server_1.Server();
server.start(() => {
    console.log(`server running on port ${environment_1.SERVER_PORT}`);
});
