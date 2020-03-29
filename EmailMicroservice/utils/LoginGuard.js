const config = require("../config");
const axios = require('axios');

let EmailResponse = require("./EmailResponse");

function checkToken(req, res, next) {
    let token = req.headers['x-access-token'];
    axios.get(config.authMicroservice + "/microservice/checkToken", {
        headers: {
            'x-access-token': token
        }
    }).then(
        response => {
            if(response.data.status) {
                req.token = response.data.message;
                next();
            } else {
                res.status(200);
                res.send(new EmailResponse(false, "Unauthorized access. Please Sign In"));
                return;
            }
        }
    ).catch( err => {
        res.status(200);
        res.send(new EmailResponse(false, "Unauthorized access. Please Sign In"));
        return;
    });
}

module.exports = checkToken;