document.addEventListener('DOMContentLoaded', () => {

 

const movies = [{
  "id": 0,
  "titulo": "Inside Out 2",
  "ruta_poster": "/uploads/1719713539623.jpg",
  "fecha_estreno": "2024-06-11",
  "genero": "Infantil"
},
{
  "id": 0,
  "titulo": "Kingdom of the Planet of the Apes",
  "ruta_poster": "/uploads/1719713589585.jpg",
  "fecha_estreno": "2024-05-08",
  "Genero": "Ciencia Ficción"
},

{
  "id": 0,
  "titulo": "Sous la Seine",
  "ruta_poster": "/uploads/1719713621908.jpg",
  "fecha_estreno": "2024-06-05",
  "genero": "Thriller"
},
{
  "id": 0,
  "titulo": "Bad Boys: Ride or Die",
  "ruta_poster": "/uploads/1719713654439.jpg",
  "fecha_estreno": "2024-06-05",
  "genero": "Acción"
},
{
  "id": 0,
  "titulo": "Godzilla x Kong: The New Empire",
  "ruta_poster": "/uploads/1719713686010.jpg",
  "fecha_estreno": "2024-03-27",
  "genero": "Acción"
},
{
  "id": 0,
  "titulo": "Civil War",
  "ruta_poster": "/uploads/1719719902596.jpg",
  "fecha_estreno": "2024-04-10",
  "genero": "Drama"
},
{
  "id": 0,
  "titulo": "The Roundup: Punishment",
  "ruta_poster": "/uploads/1719713759332.jpg",
  "fecha_estreno": "2023-05-31",
  "genero": "Acción"
},
{
  "id": 0,
  "titulo": "The Last Kumite",
  "ruta_poster": "/uploads/1719713845557.jpg",
  "fecha_estreno": "2024-05-09",
  "genero": "Acción"
},
{
  "id": 0,
  "titulo": "IF",
  "ruta_poster": "/uploads/1719713896230.jpg",
  "fecha_estreno": "2024-05-30",
  "genero": "Fantasía"
},
{
  "id": 0,
  "titulo": "Atlas",
  "ruta_poster": "/uploads/1719713930146.jpg",
  "fecha_estreno": "2024-05-23",
  "genero": "Ciencia Ficción"
},
{
  "id": 0,
  "titulo": "The Watchers",
  "ruta_poster": "/uploads/1719713964903.jpg",
  "fecha_estreno": "2024-06-06",
  "genero": "Terror"
},
{
  "id": 0,
  "titulo": "Alienoid: Return to the Future",
  "ruta_poster": "/uploads/1719713995627.jpg",
  "fecha_estreno": "2024-01-10",
  "genero": "Ciencia Ficción"
},
{
  "id": 0,
  "titulo": "Kung Fu Panda 4",
  "ruta_poster": "/uploads/1719714030033.jpg",
  "fecha_estreno": "2024-03-02",
  "genero": "Animación"
},
{
  "id": 0,
  "titulo": "Tarot",
  "ruta_poster": "/uploads/1719714070478.jpg",
  "fecha_estreno": "2024-05-01",
  "genero": "Terror"
},
{
  "id": 0,
  "titulo": "The Fall Guy",
  "ruta_poster": "/uploads/1719714124645.jpg",
  "fecha_estreno": "2024-04-24",
  "Genero": "Acción"
},
{
  "id": 0,
  "titulo": "Oppenheimer",
  "ruta_poster": "/uploads/1719714159234.jpg",
  "fecha_estreno": "2023-07-19",
  "genero": "Drama"
},
{
  "id": 0,
  "titulo": "Bad Boys for Life",
  "ruta_poster": "/uploads/1719714187812.jpg",
  "fecha_estreno": "2020-01-15",
  "genero": "Acción"
},
{
  "id": 0,
  "titulo": "Battle Over Britain",
  "ruta_poster": "/uploads/1719714224413.jpg",
  "fecha_estreno": "2023-12-01",
  "genero": "Bélico"
},
{
  "id": 0,
  "titulo": "Dune: Part Two",
  "ruta_poster": "/uploads/1719714252699.jpg",
  "fecha_estreno": "2024-02-27",
  "genero": "Ciencia Ficción"
},
{
  "id": 0,
  "titulo": "Inside Out",
  "ruta_poster": "/uploads/1719714288792.jpg",
  "fecha_estreno": "2015-06-17",
  "genero": "Animación"
}
];
// Función para cargar películas en la cuadrícula de tendencias
/*const cargarPeliculasTendencia = async () => {
    try {
        // Realizamos una petición fetch a la API para obtener las películas populares
        const response = await fetch(API_REST + 'movies');
        
        if (!response.ok) {
            throw new Error('Respuesta de la red negativa');
        }
        const data = await response.json();
        console.log(data);
        if (!Array.isArray(data.body)) {
            throw new Error('Se esperaba que data.body fuera un array pero se obtuvo ' + typeof data.body);
        }

        return data.body;
    } catch (error) {
        console.error('Error al cargar las películas de tendencia:', error);
        return [];
    }
};*/

const mostrarPeliculasTendencia = async () => {
    //const movies = await cargarPeliculasTendencia();
    const tendenciasContainer = document.querySelector('.peliculasTendencia .peliculas'); 
    tendenciasContainer.innerHTML = ''; 

    movies.forEach(movie => {
        // creo el ancla
        const ancla = document.createElement('a');
        ancla.href = './pages/detalle.html';
        // creo el div pelicula
        const pelicula = document.createElement('div');
        pelicula.classList.add('pelicula');
        // creo la imagen
        const img = document.createElement('img');
        img.classList.add('imgTendencia');
        img.src = movie.ruta_poster;
        img.alt = movie.titulo;
        img.loading = 'lazy';
        // creo el div tituloPelicula
        const tituloPelicula = document.createElement('div');
        tituloPelicula.classList.add('tituloPelicula');
        // creo el h4
        const titulo = document.createElement('h4');
        titulo.textContent = movie.titulo;
        // relaciono los elementos
        ancla.appendChild(pelicula);
        pelicula.appendChild(img);
        pelicula.appendChild(tituloPelicula);
        tituloPelicula.appendChild(titulo);
        tendenciasContainer.appendChild(ancla);
    });
};

// Llamamos a la función para mostrar las películas de tendencia



// Función para cargar películas en el carrusel de películas aclamadas
/*const cargarPeliculasAclamadas = async () => {
    try {
        // Realizamos una petición fetch a la API para obtener las películas populares
        const response = await fetch(API_REST + 'aclamadas');
        
        if (!response.ok) {
            throw new Error('Respuesta de la red negativa');
        }
        const data = await response.json();
        console.log(data);
        if (!Array.isArray(data.body)) {
            throw new Error('Se esperaba que data.body fuera un array pero se obtuvo ' + typeof data.body);
        }

        return data.body;
    } catch (error) {
        console.error('Error al cargar las películas de tendencia:', error);
        return [];
    }
    
    
};*/

const mostrarPeliculasAclamadas = async () => {
  try {
      // Hacer el fetch a la URL
      const response = await fetch('/api/aclamadas');
      
      // Verificar si la respuesta es exitosa
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      
       // Convertir la respuesta a JSON
       const data = await response.json();
        
       // Acceder a las peliculas aclamadas en el body
       const aclamadas = data.body; 
      
      // Seleccionar el contenedor
      const aclamadasContainer = document.querySelector('.peliculasAclamadas .aclamadas'); 
      aclamadasContainer.innerHTML = ''; 
      
      // Iterar sobre las peliculas aclamadas y crear los elementos
      aclamadas.forEach(aclamada => {
          // Crear el div peliculaItem
          const peliculaItem = document.createElement('div');
          peliculaItem.classList.add('peliculaItem');
          
          // Crear la imagen
          const img = document.createElement('img');
          img.classList.add('imgAclamada');
          img.src = aclamada.imagen;
          img.alt = aclamada.titulo;
          img.loading = 'lazy';
          
          // Relacionar los elementos
          peliculaItem.appendChild(img);
          aclamadasContainer.appendChild(peliculaItem);
      });
  } catch (error) {
      console.error('Error fetching the acclaimed movies:', error);
  }
};

mostrarPeliculasAclamadas();

mostrarPeliculasTendencia();

document.getElementById('cerrarSesion').addEventListener('click', function(event) {
  event.preventDefault(); // Previene el comportamiento por defecto del enlace

  // Limpiar el cache (esto puede ser limitado según el navegador)
  if ('caches' in window) {
      caches.keys().then(function(keyList) {
          return Promise.all(keyList.map(function(key) {
              return caches.delete(key);
          }));
      });
  }

  // Borrar el localStorage
  localStorage.clear();

  // Redirigir a la página de inicio de sesión
  window.location.href = '../index.html';
});
 
});
