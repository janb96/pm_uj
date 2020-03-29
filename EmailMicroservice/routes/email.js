var express = require('express');
var router = express.Router();
let LoginGuard = require("../utils/LoginGuard");
let EmailResponse = require("../utils/EmailResponse");
let sgMail = require('@sendgrid/mail');
const config = require("../config");
const axios = require('axios');

router.post('/', LoginGuard, async function(req, res, next) {

    function checkEmailData(emailData) {
        if(
            emailData.to === "" || !emailData.to
            ||
            emailData.from === "" || !emailData.from
            ||
            emailData.subject === "" || !emailData.subject
            ||
            emailData.html === "" || !emailData.html
        ) {
            res.status(200);
            res.send(new EmailResponse(false, "The email data is incomplete"));
            return;
        }
    }

    let emailData = req.body.email;
    let isCrypto = req.body.isCrypto;
    sgMail.setApiKey(config.emailAuth);

    if(!isCrypto) {
        checkEmailData(emailData);
    } else {
        let cryptoMsg = await axios.post(
            config.cryptographicMicroserviceURL + "/crypto/object-decrypt",
            {
                ciphertext: emailData
            }).catch(
                err => console.log(err)
        );
        emailData = cryptoMsg.data.cipher;
        checkEmailData(emailData);
    }

    sgMail.send(emailData);

    res.status(200);
    res.send(new EmailResponse(true, "Email has been sent"));
    return;

});

module.exports = router;
