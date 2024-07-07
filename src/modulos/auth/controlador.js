

const TABLA = 'auth';
const bcrypt = require('bcrypt');
const auth = require('../../auth');

module.exports = function(dbInyectada){

    let db = dbInyectada;

    if (!db){
        db = require('../../DB/mysql');
    }

    async function login(usuario, password) {
        try {
            console.log("Inicio de sesión:", { usuario, password });
            const data = await db.query(TABLA, { usuario: usuario });
    
            if (!data) {
                throw new Error('Usuario no encontrado');
            }
    
            console.log("Datos del usuario:", data);
    
            const resultado = await bcrypt.compare(password, data.password);
    
            if (resultado === true) {
                console.log("Contraseña correcta, generando token");
                return auth.asignarToken({ ...data });
            } else {
                console.log("Contraseña incorrecta");
                throw new Error('Información Inválida');
            }
        } catch (error) {
            console.error("Error en la función login:", error.message);
            throw error;
        }
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