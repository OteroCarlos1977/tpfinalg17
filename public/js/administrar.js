document.addEventListener('DOMContentLoaded', () => {
    

    const btnUsuario = document.getElementById('usuarios');
    const btnPelicula = document.getElementById('peliculas');
    const seccUsuarios = document.getElementById('seccionUsuarios');
    const seccPeliculas = document.getElementById('seccionPeliculas');
    const contHeader = document.getElementById('header');
    const contBotones = document.getElementById('contenedorBotones');
    const seccAgregUsu = document.getElementById('seccionAgregarUsuario');
    const seccAgregPeli = document.getElementById('seccionAgregarPelicula');
    const seccModUsu = document.getElementById('seccionActualizarUsuario');
    const seccModPeli = document.getElementById('seccionActualizarPelicula');
    const seccElimUsu = document.getElementById('seccionEliminarUsuario');
    const seccElimPeli = document.getElementById('seccionEliminarPelicula');
    const btnAgregarUsu = document.getElementById('btnAgregarUsu');
    const btnEditarUsu = document.getElementById('btnEditarUsu');
    const btnElimUsu = document.getElementById('btnEliminarUsu');
    const btnAgregarPeli = document.getElementById('btnAgregarPeli');
    const btnEditarPeli = document.getElementById('btnEditarPeli');
    const btnElimPeli = document.getElementById('btnEliminarPeli');
    const btnRegresarUsu = document.getElementById('btnRegresarUsu');
    const btnRegresarPeli = document.getElementById('btnRegresarPeli');
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');

/* **************************************************************************
                MANEJO DE EVENTOS BOTONES
************************************************************************** */
    btnUsuario.addEventListener('click', (event) => {
            event.preventDefault();

            seccUsuarios.style.display = 'flex';
            contHeader.style.display = 'none';
            contBotones.style.display = 'none';
            listarUsuarios();

            
        });

    btnPelicula.addEventListener('click', (event) => {
            event.preventDefault();
            seccPeliculas.style.display = 'flex';
            contHeader.style.display = 'none';
            contBotones.style.display = 'none';
            listarPeliculas();
        });

    btnRegresarUsu.addEventListener('click', (event) => {
        event.preventDefault();
        
        seccUsuarios.style.display = 'none';
        contHeader.style.display = 'block';
        contBotones.style.display = 'flex';
    });

    btnRegresarPeli.addEventListener('click', (event) => {
        event.preventDefault();
        
        seccPeliculas.style.display = 'none';
        contHeader.style.display = 'block';
        contBotones.style.display = 'flex';
    });

    btnAgregarUsu.addEventListener('click', (event) => {
        event.preventDefault();
        
        seccUsuarios.style.display = 'none';
        seccAgregUsu.style.display = 'block';
    });

    
    btnEditarUsu.addEventListener('click', (event) => {
        event.preventDefault();
        
        seccUsuarios.style.display = 'none';
        seccModUsu.style.display = 'block';
    });

    btnElimUsu.addEventListener('click', (event) => {
        event.preventDefault();
        
        seccUsuarios.style.display = 'none';
        seccElimUsu.style.display = 'block';
    });

    btnAgregarPeli.addEventListener('click', (event) => {
        event.preventDefault();
        
        seccPeliculas.style.display = 'none';
        seccAgregPeli.style.display = 'block';
    });

    btnEditarPeli.addEventListener('click', (event) => {
        event.preventDefault();
        
        seccPeliculas.style.display = 'none';
        seccModPeli.style.display = 'block';
    });

    btnElimPeli.addEventListener('click', (event) => {
        event.preventDefault();
        
        seccPeliculas.style.display = 'none';
        seccElimPeli.style.display = 'block';
    });

    btnCerrarSesion.addEventListener('click', function(event) {
        event.preventDefault(); 
      
        
        if ('caches' in window) {
            caches.keys().then(function(keyList) {
                return Promise.all(keyList.map(function(key) {
                    return caches.delete(key);
                }));
            });
        }
      
        localStorage.clear();
      
        window.location.href = '../index.html';
      });

/* **************************************************************************
                FUNCION PARA CERRAR LAS DISTINTAS SECCIONES
************************************************************************** */

    const closeIcons = document.querySelectorAll('.close-icon');

closeIcons.forEach(function(icon) {
    icon.addEventListener("click", function() {
        // Buscar la sección padre de la clase .seccionEliminarUsuario o .seccionEliminarPelicula
        var section = icon.closest(".seccionEliminarUsuario, .seccionEliminarPelicula, .seccionActualizarUsuario, .seccionActualizarPelicula, .seccionAgregarUsuario, .seccionAgregarPelicula");

        if (section) {
            // Ocultar la sección actual
            section.style.display = "none";

            // Volver a la tabla correspondiente
            if (section.id === "seccionEliminarUsuario" || section.id === "seccionActualizarUsuario" || section.id === "seccionAgregarUsuario") {
                // Volver a la tabla de usuarios
                
                if (seccUsuarios) {
                    seccUsuarios.style.display = "flex";  
                }
            } else if (section.id === "seccionEliminarPelicula" || section.id === "seccionActualizarPelicula" || section.id === "seccionAgregarPelicula") {
                // Volver a la tabla de películas
                
                if (seccPeliculas) {
                    seccPeliculas.style.display = "flex";  // Ajusta esto según cómo muestras tu tabla de películas
                }
            }
        }
    });
});

/* **************************************************************************
                FUNCION PARA CREAR LA TABLA USUARIOS
************************************************************************** */


      async function listarUsuarios() {
        try {
            const response = await fetch('/api/usuarios');
            const response2 = await fetch('/api/auth');

            if (!response.ok || !response2.ok) {
                throw new Error('Respuesta de la red negativa');
            }
            const data = await response.json();
            const data2 = await response2.json();
            
          
            
            if (!Array.isArray(data.body)) {
                throw new Error('Se esperaba que data.body fuera un array pero se obtuvo ' + typeof data.body);
            }

            if (!Array.isArray(data2.body)) {
                throw new Error('Se esperaba que data.body fuera un array pero se obtuvo ' + typeof data2.body);
            }
    
            const usuarios1 = data.body;
            const usuarios2 = data2.body;

            let usuarios =usuarios1.map(item1 => {
                let item2 = usuarios2.find(item2 => item2.id === item1.id);
                return {
                    ...item1,
                    ...item2};
            })
            
            
            
            const tbody = document.querySelector('#tablaUsuarios tbody'); 
            if (!tbody) {
                console.error('tbody elemento no hallado');
                return;
            }
    
            tbody.innerHTML = ''; 
            usuarios.forEach(usuario => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.apellido}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.rol_id}</td>
                    <td>${usuario.usuario}</td>
                    <td>${usuario.password}</td>
                    

                    
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            console.error('Error fetching usuarios:', error);
        }
    }

/* **************************************************************************
               FUNCION PARA CREAR UN  NUEVO USUARIO
************************************************************************** */
    

    const nuevoUsuario = document.getElementById('agregaUsuario');

    nuevoUsuario.addEventListener('submit', async (event) => {
        event.preventDefault();
        const dataForm = new FormData(nuevoUsuario);
        const data = {
            id: 0,
            nombre: dataForm.get('nombreAgreg'),
            apellido: dataForm.get('apellidoAgreg'),
            email: dataForm.get('emailAgreg'),
            usuario: dataForm.get('usuarioAgreg'),
            password: dataForm.get('passwordAgreg'),
            rol_id: 2
        }

        try {
            const respuesta = await fetch('/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
        
            const respuestaJson = await respuesta.json();
            if (respuesta.ok) {
                alert("Usuario agregado con Éxito");
                nuevoUsuario.reset();
                seccAgregUsu.style.display = 'none';
                seccUsuarios.style.display = 'flex';
                listarUsuarios();
            } else {
                alert("Hubo un error al agregar el usuario");
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            alert("Hubo un error al realizar la solicitud");
        }
    });

/* **************************************************************************
               FUNCION PARA BUSCAR DATOS USUARIO POR ID PARA ELIMINAR
************************************************************************** */
    

    const elimId = document.getElementById('buscarUsuElim');

    elimId.addEventListener('click', async (event) => {
        event.preventDefault();
    
        const userIdString = document.getElementById('idElimUsu').value.trim();
        const userId = parseInt(userIdString, 10);
    
        // Validar que userId sea un número válido
        if (isNaN(userId)) {
            alert('ID de usuario no válido');
            return;
        }
    
        try {
            const response = await fetch(`/api/usuarios/${userId}`);
    
            if (!response.ok) {
                throw new Error('Respuesta de la red negativa');
            }
    
            const userData = await response.json();
    
            
            
            // Validar la estructura de userData.body
            if (typeof userData.body !== 'object' || userData.body === null) {
                throw new Error('La respuesta no contiene datos válidos');
            }
    
            const data = userData.body[0];
    
            
    
            // Llenar los campos del formulario con los datos obtenidos
            document.getElementById('nombreElim').value = data.nombre;
            document.getElementById('apellidoElim').value = data.apellido;
            document.getElementById('emailElim').value = data.email;
            document.getElementById('rolElim').value = data.rol_id;
            
            
    
        } catch (error) {
            alert('Error al buscar usuario:', error);
        }
    });

/* **************************************************************************
                 FUNCION PARA ELIMINAR USUARIO
************************************************************************** */
  

    const eliminarUsuario = document.getElementById('elimiUsuario');

    eliminarUsuario.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        
        const userId = document.getElementById('idElimUsu').value;
        try {
            const response = await fetch('/api/usuarios', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: userId })
            });
            if (response.ok) {
                alert('Usuario eliminado correctamente');
                eliminarUsuario.reset();
                seccElimUsu.style.display = 'none';
                seccUsuarios.style.display = 'flex';
                listarUsuarios();
            } else {
                alert('Error al eliminar usuario');
            }
        } catch (error) {
            alert('Error en la solicitud PUT:', error);
        }
    });

