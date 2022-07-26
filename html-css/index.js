const express = require("express");
const routes = require("./routes/routes")
const path = require("path");
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(routes);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.set("view engine", "ejs");
app.listen(port, () =>
  console.log(`Server rodando na porta http://localhost:${port}`)
);





