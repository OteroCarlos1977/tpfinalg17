const assert = require('node:assert/strict');
const test = require('node:test');
const bcrypt = require('bcryptjs');

const authControllerFactory = require('../src/modulos/auth/controlador');
const auth = require('../src/auth');

test('login devuelve token JWT con credenciales validas', async () => {
  const passwordHash = await bcrypt.hash('admin123', 5);
  const db = {
    query: async (tabla, consulta) => {
      assert.equal(tabla, 'auth');
      assert.deepEqual(consulta, { usuario: 'admin' });

      return {
        id: 1,
        usuario: 'admin',
        password: passwordHash,
      };
    },
  };
  const controller = authControllerFactory(db);

  const token = await controller.login('admin', 'admin123');
  const req = { headers: { authorization: `Bearer ${token}` } };

  auth.chequearToken.confirmarToken(req);

  assert.equal(req.user.usuario, 'admin');
  assert.equal(req.user.id, 1);
});

test('login rechaza password invalida', async () => {
  const passwordHash = await bcrypt.hash('admin123', 5);
  const controller = authControllerFactory({
    query: async () => ({ id: 1, usuario: 'admin', password: passwordHash }),
  });

  await assert.rejects(
    () => controller.login('admin', 'incorrecta'),
    /Información Inválida/
  );
});

test('login rechaza usuario inexistente', async () => {
  const controller = authControllerFactory({
    query: async () => null,
  });

  await assert.rejects(
    () => controller.login('noexiste', 'admin123'),
    /Usuario no encontrado/
  );
});

test('agregar guarda password hasheada y no texto plano', async () => {
  let payload;
  const controller = authControllerFactory({
    agregar: async (tabla, data) => {
      payload = { tabla, data };
      return { affectedRows: 1 };
    },
  });

  await controller.agregar({ id: 2, usuario: 'user', password: 'user123' });

  assert.equal(payload.tabla, 'auth');
  assert.equal(payload.data.id, 2);
  assert.equal(payload.data.usuario, 'user');
  assert.notEqual(payload.data.password, 'user123');
  assert.equal(await bcrypt.compare('user123', payload.data.password), true);
});
