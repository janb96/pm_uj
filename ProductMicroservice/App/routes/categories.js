let express = require('express');
let router = express.Router();
let AnnouncementResponse = require("../utils/AnnouncementResponse");
let categories = require("./../model/Categories");

router.get('/', async function(req, res, next) {

    try {
        let dbCategories = await categories.findAll();
        res.status(200);
        res.send(new AnnouncementResponse(true, dbCategories));
    } catch(err) {
        res.status(200);
        res.send(new AnnouncementResponse(false, "Failed to load categories from database"));
        return;
    }

});

router.get('/byCategoryID/:categoryID', async function(req, res, next) {

    let categoryID = req.params.categoryID;

    try {
        let dbCategories = await categories.findOne({
            where: {
                categoryID: categoryID
            }
        });
        res.status(200);
        res.send(new AnnouncementResponse(true, dbCategories));
    } catch(err) {
        res.status(200);
        res.send(new AnnouncementResponse(false, "Failed to load categories from database"));
        return;
    }

});

router.post('/', async function(req, res, next) {

    let categoryName = req.body.categoryName;
    let categoryImageUrl = req.body.categoryImageUrl;
    let categoryDescription = req.body.categoryDescription;
    let categoryHtml = req.body.categoryHtml;

    const category = {
        categoryName: categoryName,
        categoryImageUrl: categoryImageUrl,
        categoryDescription: categoryDescription,
        categoryHtml: categoryHtml
    };

    try {
        await categories.create(category);
    } catch(err) {
        res.status(200);
        res.send(new AnnouncementResponse(false, "Failed to add new category. Check the correctness of the provided data."));
        return;
    }

    res.status(200);
    res.send(new AnnouncementResponse(true, "A new category has been added"));

});

module.exports = router;
