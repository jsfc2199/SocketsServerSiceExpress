import { Router, Request, Response } from "express";
import { Server } from "../class/server";

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
    de, cuerpo
  }

  const server = Server.instance;

  //mandar mensaje a uno a todos (con el id mandamos a uno en específico)
  //si hacemos server.io.emit lo manda a todos
  server.io.in(id).emit('mensaje-privado', payload	)

  res.json({
    ok: true,
    cuerpo,
    de, 
    id,
  });
});
