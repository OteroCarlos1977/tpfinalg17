const express = require("express");
const respuesta = require("../../red/respuestas");
const upload = require("../../modulos/movies/upload");
const controlador = require("./index");
const router = express.Router();

router.get("/", todos);
router.get("/:id", uno);
router.post("/", upload.single('imagen'), agregar);
router.put("/", eliminar);


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

async function agregar(req, res, next) {
  try {
      if (req.file) {
          req.body.imagen = '../uploads/' + req.file.filename; 
      }

      const mensaje = req.body.id == 0 ? 'Registro guardado con éxito' : 'Registro actualizado con éxito';
      await controlador.agregar(req.body);
      respuesta.success(req, res, mensaje, 201);
  } catch (err) {
      next(err);
  }
}

async function eliminar(req, res, next) {
    try {
      const items = await controlador.eliminar(req.body);
      respuesta.success(req, res, 'Registro eliminado satisfactoriamente', 200);
    } catch (err) {
        next(err);
    }
  }

module.exports = router;
