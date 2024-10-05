import express from "express";
import { SERVER_PORT } from "../global/environment";
import socketIO from "socket.io";
import http from "http";
import cors from 'cors';
import * as socket from "../sockets/sockets";

export class Server {
  private static _instance: Server

  public app: express.Application;
  public port: number;

  public io: socketIO.Server;
  private httpServer: http.Server;

  //private in order to apply singleton
  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;

    //socket y express no son compatibles por lo tanto usamos http
    this.httpServer = new http.Server(this.app);
    this.io = socketIO(this.httpServer, {
      cors: {
        origin: true
      }
    });

    this.escucharSockets()
  }

  //si la instancia ya existe devuelve la instancia, sino, la crea
  public static get instance() {
    return this._instance || (this._instance = new this())
  }

  private escucharSockets(){
    console.log('escuchando conexiones - sockets')
    this.io.on('connection', cliente => {
      console.log('cliente conectado')
      socket.mensaje(cliente)
      socket.desconectar(cliente)
    })
  }

  start(callback: Function) {
    this.httpServer.listen(this.port, callback()); //inicializamos el http Server
  }
}
