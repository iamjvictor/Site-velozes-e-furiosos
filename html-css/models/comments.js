const Sequelize = require("sequelize");
const sequelize = require("../database/db.js");

const comments = sequelize.define("comments",{
    name:{
        type: Sequelize.STRING,
        require: true,
    },

    comment:{
        type: Sequelize.STRING,
        require:true,
    }
})

//comments.sync({ force: true });

module.exports= comments;