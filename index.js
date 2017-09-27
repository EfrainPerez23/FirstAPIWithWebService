const request = require('request')
const express = require('express');
const bodyParser = require('body-parser');

const fixer = require('./Router/FixerController');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/fixer', fixer);

app.listen(3007, () => {
    console.log('Server started on port 3007');
});