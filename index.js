const app = require('./src/app');

if (require.main === module) {
  app.listen(app.get('port'), () => {
    console.log('Servidor corriendo en el puerto', app.get('port'));
  });
}

module.exports = app;
