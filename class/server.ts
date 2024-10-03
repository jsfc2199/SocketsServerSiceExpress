import express from "express";
import { SERVER_PORT } from "../global/environment";
import socketIO from "socket.io";
import http from "http";

export class Server {
  public app: express.Application;
  public port: number;

  public io: socketIO.Server;
  private httpServer: http.Server;

  constructor() {
    this.app = express();
    this.port = SERVER_PORT;

    //socket y express no son compatibles por lo tanto usamos http
    this.httpServer = new http.Server(this.app);
    this.io = socketIO(this.httpServer);

    this.escucharSockets()
  }

  private escucharSockets(){
    console.log('escuchando conexiones - sockets')
    this.io.on('connection', cliente => {
      console.log('cliente conectado')
    })
  }

  start(callback: Function) {
    this.httpServer.listen(this.port, callback()); //inicializamos el http Server
  }
}
