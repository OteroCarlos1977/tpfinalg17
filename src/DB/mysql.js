const mysql = require('mysql2');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password:  config.mysql.password,
    database: config.mysql.database,
    
}

let conexion;

function conMysql(){
    conexion = mysql.createConnection(dbconfig);
    conexion.connect((err)=> {
        if(err){
            console.log('[db err]', err);
            setTimeout(conMysql, 200);
        }else{
            console.log('Conectado a la base de datos');
        }
    });

    conexion.on('error', (err) => {
        console.log('[db err]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conMysql();
        }else{
            throw err;
        }
    });
}

conMysql();

function todos(tabla){
    return new Promise((resolve, reject)=>{
        conexion.query(`SELECT * FROM ${tabla}`, (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
    
}

function uno(tabla, id){
    return new Promise((resolve, reject)=>{
        conexion.query(`SELECT * FROM ${tabla} WHERE id=${id}`, (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function agregar(tabla, data){
    return new Promise((resolve, reject)=>{
        conexion.query(`INSERT INTO ${tabla} SET ? ON DUPLICATE KEY UPDATE ?`, [data, data] ,(error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}


function eliminar(tabla, data){
    return new Promise((resolve, reject)=>{
        conexion.query(`DELETE FROM ${tabla} WHERE id = ?`, data.id ,(error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

function query(tabla, consulta) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE ?`, consulta, (error, result) => {
            if (error) {
                console.error("Error en la consulta a la base de datos:", error);
                return reject(error);
            }
            if (!result || result.length === 0) {
                console.log("Usuario no encontrado en la base de datos");
                return resolve(null);
            }
            console.log("Resultado de la consulta:", result[0]);
            return resolve(result[0]);
        });
    });
}


module.exports = {
    todos, 
    uno,
    agregar,
    eliminar,
    query
}