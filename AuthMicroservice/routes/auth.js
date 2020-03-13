let express = require('express');
let router = express.Router();
let emailValidator = require("email-validator");
let users = require("../model/User");
let jwt = require('jsonwebtoken');
let AuthResponse = require("../utils/AuthResponse");
const config = require("../config");
const axios = require('axios');



router.post('/authenticate', async function(req, res, next) {

    let email = req.body.email;
    let password = req.body.password;

    //STEP 1 - VALIDATE EMAIL
    if(!emailValidator.validate(email)) {
        res.status(200);
        res.send("Email is incorrect");
        res.send(new AuthResponse(false, "Email is incorrect"));
        return;
    }

    //STEP 2 - SHA256 EMAIL
    const postSha256Data = {
        plaintext: email
    };

    let sha256Email = await axios.post("http://localhost:4000/sha256/hash", postSha256Data);

    if(sha256Email.data.status.toString() !== "true") {
        res.status(200);
        res.send(new AuthResponse(false, sha256Email.data.message));
        return;
    }

    //STEP 3 - GET USER FROM DATABASE
    let dbUser = await users.findOne({
        where: {
            emailHash: sha256Email.data.cipher
        }
    });

    if(!dbUser) {
        res.status(200);
        res.send(new AuthResponse(false, "User with given email doesn't exist"));
        return;
    }

    let dbUserData = dbUser.dataValues;

    //STEP 4 - COMPARE PASSWORDS
    const postBcryptData = {
        plaintextPassword: password,
        hashPassword: dbUserData.password
    };

    let compare = await axios.post("http://localhost:4000/bcrypt/check", postBcryptData);

    if(compare.data.status.toString() !== "true") {
        res.status(200);
        res.send(new AuthResponse(false, compare.data.message));
        return;
    }

    const tokenData = {
        emailHash: sha256Email.data,
        emailPlain: email
    };

    let token = jwt.sign(tokenData, config.jwtTokenSecretKey, {expiresIn: config.expiresIn});

    const response = {
        token: token
    };

    res.status(200);
    res.send(new AuthResponse(true, response));
});

router.post('/checkToken', async function(req, res, next) {
    let token = req.headers['x-access-token'];

    try {
        jwt.verify(token, config.jwtTokenSecretKey);
    } catch(err) {
        res.status(200);
        res.send(new AuthResponse(false, "Invalid token"));
        return;
    }

    res.send(new AuthResponse(true, "Correct token"));

});

module.exports = router;
