const assert = require('node:assert/strict');
const test = require('node:test');

const moviesControllerFactory = require('../src/modulos/movies/controlador');
const generoControllerFactory = require('../src/modulos/genero/controlador');
const rolesControllerFactory = require('../src/modulos/roles/controlador');
const aclamadasControllerFactory = require('../src/modulos/aclamadas/controlador');

function createDbRecorder(expectedTable) {
  const calls = [];

  return {
    calls,
    todos: async (tabla) => {
      calls.push(['todos', tabla]);
      assert.equal(tabla, expectedTable);
      return [{ id: 1, nombre: 'Demo' }];
    },
    uno: async (tabla, id) => {
      calls.push(['uno', tabla, id]);
      assert.equal(tabla, expectedTable);
      return [{ id, nombre: 'Demo' }];
    },
    agregar: async (tabla, data) => {
      calls.push(['agregar', tabla, data]);
      assert.equal(tabla, expectedTable);
      return { insertId: data.id || 1, affectedRows: 1 };
    },
    eliminar: async (tabla, data) => {
      calls.push(['eliminar', tabla, data]);
      assert.equal(tabla, expectedTable);
      return { affectedRows: 1 };
    },
  };
}

const controllerCases = [
  ['movies', moviesControllerFactory],
  ['genero', generoControllerFactory],
  ['roles', rolesControllerFactory],
  ['aclamadas', aclamadasControllerFactory],
];

for (const [table, factory] of controllerCases) {
  test(`${table}: delega operaciones CRUD a la tabla correcta`, async () => {
    const db = createDbRecorder(table);
    const controller = factory(db);
    const payload = { id: 7, nombre: 'Registro demo' };

    assert.deepEqual(await controller.todos(), [{ id: 1, nombre: 'Demo' }]);
    assert.deepEqual(await controller.uno(7), [{ id: 7, nombre: 'Demo' }]);
    assert.deepEqual(await controller.agregar(payload), { insertId: 7, affectedRows: 1 });
    assert.deepEqual(await controller.eliminar({ id: 7 }), { affectedRows: 1 });

    assert.deepEqual(db.calls, [
      ['todos', table],
      ['uno', table, 7],
      ['agregar', table, payload],
      ['eliminar', table, { id: 7 }],
    ]);
  });
}
