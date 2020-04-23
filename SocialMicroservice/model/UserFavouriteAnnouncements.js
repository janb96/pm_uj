var sequelize = require('../connect.js');
var Sequelize = require('sequelize');
sequelize.sync();

let UserFavouriteAnnouncements = sequelize.define('UserFavouriteAnnouncements', {

    UserFavouriteAnnouncementsID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    announcementID: {
        type: Sequelize.STRING,
        allowNull: false
    }

},{
    uniqueKeys: {
        actions_unique: {
            fields: ['userID', 'announcementID']
        }
    }
});

module.exports = UserFavouriteAnnouncements;