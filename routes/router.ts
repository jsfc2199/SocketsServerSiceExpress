import { Router, Request, Response } from "express";
import { Server } from "../class/server";
import { DefaultEventsMap, RemoteSocket } from "socket.io";
import { usuariasConectados } from "../sockets/sockets";

export const router = Router();

router.get("/mensajes", (req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: "ok",
  });
});

router.post("/mensajes", (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;

  const payload = {
    de,
    cuerpo,
  };

  const server = Server.instance;
  server.io.emit("mensaje-nuevo", payload);

  res.json({
    ok: true,
    cuerpo,
    de,
  });
});

router.post("/mensajes/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;

  const payload = {
    de,
    cuerpo,
  };

  const server = Server.instance;

  //mandar mensaje a uno a todos (con el id mandamos a uno en específico)
  //si hacemos server.io.emit lo manda a todos
  server.io.in(id).emit("mensaje-privado", payload);

  res.json({
    ok: true,
    cuerpo,
    de,
    id,
  });
});

//obtener todos los ids de los usuarios
router.get("/usuarios/", async (req: Request, res: Response) => {
  //obtenemos la instancia de la sesión
  const server = Server.instance;

  //obtener clientes
  await server.io
    .fetchSockets()
    .then((socket: RemoteSocket<DefaultEventsMap, any>[]) => {
      if (socket.length > 0) {
        let aux: string[] = [];
        socket.forEach((ele) => {
          aux.push(ele.id);
        });

        return res.json({
          ok: true,
          clientes: aux,
        });
      } else {
        return res.json({
          ok: false,
          clientes: [],
        });
      }
    })
    .catch((err) => {
      return res.json({
        ok: false,
        err,
        clientes: [],
      });
    });
});

//obtener nombre de usuarios
router.get("/usuarios/detalle", (req: Request, res: Response) => {
  const usuariosConectados = usuariasConectados;

  res.json({
    ok: true,
    usuarios: usuariasConectados.getLista(),
  });
});
