const assert = require('node:assert/strict');
const test = require('node:test');

const usuariosControllerFactory = require('../src/modulos/usuarios/controlador');

function createAuthMock() {
  return {
    todos: async () => [
      { id: 1, usuario: 'admin' },
      { id: 2, usuario: 'user' },
    ],
    uno: async (id) => (id === 1 ? { id, usuario: 'admin' } : null),
    agregar: async (data) => ({ authInsertada: data }),
    eliminar: async (data) => ({ authEliminada: data.id }),
  };
}

test('usuarios.todos combina datos de usuario con credenciales sin exponer dependencia real', async () => {
  const db = {
    todos: async (tabla) => {
      assert.equal(tabla, 'usuarios');
      return [
        { id: 1, nombre: 'Admin', apellido: 'Demo', email: 'admin@example.com' },
        { id: 2, nombre: 'User', apellido: 'Demo', email: 'user@example.com' },
      ];
    },
  };
  const controller = usuariosControllerFactory(db, createAuthMock());

  assert.deepEqual(await controller.todos(), [
    {
      id: 1,
      nombre: 'Admin',
      apellido: 'Demo',
      email: 'admin@example.com',
      usuario: 'admin',
      password: undefined,
    },
    {
      id: 2,
      nombre: 'User',
      apellido: 'Demo',
      email: 'user@example.com',
      usuario: 'user',
      password: undefined,
    },
  ]);
});

test('usuarios.uno devuelve datos del usuario con nombre de usuario asociado', async () => {
  const db = {
    uno: async (tabla, id) => {
      assert.equal(tabla, 'usuarios');
      assert.equal(id, 1);
      return [{ id: 1, nombre: 'Admin', apellido: 'Demo', email: 'admin@example.com' }];
    },
  };
  const controller = usuariosControllerFactory(db, createAuthMock());

  assert.deepEqual(await controller.uno(1), [
    {
      id: 1,
      nombre: 'Admin',
      apellido: 'Demo',
      email: 'admin@example.com',
      usuario: 'admin',
    },
  ]);
});

test('usuarios.agregar crea usuario y auth usando insertId cuando es alta nueva', async () => {
  let usuarioInsertado;
  const db = {
    agregar: async (tabla, data) => {
      assert.equal(tabla, 'usuarios');
      usuarioInsertado = data;
      return { insertId: 12, affectedRows: 1 };
    },
  };
  const auth = createAuthMock();
  const controller = usuariosControllerFactory(db, auth);
  const result = await controller.agregar({
    id: 0,
    nombre: 'Nuevo',
    apellido: 'Usuario',
    email: 'nuevo@example.com',
    rol_id: 2,
    usuario: 'nuevo',
    password: 'clave',
  });

  assert.deepEqual(usuarioInsertado, {
    id: 0,
    nombre: 'Nuevo',
    apellido: 'Usuario',
    email: 'nuevo@example.com',
    rol_id: 2,
  });
  assert.deepEqual(result, {
    authInsertada: {
      id: 12,
      usuario: 'nuevo',
      password: 'clave',
    },
  });
});

test('usuarios.eliminar elimina primero auth y luego usuario', async () => {
  const llamadas = [];
  const db = {
    eliminar: async (tabla, data) => {
      llamadas.push(['usuarios', tabla, data.id]);
      return { affectedRows: 1 };
    },
  };
  const auth = {
    ...createAuthMock(),
    eliminar: async (data) => {
      llamadas.push(['auth', data.id]);
      return { affectedRows: 1 };
    },
  };
  const controller = usuariosControllerFactory(db, auth);

  assert.deepEqual(await controller.eliminar({ id: 5 }), {
    auth: { affectedRows: 1 },
    usuario: { affectedRows: 1 },
  });
  assert.deepEqual(llamadas, [
    ['auth', 5],
    ['usuarios', 'usuarios', 5],
  ]);
});
