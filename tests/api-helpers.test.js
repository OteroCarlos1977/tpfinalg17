const assert = require('node:assert/strict');
const test = require('node:test');

const respuestas = require('../src/red/respuestas');
const crearError = require('../src/middleware/errors');
const auth = require('../src/auth');

function createResponseRecorder() {
  return {
    statusCode: null,
    payload: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    send(payload) {
      this.payload = payload;
      return this;
    },
  };
}

test('respuesta success mantiene formato uniforme', () => {
  const res = createResponseRecorder();

  respuestas.success({}, res, { ok: true }, 201);

  assert.equal(res.statusCode, 201);
  assert.deepEqual(res.payload, {
    error: false,
    status: 201,
    body: { ok: true },
  });
});

test('respuesta error mantiene formato uniforme', () => {
  const res = createResponseRecorder();

  respuestas.error({}, res, 'No autorizado', 401);

  assert.equal(res.statusCode, 401);
  assert.deepEqual(res.payload, {
    error: true,
    status: 401,
    body: 'No autorizado',
  });
});

test('helper de error adjunta statusCode cuando corresponde', () => {
  const error = crearError('Formato inválido', 401);

  assert.equal(error.message, 'Formato inválido');
  assert.equal(error.statusCode, 401);
});

test('chequeo de token rechaza cabecera ausente o formato invalido', () => {
  assert.throws(
    () => auth.chequearToken.confirmarToken({ headers: {} }),
    /No viene Token/
  );

  assert.throws(
    () => auth.chequearToken.confirmarToken({ headers: { authorization: 'token-suelto' } }),
    /Formato Inválido/
  );
});
