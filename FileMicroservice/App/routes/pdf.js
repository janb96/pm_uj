let express = require('express');
let router = express.Router();
let fs = require('fs');
let uniqueFilename = require('unique-filename');
let FileResponse = require('./../utils/FileResponse');
let path = require("path");

const pathWithPDF = __dirname + "/../files/pdf";

router.get('/:fileName', async function(req, res, next) {

    let fileName = req.params.fileName;
    let filePath = pathWithPDF + "/" + fileName;

    res.status(200);

    try {
        fs.exists(filePath, function(exists) {
            if(exists) {
                fs.createReadStream(filePath).pipe(res);
            } else {
                res.send(new FileResponse(false, "Cannot find file with given name"));
            }
        });
    } catch(err) {
        res.status(200);
        res.send(new FileResponse(false, "Something gone wrong ;("));
    }


});

router.post('/', async function(req, res, next) {

    let file = req.body.pdf;
    let randomFilename = uniqueFilename(pathWithPDF) + ".pdf";
    let responseName = path.basename(randomFilename);

    res.status(200);

    try {

        fs.writeFile(randomFilename, file.replace("data:application/pdf;base64,", ""), "base64", function (err) {

            if(err) {
                res.send(new FileResponse(false, "Something gone wrong ;("));
                return;
            }

            const responseData = {
                fileName: responseName
            };

            res.send(new FileResponse(true, responseData));
        });

    } catch(err) {
        res.send(new FileResponse(false, "Something gone wrong ;("));
    }


});

module.exports = router;
