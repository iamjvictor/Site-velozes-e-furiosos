const express = require("express");
const routes = require("./routes/routes")
const path = require("path");
const bodyParser = require('body-parser');
const connect = require("./database/db")
const model = require("./models/users")
const session = require('express-session')
const flash = require('connect-flash')
const app = express();


<<<<<<< HEAD

=======
>>>>>>> a3617b4bb7a2c4d044b7a76938b20b3de0067aad
//Section
app.use(session({
  secret:"meusitevf",
  resave: true,
  saveUninitialized: true,
}));

//Middleware

//Body Parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Sequelize
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server rodando na porta http://localhost:${port}`)
);

//Public
app.use(express.static(path.join(__dirname, "public")));



//Rotas
app.use(routes);



app.set("view engine", "ejs");









