

const TABLA = 'auth';
const bcrypt = require('bcryptjs');
const auth = require('../../auth');

module.exports = function(dbInyectada){

    let db = dbInyectada;

    if (!db){
        db = require('../../DB/mysql');
    }

    async function login(usuario, password) {
        try {
            const data = await db.query(TABLA, { usuario: usuario });
    
            if (!data) {
                throw new Error('Usuario no encontrado');
            }
    
            const resultado = await bcrypt.compare(password, data.password);
    
            if (resultado === true) {
                return auth.asignarToken({ ...data });
            } else {
                throw new Error('Información Inválida');
            }
        } catch (error) {
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
        const items = await db.todos(TABLA);
        return items.map(({ password, ...item }) => item);
    }

    async function uno(id){
        const items = await db.uno(TABLA, id);
        if (!items || items.length === 0) {
            return null;
        }

        const { password, ...item } = items[0];
        return item;
    }


    return {
        
        agregar,
        login,
        eliminar,
        todos,
        uno
        
    }
}