/* **************************************************************************
                FUNCION BUSQUEDA DE USUARIO POR ID PARA ACTUALIZAR
************************************************************************** */
  

    const actualUsuId = document.getElementById('buscarUsuActual');

    actualUsuId.addEventListener('click', async (event) => {
        event.preventDefault();
    
        const userIdString = document.getElementById('idActual').value.trim();
        const userId = parseInt(userIdString, 10);
    
        // Validar que userId sea un número válido
        if (isNaN(userId)) {
            console.error('ID de usuario no válido');
            return;
        }
    
        try {
            
            const resp = await fetch(`/api/usuarios/${userId}`);
            

           

           

            if (!resp.ok) {
                throw new Error('Network response was not ok');
            }
    
            const Data = await resp.json();
            

           
             //Validar la estructura de userData.body
            if (typeof Data.body !== 'object' || Data.body === null) {
                throw new Error('La respuesta no contiene datos válidos');
            }

          
    
            const data = Data.body[0];
            

            
           
             //Llenar los campos del formulario con los datos obtenidos
            document.getElementById('nombreActual').value = data.nombre;
            document.getElementById('apellidoActual').value = data.apellido;
            document.getElementById('emailActual').value = data.email;
            document.getElementById('rol_idActual').value = data.rol_id;
            
            
    
        } catch (error) {
            console.error('Error al buscar usuario:', error);
        }
    });

