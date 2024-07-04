

const TABLA = 'auth';
const bcrypt = require('bcrypt');
const auth = require('../../auth');

module.exports = function(dbInyectada){

    let db = dbInyectada;

    if (!db){
        db = require('../../DB/mysql');
    }

   async function login(usuario, password){
        const data = await db.query(TABLA, {usuario: usuario});
        return bcrypt.compare(password, data.password)
        .then(resultado => {
            if (resultado === true) {
                return auth.asignarToken({...data});
            } else {
                throw new Error ('Información Inválida');
            }
        })
    }
       
    async function agregar(data){
        const authData = {
            id: data.id,
        }

        if (data.usuario){
            authData.usuario = data.usuario;
        }
        if (data.password){
            authData.password = await bcrypt.hash(data.password.toString(), 5);
        }

        return db.agregar(TABLA, authData);
    }

    async function eliminar(body){
        return db.eliminar(TABLA, body);
    }

    async function todos(){
        return db.todos(TABLA);
    }

    async function uno(id){
        return db.uno(TABLA, id);
    }


    return {
        
        agregar,
        login,
        eliminar,
        todos,
        uno
        
    }
}