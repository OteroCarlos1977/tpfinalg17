# Catalogo De Peliculas CRUD

Aplicacion full stack academica para administrar un catalogo de peliculas. Incluye frontend HTML/CSS/JavaScript, backend con Express, autenticacion JWT, carga de imagenes y persistencia SQLite con datos demo sanitizados.

Demo: https://tpfinalg17.vercel.app/

## Objetivo

El proyecto permite mostrar un flujo CRUD completo sin depender de credenciales externas. Originalmente usaba una base remota; actualmente esta migrado a SQLite para que pueda ejecutarse localmente y desplegarse como demo.

## Funcionalidades

- Landing publica con acceso a registro e inicio de sesion.
- Vista de usuario para explorar peliculas.
- Login con JWT.
- CRUD de peliculas.
- CRUD de usuarios.
- Administracion de generos y roles.
- Carga de imagenes con Multer.
- Passwords hasheadas con bcrypt.
- Base SQLite inicializada automaticamente.
- Datos demo sanitizados para evitar informacion personal real.

## Tecnologias

- Node.js
- Express
- SQLite
- better-sqlite3
- bcryptjs
- JSON Web Token
- Multer
- dotenv
- HTML
- CSS
- JavaScript

## Instalacion

```bash
npm install
```

## Ejecucion Local

```bash
npm run dev
```

La aplicacion queda disponible en:

```text
http://localhost:3000
```

Para produccion:

```bash
npm start
```

## Usuarios Demo

Administrador:

```text
Usuario: admin
Password: admin123
```

Usuario comun:

```text
Usuario: usuario
Password: usuario123
```

## Base De Datos

El proyecto no necesita MySQL para correr. Al iniciar, crea `database/tp_final.sqlite` a partir de `database/schema.sql` si el archivo SQLite no existe.

El archivo SQLite generado se ignora en Git. La fuente versionada es `database/schema.sql`, que incluye estructura y datos demo.

## Variables De Entorno

Crear `.env` desde `.env.example`:

```env
PORT=3000
JWT_SECRET=change_this_secret
```

No usar el valor demo de `JWT_SECRET` en produccion.

## Deploy

En Vercel la escritura en SQLite es temporal. La demo sirve para mostrar el flujo funcional, pero los cambios no deben considerarse persistencia permanente.

Para una persistencia real se recomienda migrar a Turso/libSQL, Supabase, Railway, Render o una base administrada equivalente.

## Estructura

```text
database/
  schema.sql            Estructura y datos demo
src/
  modulos/              Modulos backend: auth, usuarios, peliculas, roles, generos
public/
  index.html            Landing publica
  administrar.html      Panel CRUD
  js/                   Logica frontend
  css/                  Estilos
```

## Seguridad Y Notas

- No versionar `.env`.
- Las contrasenas demo estan hasheadas en la base inicial.
- Las credenciales publicadas son solo para presentacion.
- La demo academica no reemplaza controles productivos como rate limiting, refresh tokens o auditoria.
