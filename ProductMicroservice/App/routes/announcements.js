let express = require('express');
let router = express.Router();

//ADDITIONAL LIBS
let moment = require('moment');

//UTILS
let LoginGuard = require("../utils/LoginGuard");
let QueryMaker = require("../utils/QueryMaker");
let SkipMaker = require("../utils/SkipMaker");
let OrderMaker = require("../utils/OrderMaker");
let LimitMaker = require("../utils/LimitMaker");
let AnnouncementResponse = require("../utils/AnnouncementResponse");
let SendToEmailMicroservice = require("../utils/SendToEmailMicroservice");

//MODELS
let categories = require("./../model/Categories");
let subcategories = require("./../model/Subcategories");
let users = require("./../model/User");
let announcements = require("./../model/Announcements");

router.get('/', async function(req, res, next) {

    function mongoCallback(err, announcements) {
        if(err){
            res.status(200);
            res.send(new AnnouncementResponse(false, "Something gone wrong ;("));
            return;
        }
        res.status(200);
        res.send(new AnnouncementResponse(true, announcements));
    }

    announcements.find().exec(mongoCallback);

});

router.post('/', LoginGuard, async function(req, res, next) {

    //GET DATA FROM TOKEN
    let userID = req.token.userID;
    let emailPlain = req.token.emailPlain;
    let emailHash = req.token.emailHash;

    //GET DATA FROM BODY
    let announcementTitle = req.body.announcementTitle;
    let announcementDescription = req.body.announcementDescription;
    let announcementPrice = req.body.announcementPrice;
    let photoUrlArray = req.body.photoUrlArray;
    let pdfFiles = req.body.pdfFiles;
    let categoryID = req.body.categoryID;
    let subcategoryID = req.body.subcategoryID;
    let condition = req.body.condition;

    //GENERATE EXPIRATION DATE (1 MONTH)
    let expirationDate = moment().add(1, "month");

    //VALIDATE categoryID
    let dbCategory = await categories.findOne({
        where: {
            categoryID: categoryID
        }
    }).catch( err => {
        res.status(200);
        res.send(new AnnouncementResponse(false, "Something gone wrong ;("));
        return;
    });

    if(!dbCategory){
        res.status(200);
        res.send(new AnnouncementResponse(false, "The specified category does not exist"));
        return;
    }

    //VALIDATE subcategoryID
    let dbSubcategory = await subcategories.findOne({
        where: {
            subcategoryID: subcategoryID
        }
    }).catch( err => {
        res.status(200);
        res.send(new AnnouncementResponse(false, "Something gone wrong ;("));
        return;
    });

    if(!dbSubcategory){
        res.status(200);
        res.send(new AnnouncementResponse(false, "The specified subcategory does not exist"));
        return;
    }

    if(photoUrlArray.length == 0) {
        photoUrlArray.push("no-picture.jpg");
    }

    const announcement = {
        announcementTitle: announcementTitle,
        announcementDescription: announcementDescription,
        announcementPrice: announcementPrice,
        userID: userID,
        emailHash: emailHash,
        categoryID: categoryID,
        subcategoryID: subcategoryID,
        photoUrlArray: photoUrlArray,
        pdfFiles: pdfFiles,
        expirationDate: expirationDate,
        condition: condition,
        dateOfCreation: moment()
    };

    console.log(announcement.photoUrlArray);

    announcements.create(announcement, function (err, response) {
        if(err) {
            res.status(200);
            res.send(new AnnouncementResponse(false, "Something gone wrong ;("));
            return;
        }

        //TODO CHANGE EMAIL CONTENT

        SendToEmailMicroservice(
            emailPlain,
            'janboduch@wp.pl',
            'Your announcement has been added',
            '<h1>Congratulations!</h1><br/><h2>You have just created an announcement!</h2><br/>'
        );

        res.status(200);
        res.send(new AnnouncementResponse(true, response));
    });


});

router.get('/user/:emailHash', async function(req, res, next) {

    function mongoCallback(err, announcements) {
        if(err){
            res.status(200);
            res.send(new AnnouncementResponse(false, "Something gone wrong ;("));
            return;
        }
        res.status(200);
        res.send(new AnnouncementResponse(true, announcements));
    }

    let emailHash = req.params.emailHash;

    let userID;
    try {
        let dbUser = await users.findOne({
           where: {
               emailHash: emailHash
           }
        });
        if(!dbUser) {
            res.status(200);
            res.send(new AnnouncementResponse(false, "User does not exist"));
            return;
        }
        userID = dbUser.dataValues.userID;
    } catch(err) {
        res.status(200);
        res.send(new AnnouncementResponse(false, "Something gone wrong ;("));
        return;
    }

    announcements.find({
            userID: userID
    }).exec(mongoCallback);

});

router.get('/:categoryID/:subcategoryID', async function(req, res, next) {

    function mongoCallback(err, announcements) {
        if(err){
            res.status(200);
            res.send(new AnnouncementResponse(false, "Something gone wrong ;("));
            return;
        }
        res.status(200);
        res.send(new AnnouncementResponse(true, announcements));
    }

    let categoryID = req.params.categoryID;
    let subcategoryID = req.params.subcategoryID;

    let params = Object.assign({categoryID: categoryID, subcategoryID: subcategoryID, page: 1}, req.query);

    let query = QueryMaker(params);
    let skip = SkipMaker(params);
    let limit = LimitMaker(params);
    let orderBy = OrderMaker(params);


    announcements.find(query).skip(skip).limit(limit).sort(orderBy).exec(mongoCallback);

});

router.get('/search', async function(req, res, next) {

    function mongoCallback(err, announcements) {
        if(err){
            res.status(200);
            res.send(new AnnouncementResponse(false, "Something gone wrong ;("));
            return;
        }
        res.status(200);
        res.send(new AnnouncementResponse(true, announcements));
    }

    let params = Object.assign({page: 1}, req.query);

    let query = QueryMaker(params);
    let skip = SkipMaker(params);
    let limit = LimitMaker(params);
    let orderBy = OrderMaker(params);


    announcements.find(query).skip(skip).limit(limit).sort(orderBy).exec(mongoCallback);

});


module.exports = router;
