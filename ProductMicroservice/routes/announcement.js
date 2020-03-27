let express = require('express');
let router = express.Router();

//UTILS
let AnnouncementResponse = require("../utils/AnnouncementResponse");

//MODELS
let announcements = require("./../model/Announcements");

router.get('/:announcementID', async function(req, res, next) {

    function mongoCallback(err, announcements) {
        if(err){
            res.status(200);
            res.send(new AnnouncementResponse(false, "Something gone wrong ;("));
            return;
        }
        res.status(200);
        res.send(new AnnouncementResponse(true, announcements));
    }

    let announcementID = req.params.announcementID;
    announcements.find({_id: announcementID}).exec(mongoCallback);

});

module.exports = router;
