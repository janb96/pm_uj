var sequelize = require('../connect.js');
var Sequelize = require('sequelize');
sequelize.sync();

let User = sequelize.define('User', {

    userID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    emailHash: Sequelize.STRING,
    emailCrypto: Sequelize.STRING,
    password: Sequelize.STRING

});

module.exports = User;