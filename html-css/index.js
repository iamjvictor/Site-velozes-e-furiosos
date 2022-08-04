const express = require("express");
const routes = require("./routes/routes")
const path = require("path");
const bodyParser = require('body-parser');
const connect = require("./database/db")
const model = require("./models/users")
const session = require('express-session');
const app = express();
const passport = require("passport")
require ("./config/auth")(passport)
const flash = require('connect-flash');


//Section
app.use(session({
  secret:"meusitevf",
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 2 * 60 * 1000}
}));

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//Middleware
app.use((req,res,next)=> {
  res.locals.user = req.user || null;
  
  next()
})


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












