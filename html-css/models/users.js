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

        type: Sequelize.STRING,
        require:true
    }
})



//comments.sync({ force: true });

module.exports = users;