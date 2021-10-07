const config = require("../config");
let axios = require('axios');

async function SendToEmailMicroservice(to, from, subject, html) {

    const msg = {
        to: to,
        from: from,
        subject: subject,
        html: html,
    };

    if(
        msg.to === "" || !msg.to
        ||
        msg.from === "" || !msg.from
        ||
        msg.subject === "" || !msg.subject
        ||
        msg.html === "" || !msg.html
    ) {
        return false;
    }

    let cryptoMsg;

    try {
        cryptoMsg = await axios.post(config.cryptographicMicroserviceURL + "/crypto/object-encrypt", {object: msg});
    } catch(err) {
        return false;
    }

    if(cryptoMsg.data.status.toString() === "true") {
        try {
            let token = await axios.post(config.authMicroserviceURL + "/microservice/authenticate",
                {
                    name: config.microserviceName,
                    password: config.microservicePassword
                });

            let response = await axios.post(config.emailMicroservice + "/email", {email: cryptoMsg.data.cipher, isCrypto: true}, {
                headers: {
                    'x-access-token': token.data.message.token
                }
            });
            return response.data;
        } catch(err) {
            return false;
        }
    } else {
        return false;
    }

}

module.exports = SendToEmailMicroservice;