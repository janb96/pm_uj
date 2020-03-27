var sequelize = require('../connect.js');
var Sequelize = require('sequelize');
sequelize.sync();

let Subcategories = sequelize.define('Subcategories', {

    subcategoryID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    subcategoryName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    subcategoryImageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    subcategoryDescription: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [0, 500]
        }
    },
    categoryID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Categories',
            key: 'categoryID'
        }
    },
    dateOfCreation: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }

});

module.exports = Subcategories;