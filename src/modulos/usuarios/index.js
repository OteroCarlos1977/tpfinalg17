const db = require('../../DB/mysql');
const ctrl = require('./controlador1');

module.exports = ctrl(db);