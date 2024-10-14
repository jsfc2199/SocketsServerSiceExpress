import { Socket } from "socket.io";
import socketIO from "socket.io";
import { UsuariosLista } from "../class/usuarios-lista";
import { Usuario } from "../class/usuario";

export const usuariasConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket, io: socketIO.Server) => {
  //queremos almacenar un usuario en la lista
  const usuario = new Usuario(cliente.id);

  usuariasConectados.agregar(usuario);
};

export const desconectar = (cliente: Socket, io: socketIO.Server) => {
  cliente.on("disconnect", () => {
    usuariasConectados.borrarUsuario(cliente.id);
    console.log("cliente desconectado");

    //si alguien se desconecta debemos emitir la nueva lista
    io.emit("usuarios-activos", usuariasConectados.getLista());
  });
};

export const mensaje = (cliente: Socket, io: socketIO.Server) => {
  cliente.on("mensaje", (payload: { de: string; cuerpo: string }) => {
    console.log("mensaje recibido", payload);

    //emitimos a todos
    io.emit("mensaje-nuevo", payload);
  });
};

//como desde el cliente estamos emitiendo el callback lo podemos recibir en el servidor
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
  cliente.on(
    "configurar-usuario",
    (payload: { nombre: string }, callback: Function) => {
      usuariasConectados.actualizarNombre(cliente.id, payload.nombre);
      io.emit("usuarios-activos", usuariasConectados.getLista());
      callback({
        ok: true,
        mensaje: `Usuario ${payload.nombre} configurado`,
      });
    }
  );
};
