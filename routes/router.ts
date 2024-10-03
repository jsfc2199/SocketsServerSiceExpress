import { Router, Request, Response } from "express";

export const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
  res.json({
    ok: true,
    mensaje: "ok",
  });
});

router.post('/mensajes', (req: Request, res: Response) => {
    res.json({
      ok: true,
      mensaje: "ok post",
    });
  });
