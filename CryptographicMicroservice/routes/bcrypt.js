let express = require('express');
let router = express.Router();

let BcryptHandler = require("../utils/BcryptHandler");

const minLength = 4;
const maxLength = 24;

router.post('/hash', async function(req, res, next) {

    let plaintextPassword = req.body.plaintextPassword;

    if(!plaintextPassword) {
        res.status(500);
        res.send("No plaintextPassword in body or plaintextPassword is empty");
    } else if(plaintextPassword.length < minLength || plaintextPassword.length > maxLength) {
        res.status(500);
        res.send("plaintextPassword must be between 4 and 24 characters");
    } else {
        let bcryptHandler = new BcryptHandler();
        let hashPassword = await bcryptHandler.hashPassword(plaintextPassword);
        res.status(200);
        res.send(hashPassword);
    }

});

router.post('/check', async function(req, res, next) {

    let plaintextPassword = req.body.plaintextPassword;
    let hashPassword = req.body.hashPassword;

    if(!plaintextPassword || !hashPassword ) {
        res.status(500);
        res.send("(No plaintextPassword or hashPassword in body) or (plaintextPassword or hashPassword is empty)");
    } else if(plaintextPassword.length < minLength || plaintextPassword.length > maxLength) {
        res.status(500);
        res.send("plaintextPassword must be between 4 and 24 characters");
    } else {
        let bcryptHandler = new BcryptHandler();
        let isPassword = await bcryptHandler.checkPassword(plaintextPassword, hashPassword);
        if(!isPassword) {
            res.status(500);
            res.send("Password is incorrect");
        } else {
            res.status(200);
            res.send(isPassword);
        }
    }

});

module.exports = router;
