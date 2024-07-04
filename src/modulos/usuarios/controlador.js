

const TABLA = 'usuarios';
const auth = require('../auth');



module.exports = function(dbInyectada){

    let db = dbInyectada;

    if (!db){
        db = require('../../DB/mysql');
    }

    async function todos() {
        const usuariosData = await db.todos(TABLA); // Obtener datos de la tabla 'usuarios'
        const authData = await auth.todos(); // Obtener datos de autenticación
    
        // Mapear los datos de autenticación por id
        const authMap = authData.reduce((map, authEntry) => {
            map[authEntry.id] = authEntry;
            return map;
        }, {});
    
        // Combinar los datos de ambas tablas
        const combinedData = usuariosData.map(usuario => ({
            ...usuario,
            usuario: authMap[usuario.id]?.usuario, // Agregar el campo 'usuario' desde authData
            password: authMap[usuario.id]?.password // Agregar el campo 'password' desde authData
        }));
    
        return combinedData;
    }

    async function uno(id){
        const usuarioData = await db.uno(TABLA, id);
        const authData = await auth.uno(id);

        console.log("Usuario Data:", usuarioData); // <-- Aquí
        console.log("Auth Data for ID:", id, authData); // <-- Aquí

        // Combinando los datos de ambas tablas
        const combinedData = {
            ...usuarioData,
            usuario: authData.usuario,
            password: authData.password
        };

        return combinedData;
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