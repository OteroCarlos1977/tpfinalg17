//Requerimos express.
const express = require('express');
const cors = require('cors');
const path = require('path');


//Requerimos el archivo de configuración con los datos del puerto.
const config = require('./config');

//Requerimos el las rutas de movies, usuarios y auth
const movies = require('./modulos/movies/rutas');
const aclamadas = require('./modulos/aclamadas/rutas');
const usuarios = require('./modulos/usuarios/rutas');
const roles = require('./modulos/roles/rutas');
const genero = require('./modulos/genero/rutas');
const auth = require('./modulos/auth/rutas');

const error = require('./red/errors');

const app = express();

var corsOptions = {
    origin: '*',
    optionsSucessStatus: 200
}


//Utilización de Middlewares
app.use(express.static(path.join(__dirname,'..','public')));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Configuración del puerto
app.set('port', config.app.port);

//Configuración de las rutas
app.use('/api/movies', movies);
app.use('/api/aclamadas', aclamadas);
app.use('/api/usuarios', usuarios);
app.use('/api/auth', auth);
app.use('/api/roles', roles);
app.use('/api/genero', genero);

app.use(error);

module.exports = app;