const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const fs = require('fs');
const serveIndex = require('serve-index');
const FileUtility = require('./src/util/FileUtility');
const DirectoryUtility = require('./src/util/DirectoryUtility');
const PrinterUtility = require('./src/util/PrinterUtility');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(fileUpload()); // File Uploads

app.use('/public', express.static('public'), serveIndex('public', {'icons': true}));

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/', (req, res) => res.send('Hello Post!'));

app.get('/params/:param', (req, res) => res.send(req.params));

app.post('/params', function(req, res) {
    console.log(req.body);
    res.send(req.body);
});

app.get('/json/public/', function(req, res) {
    console.log('Getting public files as json.');
    let files = DirectoryUtility.readFolders('./public');
    if(!files) {
        return res.status(500).send(files);
    }
    return res.send(files);
});

app.get('/json/public/:folder', function(req, res, next) {
    let folder = req.params.folder;
    console.log('Trying to look in: ' + folder);
    switch (folder) {
        case 'printed':
        case 'printing':
            break;
        default:
            folder = '';
            break;
    }
    /*
    * Read all the folders in public
    */
    let path = './public';
    path += (folder === '') ? '' : ('/' + folder);
    fs.readdir(path, function(err, files) {
        if (err) return next(err);
        console.log('Files before image filter ' + files);
        files = FileUtility.filterOutNonImages(files);
        console.log('Files after image filter ' + files);
        files.sort();
        res.send(files);
    });
});

/**
 * File uploads
 */
app.post('/upload', function(req, res) {
    console.log(req.files); // the uploaded files
    // We are going to assume that all uploaded files have a form name of image
    console.log(req.files.image);
    // Now we need to know what to name this before we move it to the right directory.
    // Inside ./public/printing we are going to store two types of files
    // One file named In-Progress and the rest will be of the form QX where X is a number
    // So if the current highest is Q1 then we will name this file Q2.png
    let newFileName = PrinterUtility.getNextQFileName();
    console.log('New filename should be ' + newFileName);
    // Now we can try to move the file
    let newFilePath = PrinterUtility.getPrintingDirectory() + '/' + newFileName;
    console.log('Moving file to ')
    req.files.image.mv(newFilePath, function (err) {
        if(err) {
            console.error('Error moving to ' + newFilePath);
            return res.status(500).send(err);
        }
        console.log('File moved to ' + newFilePath);
        res.send('File uploaded');
    })
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
