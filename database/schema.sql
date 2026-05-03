DROP TABLE IF EXISTS aclamadas;
DROP TABLE IF EXISTS auth;
DROP TABLE IF EXISTS genero;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE aclamadas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  imagen TEXT NOT NULL,
  genero_id INTEGER NOT NULL
);

CREATE TABLE auth (
  id INTEGER PRIMARY KEY,
  usuario TEXT NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE genero (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  genero TEXT NOT NULL
);

CREATE TABLE movies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  fecha_estreno TEXT NOT NULL,
  genero_id INTEGER
);

CREATE TABLE roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  rol TEXT
);

CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  apellido TEXT NOT NULL,
  email TEXT NOT NULL,
  rol_id INTEGER NOT NULL
);

INSERT INTO genero (id, genero) VALUES
(1, 'Accion'),
(2, 'Animacion'),
(3, 'Belica'),
(4, 'Biografica'),
(5, 'Ciencia Ficcion'),
(6, 'Comedia'),
(7, 'Documental'),
(8, 'Drama'),
(9, 'Romance'),
(10, 'Suspenso'),
(11, 'Terror'),
(12, 'Western');

INSERT INTO roles (id, rol) VALUES
(1, 'admin'),
(2, 'usuario');

INSERT INTO usuarios (id, nombre, apellido, email, rol_id) VALUES
(1, 'Admin', 'Demo', 'admin.demo@example.com', 1),
(2, 'Usuario', 'Demo', 'usuario.demo@example.com', 2);

INSERT INTO auth (id, usuario, password) VALUES
(1, 'admin', '$2b$05$YdaIrbQb82EABsXkPeSxqe0MWEX0xKJ6aTsRGR4Gu7zmkqChYrjGK'),
(2, 'usuario', '$2b$05$xspmkY67z7EN4gQ4kD1PGekmz8OzWRwn948w/bh.MgZBVljCbvtBu');

INSERT INTO movies (id, titulo, fecha_estreno, genero_id) VALUES
(1, 'Inside Out 2', '2024-05-12', 2),
(2, 'Kingdom of the Planet of the Apes', '2024-05-08', 5);

INSERT INTO aclamadas (id, titulo, imagen, genero_id) VALUES
(1, 'Sueno de Fuga', '/img/aclamada_1.jpg', 8),
(2, 'El Padrino', '/img/aclamada_2.jpg', 8),
(3, 'El Padrino: Parte II', '/img/aclamada_3.jpg', 8),
(4, 'La Lista de Schindler', '/img/aclamada_4.jpg', 8),
(5, '12 Hombres en Pugna', '/img/aclamada_5.jpg', 8),
(6, 'Dilwale Dulhania Le Jayenge', '/img/aclamada_6.jpg', 8),
(7, 'El Viaje de Chihiro', '/img/aclamada_7.jpg', 2),
(8, 'El Caballero de la Noche', '/img/aclamada_8.jpg', 1),
(9, 'Parasitos', '/img/aclamada_9.jpg', 5),
(10, 'The Green Mile', '/img/aclamada_10.jpg', 8),
(11, 'Tu Nombre.', '/img/aclamada_11.jpg', 8),
(12, 'Pulp Fiction', '/img/aclamada_12.jpg', 1),
(13, 'El Senor de los Anillos', '/img/aclamada_13.jpg', 5),
(14, 'Forrest Gump', '/img/aclamada_14.jpg', 8),
(15, 'El Bueno, el Malo y el Feo', '/img/aclamada_15.jpg', 12),
(16, 'Buenos Muchachos', '/img/aclamada_16.jpg', 8),
(17, 'La Tumba de las Luciernagas', '/img/aclamada_17.jpg', 8),
(18, 'Los Siete Samurais', '/img/aclamada_18.jpg', 8),
(19, 'Cinema Paradiso', '/img/aclamada_19.jpg', 8),
(20, 'La Vida es Bella', '/img/aclamada_20.jpg', 8);
