let express = require('express');
let router = express.Router();
let emailValidator = require("email-validator");
let users = require("../model/User");
let AuthResponse = require("../utils/AuthResponse");
let SendToEmailMicroservice = require("../utils/SendToEmailMicroservice");
let axios = require('axios');
let moment = require('moment');
let md5 = require('md5');
const config = require("../config");

router.post('/registration', async function(req, res, next) {

    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phone;

    //RODO
    let agreement1 = req.body.agreement1;
    //EMAIL MARKETING
    let agreement2 = req.body.agreement2;
    //PHONE MARKETING
    let agreement3 = req.body.agreement3;

    //STEP 1 - VALIDATE EMAIL
    if(!emailValidator.validate(email)) {
        res.status(200);
        res.send(new AuthResponse(false, "Email is incorrect"));
        return;
    }

    //STEP 2 - SHA256 EMAIL
    const postSha256Data = {
        plaintext: email
    };

    let sha256Email = await axios.post( config.cryptographicMicroserviceURL + "/sha256/hash", postSha256Data).catch(err => console.log(err));

    if(sha256Email.data.status.toString() !== "true") {
        res.status(200);
        res.send(new AuthResponse(false, sha256Email.data.message));
        return;
    }

    sha256Email = sha256Email.data.cipher;

    //STEP 3 - IS USER IN DATABASE?

    try {
        let dbUser = await users.findOne({
            where: {
                emailHash: sha256Email
            }
        });
        if(dbUser) {
            res.status(200);
            res.send(new AuthResponse(false, "Account with this email already exist"));
            return;
        }
    } catch(err) {
        res.status(200);
        res.send(new AuthResponse(false, "Something gone wrong ;("));
        return;
    }

    //STEP 4 - CRYPTO EMAIL
    const postCryptoEmailData = {
        plaintext: email
    };

    let cryptoEmail = await axios.post(config.cryptographicMicroserviceURL + "/crypto/encrypt", postCryptoEmailData).catch(err => console.log(err));

    if(cryptoEmail.data.status.toString() !== "true") {
        res.status(200);
        res.send(new AuthResponse(false, cryptoEmail.data.message));
        return;
    }

    cryptoEmail = cryptoEmail.data.cipher;

    //STEP 5 - BCRYPT PASSWORD

    const postBcryptPasswordData = {
        plaintextPassword: password
    };

    let bcryptPassword = await axios.post(config.cryptographicMicroserviceURL + "/bcrypt/hash", postBcryptPasswordData).catch(err => console.log(err));

    if(bcryptPassword.data.status.toString() !== "true") {
        res.status(200);
        res.send(new AuthResponse(false, bcryptPassword.data.message));
        return;
    }

    bcryptPassword = bcryptPassword.data.cipher;

    //STEP 6 - CHECK AGREEMENTS

    //FIRST AGREEMENT IS OBLIGATORY!
    let booleanAgreement1 = (agreement1.toString() === "true");

    if(!booleanAgreement1) {
        res.status(200);
        res.send(new AuthResponse(false, "First agreement is obligatory"));
        return;
    }

    let booleanAgreement2 = (agreement2.toString() === "true");
    let booleanAgreement3 = (agreement3.toString() === "true");

    //STEP 7 - CRYPTO PHONE

    const postCryptoPhoneData = {
        plaintext: phone
    };

    let cryptoPhone;

    if(phone.length > 0) {
        cryptoPhone = await axios.post(config.cryptographicMicroserviceURL + "/crypto/encrypt", postCryptoPhoneData).catch(err => console.log(err));

        if(cryptoPhone.data.status.toString() !== "true") {
            res.status(200);
            res.send(new AuthResponse(false, cryptoPhone.data.message));
            return;
        }

        cryptoPhone = cryptoPhone.data.cipher;
    }

    //STEP 8 - SAVE IN DATABASE

    const user = {
        emailHash: sha256Email,
        emailCrypto: cryptoEmail,
        phone: cryptoPhone,
        password: bcryptPassword,
        agreement1: booleanAgreement1,
        agreement2: booleanAgreement2,
        agreement3: booleanAgreement3
    };

    try {
        await users.create(user);
    } catch(err) {
        res.status(200);
        res.send(new AuthResponse(false, "Something gone wrong ;("));
        return;
    }

    //STEP 9 - PREPARE CONFIRMATION URL

    let nowPlusOneHour = moment().add(1, "hours");

    const postCryptoDateData = {
        plaintext: nowPlusOneHour
    };

    let cryptoDate = await axios.post(config.cryptographicMicroserviceURL + "/crypto/encrypt", postCryptoDateData).catch(err => console.log(err));

    if(cryptoDate.data.status.toString() !== "true") {
        res.status(200);
        res.send(new AuthResponse(false, "Something gone wrong ;( Please try again later"));
        return;
    }

    cryptoDate = cryptoDate.data.cipher;

    let dateToSend = Buffer.from(cryptoDate, 'utf8').toString('base64');
    let emailToSend = Buffer.from(sha256Email, 'utf8').toString('base64');
    let controlSum = md5(dateToSend + emailToSend + config.md5Additional);

    let confirmationURL = config.frontendURL + '/user/confirm/' + emailToSend + '/' + dateToSend + '/' + controlSum;
    let confirmationAhref = '<h3><a href="' + confirmationURL + '">Confirm Your Email</a></h3>';

    //STEP 10 - SEND E-MAIL

    let emailSenderStatus = await SendToEmailMicroservice(
        email,
        'janboduch@wp.pl',
        'Welcome to JB-PM-UJ! Confirm Your Email',
        '<h1>Congratulations!</h1><br/><h2>You have just created an account!</h2><br/>' + confirmationAhref
    );

    console.log(emailSenderStatus);

    res.send(new AuthResponse(true, "User created"));

});

