"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
exports.router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mensaje: "ok",
    });
});
exports.router.post('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mensaje: "ok post",
    });
});
