const Sequelize = require('sequelize')

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_ROOT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
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