let express = require('express');
let router = express.Router();

//UTILS
let AnnouncementResponse = require("../utils/AnnouncementResponse");

//MODELS
let announcements = require("./../model/Announcements");

router.get('/:announcementID', async function(req, res, next) {

    function mongoCallback(err, announcement) {
        if(err){
            res.status(200);
            res.send(new AnnouncementResponse(false, "Something gone wrong ;("));
            return;
        }

        res.status(200);
        res.send(new AnnouncementResponse(true, announcement));

    }

    let announcementID = req.params.announcementID;
    announcements.findOneAndUpdate({_id: announcementID}, {$inc: {quantity: 1, numberOfViews: 1}}).exec(mongoCallback);
});

module.exports = router;
