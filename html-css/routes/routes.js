const routes = require("express").Router();
const controller = require("../controller/controller")

routes.get("/", controller.getPage );
routes.get("/fotosvf.ejs", controller.getPic);
routes.get("/homenagem.ejs", controller.getHom);
routes.get("/community.ejs", controller.getCom);
routes.get("/register.ejs", controller.getRegister);
<<<<<<< HEAD
routes.post("/register", controller.sendRegister);
routes.post("/login", controller.sendLogin);
=======
>>>>>>> a3617b4bb7a2c4d044b7a76938b20b3de0067aad



module.exports = routes ;