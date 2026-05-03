# Catalogo de Peliculas CRUD

Aplicacion full stack academica para administrar un catalogo de peliculas. Incluye frontend HTML/CSS/JavaScript, backend con Express, autenticacion JWT, carga de imagenes y persistencia SQLite con datos demo.

## Caracteristicas

- Listado de peliculas y peliculas aclamadas.
- CRUD de peliculas, generos, roles y usuarios.
- Login con JWT.
- Carga de imagenes con Multer.
- Base SQLite inicializada automaticamente desde `database/schema.sql`.
- Datos demo sanitizados para evitar credenciales o emails reales.

## Tecnologias

- Node.js
- Express
- SQLite
- better-sqlite3
- bcryptjs
- JWT
- Multer
- HTML, CSS y JavaScript

## Uso Local

```bash
npm install
npm run dev
```

La aplicacion queda disponible en:

```text
http://localhost:3000
```

## Usuarios Demo

```text
Usuario: admin
Password: admin123

Usuario: usuario
Password: usuario123
```

## Base De Datos

El proyecto no necesita MySQL para correr. Al iniciar, crea `database/tp_final.sqlite` a partir de `database/schema.sql` si el archivo SQLite no existe.

El archivo SQLite generado se ignora en Git. La fuente versionada es el schema con datos demo.

## Variables De Entorno

```text
PORT=3000
JWT_SECRET=change_this_secret
```

En Vercel, la escritura SQLite es temporal. Sirve para una demo funcional, pero los cambios no deben considerarse persistencia permanente.
