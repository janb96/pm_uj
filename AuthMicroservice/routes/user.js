let express = require('express');
let router = express.Router();
let emailValidator = require("email-validator");
let users = require("../model/User");
let AuthResponse = require("../utils/AuthResponse");
const axios = require('axios');

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

    let sha256Email = await axios.post("http://localhost:4000/sha256/hash", postSha256Data);

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

    let cryptoEmail = await axios.post("http://localhost:4000/crypto/encrypt", postCryptoEmailData);

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

    let bcryptPassword = await axios.post("http://localhost:4000/bcrypt/hash", postBcryptPasswordData);

    if(bcryptPassword.data.status.toString() !== "true") {
        res.status(200);
        res.send(new AuthResponse(false, bcryptPassword.data.message));
        return;
    }

    bcryptPassword = bcryptPassword.data.cipher;

    //STEP 6 - CHECK AGREEMENTS

    //FIRST AGREEMENT IS OBLIGATORY!
    let booleanAgreement1 = (agreement1.toString() === "1");

    if(!booleanAgreement1) {
        res.status(200);
        res.send(new AuthResponse(false, "First agreement is obligatory"));
        return;
    }

    let booleanAgreement2 = (agreement2.toString() === "1");
    let booleanAgreement3 = (agreement3.toString() === "1");

    //STEP 7 - CRYPTO PHONE

    const postCryptoPhoneData = {
        plaintext: phone
    };

    let cryptoPhone = await axios.post("http://localhost:4000/crypto/encrypt", postCryptoPhoneData);

    if(cryptoPhone.data.status.toString() !== "true") {
        res.status(200);
        res.send(new AuthResponse(false, cryptoPhone.data.message));
        return;
    }

    cryptoPhone = cryptoPhone.data.cipher;

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

    res.send(new AuthResponse(true, "User created"));

});

module.exports = router;
