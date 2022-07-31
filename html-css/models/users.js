const Sequelize = require("sequelize");
const sequelize = require("../database/db.js");

const users = sequelize.define("users", {
    
    name:{
        type: Sequelize.STRING,
        require: true
    },
    
    email:{
        type: Sequelize.STRING,
        require: true,
    },

    car:{
        type:Sequelize.STRING,
        require: true
    },

    password:{
<<<<<<< HEAD
        type: Sequelize.STRING,
=======
        type: Sequelize.INTEGER,
>>>>>>> a3617b4bb7a2c4d044b7a76938b20b3de0067aad
        require:true
    }
})

//users.sync({ force: true });

module.exports = users;