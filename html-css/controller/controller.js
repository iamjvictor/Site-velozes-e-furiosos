const users = require("../models/users");
const bcrypt = require('bcrypt');

let message = "";
let type= "";
//Rotas
const getPage = async (req, res) => {
    return res.render("../views/index", {message, type})
}

const getPic = async (req,res) => {
    return res.render("../views/fotosvf.ejs")
}

const getHom = async (req,res) => {
    return res.render("../views/homenagem.ejs")
}

const getCom = async (req,res) => {
    return res.render("../views/community.ejs")
}

const getRegister = async (req, res) => {
    message = ""
    return res.render("../views/register.ejs", {message, type})
}
// Sign up/ Sign in

const sendRegister = async (req,res) =>{
try {
    const hashPass = await bcrypt.hash(req.body.password,10);   
    const regUser = {name: req.body.name, password: (hashPass), email: req.body.email, car: req.body.car};    
    const oldUser = await users.findOne({ where: { email: req.body.email } });
    console.log(oldUser)
        if(oldUser == null){
            await users.create(regUser);                     
            message= "Account created";
            type= "success";
            console.log(message);
            return res.redirect("/");
        }else{
            message= "this email already exists";
            type= "email exists"
            console.log(message);
            return res.render("register", {message,type});

        }
} catch (err) {
    res.status(500).send({ error: err.message });
}
};

const sendLogin = async(req,res) =>{
    //continuar esse controller
    res.redirect("/")
}

    

 


module.exports = {
    getPage,
    getPic,
    getHom,
    getCom,
    getRegister,
    sendRegister,
    sendLogin,
}