const express = require("express");
const respuesta = require("../../red/respuestas");
const controlador = require("./index");
const router = express.Router();

  
router.post('/login', login);
router.get('/', todos);
router.get('/:id', uno);

async function login(req, res, next) {
  try {
      const token = await controlador.login(req.body.usuario, req.body.password);
      console.log("Token generado:", token);
      respuesta.success(req, res, token, 200);
  } catch (err) {
      console.error("Error en la ruta de login:", err.message);
      respuesta.error(req, res, err.message, 500);
  }
}

  async function todos(req, res, next) {
    try {
      const items = await controlador.todos();
      respuesta.success(req, res, items, 200);
    } catch (err) {
      next(err);
    }
  }
  
  
  async function uno(req, res, next) {
    try {
      const items = await controlador.uno(req.params.id);
      respuesta.success(req, res, items, 200);
    } catch (err) {
      next(err);
    }
  }
  
  
module.exports = router;
