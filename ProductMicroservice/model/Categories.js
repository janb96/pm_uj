var sequelize = require('../connect.js');
var Sequelize = require('sequelize');
let Subcategories = require('./Subcategories');
sequelize.sync();

let Categories = sequelize.define('Categories', {

    categoryID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    categoryName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    categoryImageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoryDescription: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [0, 500]
        }
    },
    categoryHtml: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    dateOfCreation: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }

});

Categories.hasMany(Subcategories);
module.exports = Categories;