router.post('/confirm', async function(req, res, next) {

    let sha256 = Buffer.from(req.body.p1, 'base64').toString('utf8'); 
    let validDate = Buffer.from(req.body.p2, 'base64').toString('utf8');
    let controlSum = req.body.p3;

    //STEP 1 - CHECK MD5 LENGTH - IT SHOULD BE 32 CHARACTERS
    if(controlSum.length != 32) {
        res.status(200);
        res.send(new AuthResponse(false, "This confirmation URL is not valid"));
        return;
    }

    //STEP 2 - CHECK MD5
    if(md5(req.body.p2 + req.body.p1 + config.md5Additional) !== controlSum) {
        res.status(200);
        res.send(new AuthResponse(false, "This confirmation URL is not valid"));
        return;
    }

    //STEP 3 - CHECK THE EXPIRATION DATE

    const postDataToDecrypt = {
        ciphertext: validDate
    };

    let decryptDate = await axios.post(config.cryptographicMicroserviceURL + "/crypto/decrypt", postDataToDecrypt).catch(err => console.log(err));

    if(decryptDate.data.status.toString() !== "true") {
        res.status(200);
        res.send(new AuthResponse(false, "Something gone wrong ;( Please try again later"));
        return;
    }

    decryptDate = decryptDate.data.cipher;

    let isValid = moment(decryptDate) > moment();

    if(!isValid) {
        res.status(200);
        res.send(new AuthResponse(false, "Your confirmation link is expired"));
        return;
    }

    //STEP 4 - IS USER ACTIVE?

    try {
        let dbUser = await users.findOne({
            where: {
                emailHash: sha256
            }
        });
        if(dbUser.dataValues.dateOfConfirmation != null) {
            res.status(200);
            res.send(new AuthResponse(true, "Your email address has already been confirmed in the past"));
            return;
        }
    } catch(err) {
        res.status(200);
        res.send(new AuthResponse(false, "Something gone wrong ;("));
        return;
    }

    //STEP 5 - UPDATE USER DATA

    const user = {
        dateOfConfirmation: moment()
    };

    try {
        await users.update(user,
            {
                where:
                    {
                        emailHash: sha256
                    }
            });
    } catch(err) {
        res.status(200);
        res.send(new AuthResponse(false, "Something gone wrong ;("));
        return;
    }

    res.send(new AuthResponse(true, "Your email address has been confirmed"));
});

module.exports = router;
