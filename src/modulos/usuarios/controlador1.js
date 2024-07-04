

const TABLA = 'usuarios';
const auth = require('../auth');



module.exports = function(dbInyectada){

    let db = dbInyectada;

    if (!db){
        db = require('../../DB/mysql');
    }

    function todos(){
        return db.todos(TABLA);
    }

      
    function uno(id){
        return db.uno(TABLA, id);
    }

   
    
    async function eliminar(body) {
        const userId = body.id;
    
        // Eliminar el registro de la tabla 'auth'
        const respuestaAuth = await auth.eliminar({
            id: userId
        });
    
        // Eliminar el registro de la tabla 'usuarios'
        const respuestaUsuario = await db.eliminar(TABLA, body);
    
        // Retornar alguna respuesta, por ejemplo, confirmación de eliminación
        return {
            auth: respuestaAuth,
            usuario: respuestaUsuario
        };
    }
    async function agregar(body){

        const usuario = {
            id: body.id,
            nombre: body.nombre,
            apellido: body.apellido,
            email: body.email,
            rol_id: body.rol_id

        }

        const respuesta = await db.agregar(TABLA, usuario);

        var insertId = 0;

        if(body.id == 0){
            insertId = respuesta.insertId;
        }else {
            insertId = body.id;
        }

        var respuesta2 = '';

        if(body.usuario || body.password){
            respuesta2 = await auth.agregar({
                id: insertId,
                usuario: body.usuario,
                password:  body.password
            })

        }
        return respuesta2 ;
    }
    return {
        todos,
        uno,
        agregar,
        eliminar
    } 
}