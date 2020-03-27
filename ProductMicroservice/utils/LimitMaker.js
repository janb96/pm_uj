const config = require("../config");

function LimitMaker(params) {
    let limit = params.itemsOnPage;
    if(!limit){
        limit = config.itemsOnPage;
    }
    return parseInt(limit);
}

module.exports = LimitMaker;