let express = require('express');
let router = express.Router();

let Sha256Handler = require("../utils/Sha256Handler");

const maxLength = 256;

router.post('/hash', function(req, res, next) {

    let plaintext = req.body.plaintext;
    if(!plaintext) {
        res.status(200);
        res.send("No plaintext in body or plaintext is empty");
    } else if(plaintext.length > maxLength) {
        res.status(200);
        res.send("plaintext is to long");
    } else {
        let sha256Handler = new Sha256Handler();
        let ciphertext = sha256Handler.makeHash(plaintext);
        res.send(ciphertext);
    }

});

module.exports = router;
