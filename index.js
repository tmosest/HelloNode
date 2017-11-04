const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const fileUpload = require('express-fileupload');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/', (req, res) => res.send('Hello Post!'));

app.get('/params/:param', (req, res) => res.send(req.params));

app.post('/params', function(req, res) {
    console.log(req.body);
    res.send(req.body);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));