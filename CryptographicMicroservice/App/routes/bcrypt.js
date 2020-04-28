let express = require('express');
let router = express.Router();
let BcryptHandler = require("../utils/BcryptHandler");
let CryptographicResponse = require("../utils/CryptographicResponse");

const minLength = 4;
const maxLength = 24;

router.post('/hash', async function(req, res, next) {

    let plaintextPassword = req.body.plaintextPassword;

    if(!plaintextPassword) {
        res.status(200);
        res.send(
            new CryptographicResponse(
                false,
                "No plaintextPassword in body or plaintextPassword is empty",
                null
            )
        );
    } else if(plaintextPassword.length < minLength || plaintextPassword.length > maxLength) {
        res.status(200);
        res.send(
            new CryptographicResponse(
                false,
                "Password must be between 4 and 24 characters",
                null
            )
        );
    } else {
        let bcryptHandler = new BcryptHandler();
        let hashPassword = await bcryptHandler.hashPassword(plaintextPassword);
        res.status(200);
        res.send(new CryptographicResponse(true, "success", hashPassword));
    }

});

router.post('/check', async function(req, res, next) {

    let plaintextPassword = req.body.plaintextPassword;
    let hashPassword = req.body.hashPassword;

    if(!plaintextPassword || !hashPassword ) {
        res.status(200);
        res.send(
            new CryptographicResponse(
                false,
                "(No plaintextPassword or hashPassword in body) or (plaintextPassword or hashPassword is empty)",
                null
            )
        );
    } else if(plaintextPassword.length < minLength || plaintextPassword.length > maxLength) {
        res.status(200);
        res.send(
            new CryptographicResponse(
                false,
                "plaintextPassword must be between 4 and 24 characters",
                null
            )
        );
    } else {
        let bcryptHandler = new BcryptHandler();
        let isPassword = await bcryptHandler.checkPassword(plaintextPassword, hashPassword);
        if(!isPassword) {
            res.status(200);
            res.send(
                new CryptographicResponse(
                    false,
                    "Password is incorrect",
                    null
                )
            );
        } else {
            res.status(200);
            res.send(
                new CryptographicResponse(
                    true,
                    "Password is correct",
                    null
                )
            );
        }
    }

});

module.exports = router;