/* **************************************************************************
                  FUNCION PARA ACTUALIZAR USUARIO
************************************************************************** */
   
const actualizarUsuario = document.getElementById('actualiUsuario');
actualizarUsuario.addEventListener('submit', async (event) => {
    event.preventDefault();

    const userId = document.getElementById('idActual').value;
    const nombre = document.getElementById('nombreActual').value;
    const apellido = document.getElementById('apellidoActual').value;
    const email = document.getElementById('emailActual').value;
    const rol_id = document.getElementById('rol_idActual').value;

    let requestBody = {
        id: userId,
        nombre: nombre,
        apellido: apellido,
        email: email,
        rol_id: rol_id
    };

    try {
        const response = await fetch('/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            alert('Usuario actualizado correctamente');
            actualizarUsuario.reset();
            seccModUsu.style.display = 'none';
            seccUsuarios.style.display = 'flex';
            listarUsuarios();
        } else {
            alert('Error al actualizar usuario');
        }
    } catch (error) {
        alert('Error en la solicitud: ' + error.message);
    }
});


/* **************************************************************************
                      FUNCION PARA CREAR LA TABLA PELICULAS
************************************************************************** */    

    async function listarPeliculas() {
        try {
            const response = await fetch('/api/movies');
            const response2 = await fetch('/api/genero');
    
            if (!response.ok || !response2.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            const data2 = await response2.json();
    
            if (!Array.isArray(data.body)) {
                throw new Error('Se esperaba que data.body fuera un array pero se obtuvo ' + typeof data.body);
            }
    
            if (!Array.isArray(data2.body)) {
                throw new Error('Se esperaba que data.body fuera un array pero se obtuvo' + typeof data2.body);
            }
    
            const peliculas = data.body;
            const generos = data2.body;
    
            let listaPeliculas = peliculas.map(item1 => {
                let item2 = generos.find(item2 => item2.id === item1.genero_id);
                return {
                    ...item1,
                    genero: item2 ? item2.genero : 'Sin género'
                };
            });
    
            
    
            const tbody = document.querySelector('#tablaPeliculas tbody');
            if (!tbody) {
                console.error('tbody element not found');
                return;
            }
    
            tbody.innerHTML = '';
            listaPeliculas.forEach(pelicula => {
                const tr = document.createElement('tr');
                const fechaEstreno = new Date(pelicula.fecha_estreno).toLocaleDateString();
                //Con Imagen
                /*tr.innerHTML = `
                    <td>${pelicula.id}</td>
                    <td>${pelicula.titulo}</td>
                    <td>${fechaEstreno}</td>
                    <td>${pelicula.genero}</td>
                    <td><img src="${pelicula.imagen}" alt="${pelicula.titulo}" width="40" height="50"></td>
                `;*/
                //Sin Imagen
                tr.innerHTML = `
                    <td>${pelicula.id}</td>
                    <td>${pelicula.titulo}</td>
                    <td>${fechaEstreno}</td>
                    <td>${pelicula.genero}</td>
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            console.error('Error fetching peliculas:', error);
        }
    }

/* **************************************************************************
                        FUNCION PARA CREAR UNA  NUEVA PELICULA 
************************************************************************** */        
 

    const nuevaPelicula = document.getElementById('agregarPelicula');

    nuevaPelicula.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        // Obtener los datos del formulario usando FormData
        const dataForm = new FormData(nuevaPelicula);
        const titulo = dataForm.get('tituloAgreg');
        const fechaEstreno = dataForm.get('fechaEstrenoAgreg');
        const generoId = dataForm.get('generoAgreg');
        //const imagen = dataForm.get('imagenAgreg'); // Esto obtiene el archivo seleccionado
    
        // Crear un nuevo FormData para enviar datos y archivo
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('fecha_estreno', fechaEstreno);
        formData.append('genero_id', generoId);
        //formData.append('imagen', imagen); 
    
        try {
            const respuesta = await fetch('/api/movies', {
                method: 'POST',
                body: formData,
            });
    
            const respuestaJson = await respuesta.json();
            if (respuesta.ok) {
                console.log("Película agregada con éxito:", respuestaJson);
                alert("Película agregada con éxito");
                nuevaPelicula.reset();
                seccAgregPeli.style.display = 'none';
                seccPeliculas.style.display = 'flex';
                listarPeliculas();
            } else {
                console.error("Error al agregar la película:", respuestaJson);
                alert("Hubo un error al agregar la película");
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            alert("Hubo un error al realizar la solicitud");
        }
    });

/* **************************************************************************
            FUNCION PARA BUSCAR DATOS PELICULA POR ID PARA ELIMINAR
************************************************************************** */  
    

    const buscarIPelId = document.getElementById('buscarPelElim');

    buscarIPelId.addEventListener('click', async (event) => {
        event.preventDefault();
    
        const pelIdString = document.getElementById('idElimPel').value.trim();
        const pelId = parseInt(pelIdString, 10);
    
        // Validar que userId sea un número válido
        if (isNaN(pelId)) {
            alert('ID de pelicula no válido');
            return;
        }
    
        try {
            const response = await fetch(`/api/movies/${pelId}`);
    
            if (!response.ok) {
                throw new Error('Respuesta de la red negativa');
            }
    
            const pelData = await response.json();
    
            
            
            // Validar la estructura de userData.body
            if (typeof pelData.body !== 'object' || pelData.body === null) {
                throw new Error('La respuesta no contiene datos válidos');
            }
    
            const data = pelData.body[0];
    
            
    
            // Llenar los campos del formulario con los datos obtenidos
            document.getElementById('tituloElim').value = data.titulo;
            document.getElementById('fechaEstrenoElim').value = data.fecha_estreno;
            //document.getElementById('imagenElim').value = data.imagen;
            document.getElementById('generoElim').value = data.genero_id;
            
            
    
        } catch (error) {
            alert('Error al buscar pelicula:', error);
        }
    });

/* **************************************************************************
                       FUNCION PARA ELIMINAR PELICULA
************************************************************************** */  
     

     const eliminarPelicula = document.getElementById('elimPelicula');

     eliminarPelicula.addEventListener('submit', async (event) => {
         event.preventDefault(); 
         
         const peliId = document.getElementById('idElimPel').value;
         try {
             const response = await fetch('/api/movies', {
                 method: 'PUT',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({ id: peliId })
             });
             if (response.ok) {
                 alert('Pelicula eliminada correctamente');
                 eliminarPelicula.reset();
                 seccElimPeli.style.display = 'none';
                 seccPeliculas.style.display = 'flex';
                 listarPeliculas();
             } else {
                 alert('Error al eliminar pelicula');
             }
         } catch (error) {
             alert('Error en la solicitud PUT:', error);
         }
     });

     

/* **************************************************************************
            FUNCION PARA BUSCAR DATOS PELICULA POR ID PARA ACTUALIZAR
************************************************************************** */  
    

const idActualizar = document.getElementById('buscarIdActualizar');

idActualizar.addEventListener('click', async (event) => {
    event.preventDefault();
    
    const pelIdString = document.getElementById('idActuali').value.trim();
    const pelId = parseInt(pelIdString, 10);

     //Validar que userId sea un número válido
    if (isNaN(pelId)) {
        alert('ID de pelicula no válido');
       return;
    }

    try {
        const response = await fetch(`/api/movies/${pelId}`);

        if (!response.ok) {
            throw new Error('Respuesta de la red negativa');
        }

        const pelData = await response.json();
        console.log(pelData); 
        
        
        // Validar la estructura de userData.body
        if (typeof pelData.body !== 'object' || pelData.body === null) {
            throw new Error('La respuesta no contiene datos válidos');
        }

        const data = pelData.body[0];

        

        // Llenar los campos del formulario con los datos obtenidos
        document.getElementById('tituloActuali').value = data.titulo;
        document.getElementById('fechaEstrenoActuali').value = data.fecha_estreno;
        document.getElementById('generoActuali').value = data.genero_id;
        //document.getElementById('imagenActuali').value = data.imagen;
        
        

    } catch (error) {
        alert('Error al buscar pelicula:'+ error);
    }
});

/* **************************************************************************
                  FUNCION PARA ACTUALIZAR PELICULA
************************************************************************** */
   
const actualizarPelicula = document.getElementById('actualizarPelicula');
actualizarPelicula.addEventListener('submit', async (event) => {
    event.preventDefault();

    const peliId = document.getElementById('idActuali').value;
    const titulo = document.getElementById('tituloActuali').value;
    const fechaEstreno = document.getElementById('fechaEstrenoActuali').value;
    const genero = document.getElementById('generoActuali').value;
    //const imagen = document.getElementById('imagenActuali').value;

    let requestBody = {
        id: peliId,
        titulo: titulo,
        fecha_estreno: fechaEstreno,
        genero_id: genero,
        //imagen: imagen
    };

    try {
        const response = await fetch('/api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            alert('Pelicula actualizada correctamente');
            actualizarPelicula.reset();
            seccModPeli.style.display = 'none';
            seccPeliculas.style.display = 'flex';
            listarPeliculas();
        } else {
            alert('Error al actualizar la Pelicula');
        }
    } catch (error) {
        alert('Error en la solicitud: ' + error.message);
    }
});

});