let express = require('express');
let router = express.Router();
const config = require("../config");
let axios = require('axios');
const { Op } = require("sequelize");

//UTILS
let SocialResponse = require("../utils/SocialResponse");
let LoginGuard = require("../utils/LoginGuard");
let SendToEmailMicroservice = require("../utils/SendToEmailMicroservice");

//MODELS
let users = require("./../model/User");
let userFavouriteAnnouncements = require("./../model/UserFavouriteAnnouncements");

router.get('/favouriteAnnouncements', LoginGuard, async function(req, res, next) {

    //FROM TOKEN
    let userID = req.token.userID;

    try {
        let announcements = await userFavouriteAnnouncements.findAll({
            where: {
                userID: userID
            }
        });
        res.status(200);
        res.send(new SocialResponse(true, announcements));
        return;
    }catch(err) {
        res.status(200);
        res.send(new SocialResponse(false, "Something gone wrong ;("));
        return;
    }


});

router.post('/favouriteAnnouncements', LoginGuard, async function(req, res, next) {

    //FROM TOKEN
    let userID = req.token.userID;

    //FROM BODY
    let announcementID = req.body.announcementID;

    const userFavouriteAnnouncement = {
        userID: userID,
        announcementID: announcementID
    };

    try {

        let userFavouriteCheck = await userFavouriteAnnouncements.findOne({
            where: {
                [Op.and]: [
                    {userID: userID},
                    {announcementID: announcementID}
                ]
            }
        });

        if(!userFavouriteCheck) {
            let response = await userFavouriteAnnouncements.create(userFavouriteAnnouncement);
            res.status(200);
            res.send(new SocialResponse(true, response));
            return;
        } else {
            res.status(200);
            res.send(new SocialResponse(false, "This announcement is already in your favorites"));
            return;
        }

    }catch(err) {
        console.log(err);
        res.status(200);
        res.send(new SocialResponse(false, "Something gone wrong ;("));
        return;
    }


});

router.delete('/favouriteAnnouncements', LoginGuard, async function(req, res, next) {

    //FROM TOKEN
    let userID = req.token.userID;

    //FROM BODY
    let announcementID = req.body.announcementID;

    try {
        let response = await userFavouriteAnnouncements.destroy({
            where: {
                [Op.and]: [
                    {
                        userID: userID
                    },
                    {
                        announcementID: announcementID
                    }
                ]
            }
        });
        res.status(200);
        res.send(new SocialResponse(true, response));
        return;
    }catch(err) {
        console.log(err);
        res.status(200);
        res.send(new SocialResponse(false, "Something gone wrong ;("));
        return;
    }


});

router.post('/sendMessage', LoginGuard, async function(req, res, next) {

    //FROM BODY
    let userID_Reciever = req.body.userID;
    let message = req.body.message;
    let announcementID = req.body.announcementID;

    //FROM TOKEN
    let emailPlainSender = req.token.emailPlain;

    let userData;

    try {
        let dbUser = await users.findOne({
            where: {
                userID: userID_Reciever
            }
        });
        if(!dbUser) {
            res.status(200);
            res.send(new SocialResponse(false, "User does not exist"));
            return;
        }
        userData = dbUser.dataValues;
    } catch(err) {
        res.status(200);
        res.send(new SocialResponse(false, "Something gone wrong ;("));
        return;
    }

    let cryptoResponse;
    let emailPlain;

    try {
        let emailCrypto = userData.emailCrypto;
        cryptoResponse = await axios.post(config.cryptographicMicroserviceURL + "/crypto/decrypt", {
            ciphertext: emailCrypto
        });

        if(cryptoResponse.data.status) {
            emailPlain = cryptoResponse.data.cipher;
        } else {
            res.status(200);
            res.send(new SocialResponse(false, "Something gone wrong ;("));
            return;
        }

    } catch (err) {
        res.status(200);
        res.send(new SocialResponse(false, "Something gone wrong ;("));
        return;
    }

    SendToEmailMicroservice(
        emailPlain,
        emailPlainSender,
        'Message connected with the announcement: ' + announcementID,
        '<h1>Hello!</h1><br/><h2>You have message connected with the announcement:' + announcementID + '</h2><br/><h3>Message:</h3><br/><p>' + message + '</p>'
    );

    res.send(new SocialResponse(true, "Message was send!"));
});

module.exports = router;
