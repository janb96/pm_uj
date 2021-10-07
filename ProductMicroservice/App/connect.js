var Sequelize = require('sequelize');
var sequelize = new Sequelize('YOUR DB NAME', 'YOUR DB USER', 'YOUR PASSWORD', {
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
