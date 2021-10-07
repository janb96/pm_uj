const config = require("../config");
let jwt = require('jsonwebtoken');

function TokenGenerator(tokenData, isUser) {

    try {
        if(isUser){
            let token = jwt.sign(tokenData, config.jwtTokenSecretKey, {expiresIn: config.expiresIn});
            return {token: token};
        } else {
            let token = jwt.sign(tokenData, config.jwtTokenSecretKey, {expiresIn: config.expiresInMicroservice});
            return {token: token};
        }
    } catch(err) {
        return {token: "Something gone wrong ;("};
    }

}

module.exports = TokenGenerator;