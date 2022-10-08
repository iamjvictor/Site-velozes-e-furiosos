const localStrategy = require('passport-local').Strategy
const Sequelize = require ('sequelize')
const bcrypt = require('bcrypt');
const users = require("../models/users");

module.exports = function(passport){

passport.use(new localStrategy({usernameField:'email'}, (email, password, done) =>{

    users.findOne({where: {email: email}}).then((users) => {
        if(!users){
            return done(null, false, {message: "Esta conta não existe"})

        }
        bcrypt.compare(password, users.password, (erro, batem) => {
            if(batem){
                return done(null, users)
            }else{
                return done(null, false, {message:"senha incoreeta"})
            }
        })
    })


}))

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) =>{
    try {
        const user = users.findOne({where:{ id: id }} );
        done(null,user)
    
        
    } catch (err) {
        console.log(err)
        return done(err,null);
    }
    
})

}