let express = require('express');
let router = express.Router();
let CryptoHandler = require("../utils/CryptoHandler");
let CryptographicResponse = require("../utils/CryptographicResponse");

router.post('/encrypt', function(req, res, next) {

    let plaintext = req.body.plaintext;
    if(!plaintext) {
        res.status(200);
        res.send(
            new CryptographicResponse(
                false,
                "No plaintext in body or plaintext is empty",
                null
            )
        );
    } else {
        let cryptoHandler = new CryptoHandler();
        let ciphertext = cryptoHandler.encryptText(plaintext);
        res.send(
            new CryptographicResponse(
                true,
                "success",
                ciphertext
            )
        );
    }

});

router.post('/decrypt', function(req, res, next) {

    let ciphertext = req.body.ciphertext;
    if(!ciphertext) {
        res.status(200);
        res.send(
            new CryptographicResponse(
                false,
                "No ciphertext in body or ciphertext is empty",
                null
            )
        );
    } else {
        let cryptoHandler = new CryptoHandler();
        let plaintext = cryptoHandler.decryptText(ciphertext);
        res.status(200);
        res.send(
            new CryptographicResponse(
                true,
                "success",
                plaintext
            )
        );
    }

});

module.exports = router;
