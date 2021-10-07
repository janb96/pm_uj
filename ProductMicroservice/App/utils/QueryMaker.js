let extendify = require('extendify');
extender = extendify({
    arrays: "replace"
});

function QueryMaker(query_params) {

    let query = {};

    for(const parameter in query_params) {
        let key = parameter;
        let value = query_params[parameter];

        switch(key) {
            case "minPrice":
                const minPrice = {
                    announcementPrice: {
                        $gte: value
                    }
                };
                extender(query, minPrice);
                break;
            case "maxPrice":
                const maxPrice = {
                    announcementPrice: {
                        $lte: value
                    }
                };
                extender(query, maxPrice);
                break;
            case "categoryID":
                const categoryID = {
                    categoryID: value
                };
                extender(query, categoryID);
                break;
            case "subcategoryID":
                const subcategoryID = {
                    subcategoryID: value
                };
                extender(query, subcategoryID);
                break;
            case "condition":
                const condition = {
                    condition: value
                };
                extender(query, condition);
                break;
            case "isActive":
                const isActive = {
                    isActive: value
                };
                extender(query, isActive);
                break;
            case "emailHash":
                const emailHash = {
                    emailHash: value
                };
                extender(query, emailHash);
                break;
        }
    }

    return query;

}

module.exports = QueryMaker;