

const TABLA = 'usuarios';
const authDefault = require('../auth');



module.exports = function(dbInyectada, authInyectada){

    let db = dbInyectada;
    const auth = authInyectada || authDefault;

    if (!db){
        db = require('../../DB/mysql');
    }

    async function todos() {
        const usuariosData = await db.todos(TABLA);
        const authData = await auth.todos();
    
        const authMap = authData.reduce((map, authEntry) => {
            map[authEntry.id] = authEntry;
            return map;
        }, {});
    
        const combinedData = usuariosData.map(usuario => ({
            ...usuario,
            usuario: authMap[usuario.id]?.usuario,
            password: authMap[usuario.id]?.password
        }));
    
        return combinedData;
    }

    async function uno(id){
        const usuarios = await db.uno(TABLA, id);
        const usuarioData = usuarios[0];
        const authData = await auth.uno(id);

        const combinedData = {
            ...usuarioData,
            usuario: authData?.usuario
        };

        return [combinedData];
    }

    
    
    async function eliminar(body) {
        const userId = body.id;
    
        const respuestaAuth = await auth.eliminar({
            id: userId
        });
    
        const respuestaUsuario = await db.eliminar(TABLA, body);
    
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
