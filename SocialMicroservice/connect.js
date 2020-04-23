var Sequelize = require('sequelize');
var sequelize = new Sequelize('pm_uj', 'jb96', 'Rabarbar123', {
    host: 'pm-uj.database.windows.net',
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