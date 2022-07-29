const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  host: 'localhost',
  username: 'root',
  password: '250202joaov',
  database: 'usersvf',
  dialect: 'mysql',
  multipleStatements: true
});

sequelize.authenticate()
  .then(function () {
    console.log("MySQL conectado");
  })
  .catch(function (erro) {
    console.log("Falha na conexão" + erro);
  });

module.exports = sequelize