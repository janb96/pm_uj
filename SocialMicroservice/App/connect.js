var Sequelize = require('sequelize');
var sequelize = new Sequelize('YOUT DB NAME', 'YOUR USERNAME', 'YOUR PASSWORD', {
    host: 'YOUR HOST',
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
