let express = require('express');
let router = express.Router();

let CryptoHandler = require("../utils/CryptoHandler");

router.post('/encrypt', function(req, res, next) {

    let plaintext = req.body.plaintext;
    if(!plaintext) {
        res.status(500);
        res.send("No plaintext in body or plaintext is empty");
    } else {
        let cryptoHandler = new CryptoHandler();
        let ciphertext = cryptoHandler.encryptText(plaintext);
        res.send(ciphertext);
    }

});

router.post('/decrypt', function(req, res, next) {

    let ciphertext = req.body.ciphertext;
    if(!ciphertext) {
        res.status(500);
        res.send("No ciphertext in body or ciphertext is empty");
    } else {
        let cryptoHandler = new CryptoHandler();
        let plaintext = cryptoHandler.decryptText(ciphertext);
        res.send(plaintext);
    }

});

module.exports = router;
