const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const fs = require('fs');
const serveIndex = require('serve-index');
const FileUtility = require('./src/util/FileUtility');
const DirectoryUtility = require('./src/util/DirectoryUtility');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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

app.listen(3000, () => console.log('Example app listening on port 3000!'));
