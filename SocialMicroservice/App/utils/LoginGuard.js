const config = require("../config");
const axios = require('axios');
let SocialResponse = require("./SocialResponse");

function checkToken(req, res, next) {
    let token = req.headers['x-access-token'];

    console.log(token);

    axios.get(config.authMicroserviceURL + "/user/checkToken", {
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
                res.send(new SocialResponse(false, "Unauthorized access. Please Sign In"));
                return;
            }
        }
    ).catch( err => {
        res.status(200);
        res.send(new SocialResponse(false, "Unauthorized access. Please Sign In"));
        return;
    });
}

module.exports = checkToken;