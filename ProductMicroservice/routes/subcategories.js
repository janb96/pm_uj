let express = require('express');
let router = express.Router();
let AnnouncementResponse = require("../utils/AnnouncementResponse");
let subcategories = require("./../model/Subcategories");

router.get('/', async function(req, res, next) {

    try {
        let dbSubcategories = await subcategories.findAll();
        res.status(200);
        res.send(new AnnouncementResponse(true, dbSubcategories));
    } catch(err) {
        res.status(200);
        res.send(new AnnouncementResponse(false, "Failed to load subcategories from database"));
        return;
    }

});

router.post('/', async function(req, res, next) {

    let subcategoryName = req.body.subcategoryName;
    let subcategoryImageUrl = req.body.subcategoryImageUrl;
    let subcategoryDescription = req.body.subcategoryDescription;
    let categoryID = req.body.categoryID;

    const subcategory = {
        subcategoryName: subcategoryName,
        subcategoryImageUrl: subcategoryImageUrl,
        subcategoryDescription: subcategoryDescription,
        categoryID: categoryID
    };

    try {
        await subcategories.create(subcategory);
    } catch(err) {
        res.status(200);
        res.send(new AnnouncementResponse(false, "Failed to add new subcategory. Check the correctness of the provided data."));
        return;
    }

    res.status(200);
    res.send(new AnnouncementResponse(true, "A new subcategory has been added"));

});

module.exports = router;
