const express = require('express');
const cors = require('cors');
const path = require('path');

const config = require('./config');

const movies = require('./modulos/movies/rutas');
const aclamadas = require('./modulos/aclamadas/rutas');
const usuarios = require('./modulos/usuarios/rutas');
const roles = require('./modulos/roles/rutas');
const genero = require('./modulos/genero/rutas');
const auth = require('./modulos/auth/rutas');

const error = require('./red/errors');

const app = express();

const corsOptions = {
    origin: '*',
    optionsSucessStatus: 200
}

app.use(express.static(path.join(__dirname,'..','public')));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('port', config.app.port);

app.use('/api/movies', movies);
app.use('/api/aclamadas', aclamadas);
app.use('/api/usuarios', usuarios);
app.use('/api/auth', auth);
app.use('/api/roles', roles);
app.use('/api/genero', genero);

app.use(error);

module.exports = app;
