const users = require("../models/users");
const comments = require("../models/comments")
const bcrypt = require('bcrypt');
const passport = require("passport");



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
    const commentsList= await  comments.findAll({});   
    
    return res.render("../views/community.ejs", {commentsList}) 
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
                return res.render("index", {message,type});
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
    
const sendLogin = async(req,res, next) =>{
    
    passport.authenticate("local", {
        successRedirect: "/community.ejs",
        failureRedirect: "/register.ejs",
        
    })(req,res, next)
}

const sendComment = async(req,res) =>{
    const thisUser = req.session.passport.user   
    const userName = await users.findOne({where: {id: thisUser}})
    const com = {name: userName.name, comment : req.body.comments};
    try {
        await comments.create(com);        
        return res.redirect("/community.ejs")
    } catch (error) {
        
    }


}

//authenticate

function auth(req,res,next){
    if(req.isAuthenticated()){
        return next();
    };
    message="";
    res.render('register', {message,type})
}


    



 


module.exports = {
    getPage,
    getPic,
    getHom,
    getCom,
    getRegister,
    sendRegister,
    sendLogin,
    auth,
    sendComment

}