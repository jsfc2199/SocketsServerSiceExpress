import { Socket } from "socket.io";
import socketIO from 'socket.io';

export const desconectar = (cliente: Socket) => {
  cliente.on("disconnect", () => {
    console.log("cliente desconectado");
  });
};

export const mensaje = (cliente: Socket, io: socketIO.Server) => {
  cliente.on("mensaje", (payload: { de: string; cuerpo: string }) => {
    console.log('mensaje recibido', payload)

    //emitimos a todos
    io.emit('mensaje-nuevo', payload)
  });
};

//como desde el cliente estamos emitiendo el callback lo podemos recibir en el servidor
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
  cliente.on("configurar-usuario", (payload: { nombre: string }, callback: Function) => {
    console.log('configurando usuario', payload.nombre)
    callback({
      ok: true,
      mensaje: `Usuario ${payload.nombre} configurado`
    })
  });
};
