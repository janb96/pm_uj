const config = require("../config");

function SkipMaker(params) {
    let page = params.page;
    if(!page){
        page = 1;
    }
    if(!params.itemsOnPage){
        return parseInt(((page - 1) * config.itemsOnPage));
    } else {
        return parseInt(((page - 1) * params.itemsOnPage));
    }
}

module.exports = SkipMaker;