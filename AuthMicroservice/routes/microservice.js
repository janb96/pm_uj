let express = require('express');
let router = express.Router();
let microservices = require("../model/Microservice");
let jwt = require('jsonwebtoken');
let AuthResponse = require("../utils/AuthResponse");
let TokenGenerator = require("../utils/TokenGenerator");
const config = require("../config");
const axios = require('axios');

router.post('/authenticate', async function(req, res, next) {

    let name = req.body.name;
    let password = req.body.password;

    //STEP 1 - VALIDATE NAME
    if(!name) {
        res.status(200);
        res.send(new AuthResponse(false, "Name is incorrect"));
        return;
    }

    //STEP 2 - SHA256 NAME
    const postSha256Data = {
        plaintext: name
    };

    let sha256Name = await axios.post(config.cryptographicMicroserviceURL + "/sha256/hash", postSha256Data);

    if(sha256Name.data.status.toString() !== "true") {
        res.status(200);
        res.send(new AuthResponse(false, sha256Name.data.message));
        return;
    }

    //STEP 3 - GET MICROSERVICE FROM DATABASE
    let dbMicroservice = await microservices.findOne({
        where: {
            name: sha256Name.data.cipher
        }
    });

    if(!dbMicroservice) {
        res.status(200);
        res.send(new AuthResponse(false, "Microservice with given name doesn't exist"));
        return;
    }

    let dbMicroserviceData = dbMicroservice.dataValues;

    //STEP 4 - COMPARE PASSWORDS
    const postBcryptData = {
        plaintextPassword: password,
        hashPassword: dbMicroserviceData.password
    };

    let compare = await axios.post(config.cryptographicMicroserviceURL + "/bcrypt/check", postBcryptData);

    if(compare.data.status.toString() !== "true") {
        res.status(200);
        res.send(new AuthResponse(false, compare.data.message));
        return;
    }

    const tokenData = {
        microserviceID: dbMicroserviceData.microserviceID,
        name: sha256Name.data.cipher
    };

    res.status(200);
    res.send(new AuthResponse(true, TokenGenerator(tokenData, false)));
});

router.get('/checkToken', async function(req, res, next) {

    let token = req.headers['x-access-token'];

    jwt.verify(token, config.jwtTokenSecretKey, function (error, decoded) {
        if(error) {
            res.status(200);
            res.send(new AuthResponse(false, "Invalid token"));
            return;
        }
        res.send(new AuthResponse(true, decoded));
    });

});

module.exports = router;
