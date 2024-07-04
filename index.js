//Importar desd app.js.

const app = require('./src/app');

//Inicializar el servidor
app.listen(app.get('port'), () => {
  console.log('Servidor corriendo en el puerto', app.get('port'));
});