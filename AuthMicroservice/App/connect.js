var Sequelize = require('sequelize');
var sequelize = new Sequelize('YOUR DB NAME', 'YOUR USERNAME', 'YOUR PASSWORD', {
    host: 'YOUR DB HOST',
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
