let mongoose = require('mongoose');
const Announcements = new mongoose.Schema({
    announcementTitle: {
        type: String,
        required: true
    },
    announcementDescription: {
        type: String,
        required: true
    },
    announcementPrice: {
        type: Number,
        required: true
    },
    userID: {
        type: Number,
        required: true
    },
    categoryID: {
        type: Number,
        required: true
    },
    subcategoryID: {
        type: Number,
        required: true
    },
    photoUrlArray: {
        required: false
    },
    dateOfCreation: {
        type: Date,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    condition: {
      type: String
    },
    numberOfViews: {
        type: Number,
        default: 0
    }
});

mongoose.model('Announcements', Announcements);

module.exports = mongoose.model('Announcements');