function OrderMaker(params) {

    let orderQuery = {};

    let sortBy = params.sortBy;
    let order = params.order;

    if(!sortBy){
        return orderQuery;
    }

    if(!order){
        order = 1;
    }

    if(order != 1 && order!=-1) {
        order=1;
    }

    switch(sortBy) {
        case "numberOfViews":
            orderQuery = {
                numberOfViews: order
            };
            break;
        case "dateOfCreation":
            orderQuery = {
                dateOfCreation: order
            };
            break;
        case "announcementPrice":
            orderQuery = {
                announcementPrice: order
            };
            break;
    }

    return orderQuery;

}

module.exports = OrderMaker;