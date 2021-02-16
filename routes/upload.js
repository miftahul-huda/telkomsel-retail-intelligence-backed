var express = require('express');
var router = express.Router();
const fs = require('fs');

const {Storage} = require('@google-cloud/storage');

const writeFilePromise = (file, data) => {
    return new Promise((resolve, reject) => {

        fs.writeFile(file, data, error => {
            if (error) reject(error);
            resolve("file created successfully with handcrafted Promise!");
        });
    });
};

/* POST applications listing. */
router.post('/', function (req, res, next) {
    console.log("fuck")
    let file = req.body;
    console.log(file);
    let base64Data  =   file.content.replace(/^data:image\/png;base64,/, "");
    base64Data  +=  base64Data.replace('+', ' ');
    binaryData  =   new Buffer(base64Data, 'base64').toString('binary');
    
    let folder = "./uploads"
    let newFilename = folder + "/" + file.filename;

    fs.writeFileSync(newFilename, binaryData, "binary" , function (err){
        console.log(err); // writes out file without error, but it's not a valid image
    });
    res.send({ success: true, payload: newFilename });
});



async function uploadFileToGcs(projectId, credential, bucketName, filename) {
    // Creates a client
    const storage = new Storage({ projectId, credential });
    // Uploads a local file to the bucket
    await storage.bucket(bucketName).upload(filename, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      // By setting the option `destination`, you can change the name of the
      // object you are uploading to a bucket.
      metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        cacheControl: 'public, max-age=31536000',
      },
    });

    console.log(`${filename} uploaded to ${bucketName}.`);
    return "gs://" + bucketName + "/" + filename;
}


/* POST applications listing. */
router.post('/gcs', function (req, res, next) {
    console.log("fuck gcs")
    let file = req.body;
    console.log(file);
    let base64Data  =   file.content.replace(/^data:image\/png;base64,/, "");
    base64Data  +=  base64Data.replace('+', ' ');
    binaryData  =   new Buffer(base64Data, 'base64').toString('binary');
    
    let folder = "./uploads"
    let newFilename = folder + "/" + file.filename;

    fs.writeFileSync(newFilename, binaryData, "binary" , function (err){
        console.log(err); // writes out file without error, but it's not a valid image
    });

    let uri = uploadFileToGcs("telkomsel-poc-267808","/Users/miftahul.huda/Credentials/telkomsel-poc-gcs.json", "retail-intelligence", newFilename);
    res.send({ success: true, payload: uri });
});


module.exports = router;