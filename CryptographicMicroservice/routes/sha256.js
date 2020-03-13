let express = require('express');
let router = express.Router();
let Sha256Handler = require("../utils/Sha256Handler");
let CryptographicResponse = require("../utils/CryptographicResponse");

const maxLength = 256;

router.post('/hash', function(req, res, next) {

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
    } else if(plaintext.length > maxLength) {
        res.status(200);
        res.send(
            new CryptographicResponse(
                false,
                "plaintext is to long",
                null
            )
        );
    } else {
        let sha256Handler = new Sha256Handler();
        let ciphertext = sha256Handler.makeHash(plaintext);
        res.status(200);
        res.send(
            new CryptographicResponse(
                true,
                "success",
                ciphertext
            )
        );
    }

});

module.exports = router;
