const fs = require('fs');
const os = require('os');
const path = require('path');
const Database = require('better-sqlite3');

const schemaPath = path.join(__dirname, '..', '..', 'database', 'schema.sql');
const localDbPath = path.join(__dirname, '..', '..', 'database', 'tp_final.sqlite');
const runtimeDbPath = process.env.VERCEL
  ? path.join(os.tmpdir(), 'tp_final.sqlite')
  : localDbPath;

fs.mkdirSync(path.dirname(runtimeDbPath), { recursive: true });

const shouldInitialize = !fs.existsSync(runtimeDbPath);
const db = new Database(runtimeDbPath);

if (shouldInitialize) {
  db.exec(fs.readFileSync(schemaPath, 'utf8'));
}

const tables = new Set(['aclamadas', 'auth', 'genero', 'movies', 'roles', 'usuarios']);

function assertTable(tabla) {
  if (!tables.has(tabla)) {
    throw new Error(`Tabla no permitida: ${tabla}`);
  }
}

function cleanData(data) {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined && value !== null && value !== '')
  );
}

function todos(tabla) {
  assertTable(tabla);
  return Promise.resolve(db.prepare(`SELECT * FROM ${tabla}`).all());
}

function uno(tabla, id) {
  assertTable(tabla);
  return Promise.resolve(db.prepare(`SELECT * FROM ${tabla} WHERE id = ?`).all(id));
}

function agregar(tabla, data) {
  assertTable(tabla);
  const payload = cleanData(data);

  if (Number(payload.id) === 0) {
    delete payload.id;
  }

  const columns = Object.keys(payload);
  const placeholders = columns.map(() => '?').join(', ');
  const updates = columns
    .filter((column) => column !== 'id')
    .map((column) => `${column} = excluded.${column}`)
    .join(', ');
  const conflict = updates ? ` ON CONFLICT(id) DO UPDATE SET ${updates}` : '';

  const statement = db.prepare(
    `INSERT INTO ${tabla} (${columns.join(', ')}) VALUES (${placeholders})${conflict}`
  );
  const result = statement.run(...columns.map((column) => payload[column]));

  return Promise.resolve({
    insertId: Number(result.lastInsertRowid),
    affectedRows: result.changes,
  });
}

function eliminar(tabla, data) {
  assertTable(tabla);
  const result = db.prepare(`DELETE FROM ${tabla} WHERE id = ?`).run(data.id);
  return Promise.resolve({ affectedRows: result.changes });
}

function query(tabla, consulta) {
  assertTable(tabla);
  const entries = Object.entries(cleanData(consulta));
  const where = entries.map(([column]) => `${column} = ?`).join(' AND ');
  const values = entries.map(([, value]) => value);
  const result = db.prepare(`SELECT * FROM ${tabla} WHERE ${where}`).get(...values);
  return Promise.resolve(result || null);
}

module.exports = {
  todos,
  uno,
  agregar,
  eliminar,
  query,
};
