var Sequelize = require('sequelize');
var sequelize = new Sequelize('DB NAME', 'USER', 'PWD', {
    host: 'DB',
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    dialectOptions: {
        options: {
            encrypt: true
        }
    }
});

module.exports = sequelize;