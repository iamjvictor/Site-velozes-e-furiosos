const users = require("../models/users");
const comments = require("../models/comments")
const bcrypt = require('bcrypt');
const passport = require("passport");
const nodemailer = require("nodemailer");



let message = "";
let type= "";
let transporter = nodemailer.createTransport({
    host: "smtp.umbler.com",
    port: 587,
    user:"meusitevf@carloversvf.com",
    pass:"250202joaov#",
    
});


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
    const thisUser = req.session.passport.user   
    const userName = await users.findOne({where: {id: thisUser}})
    return res.render("../views/community.ejs", {commentsList, userName}) 
}

const getRegister = async (req, res) => {
    if(req.query.fail){
        type="invalid"
        message="email ou senha invalidos"
        return res.render("../views/register.ejs", {message, type})
    }else{
        return res.render("../views/register.ejs", {message, type})
    }    
}

// Sign up/ Sign in

const sendRegister = async (req,res) =>{ 
    try {
        const hashPass = await bcrypt.hash(req.body.password,10);   
        const regUser = {name: req.body.name, password: (hashPass), email: req.body.email, car: req.body.car};    
        const oldUser = await users.findOne({ where: { email: req.body.email } });
        console.log(oldUser)
            if(oldUser == null ){
                if(req.body.password == req.body.password2){
                    await users.create(regUser);                     
                    message= "Account created";
                    type= "success";
                    sendEmail(regUser.email)
                    return res.render("index", {message,type});
                }else{
                    message="Your password is wrong"
                    type="wrong password"
                    return res.render("register", {message,type});
                }
                    
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
        failureRedirect: "/register.ejs?fail=true",            
    })(req,res, next)
}

const logout = async(req,res) =>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    })    
}

function sendEmail (user){
    transporter.sendMail({
        from:"meusitevf@carloversvf.com",
        to:user,
        subject:"Bem vindo a comunidade car lovers !",
        text:"Olá, sou o joão Victor e gostaria de te agradecer por ter criado a sua conta, está é uma aplicação web no qual criei para me aperfeiçoar em habilidades como Node.js, Express, API, Mysql, entre outras ferramentas. ",
        html:"Se puder me acompanhar no <a href='https://www.linkedin.com/in/joaov-10/'>Linkedin<a/>"
    })
    console.log("Email enviado para ", user)
}
const sendComment = async(req,res) =>{
    const thisUser = req.session.passport.user   
    const userName = await users.findOne({where: {id: thisUser}})
    const com = {name: userName.name, comment : req.body.comments};
    try {
        await comments.create(com);        
        return res.redirect("/community.ejs")
    } catch (err) {
        res.status(500).send({ error: err.message });
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

//Welcome email



    



 


module.exports = {
    getPage,
    getPic,
    getHom,
    getCom,
    getRegister,
    sendRegister,
    sendLogin,
    auth,
    sendComment,
    logout

}