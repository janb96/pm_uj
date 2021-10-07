var sequelize = require('../connect.js');
var Sequelize = require('sequelize');
sequelize.sync();

let User = sequelize.define('User', {

    userID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    emailHash: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    emailCrypto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    agreement1: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    agreement2: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    agreement3: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    dateOfRegistration: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    dateOfConfirmation: {
        type: Sequelize.DATE,
        allowNull: true
    }

});

module.exports = User;