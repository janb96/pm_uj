var sequelize = require('../connect.js');
var Sequelize = require('sequelize');
sequelize.sync();

let Microservice = sequelize.define('Microservice', {

    microserviceID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

});

module.exports = Microservice;