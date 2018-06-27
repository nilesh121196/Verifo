require('dotenv').config()
var express = require('express');
var app = express();
var request = require('request');
var path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))

var params = {
    'user-id': 'nilesh121196',
    'api-key': process.env.API_KEY,
    'email': ''
};


app.set('port', (process.env.PORT || 5000));

app.post('/', (req, res) => {

    params.email = req.body.getEmail;
    request.post(
        'https://neutrinoapi.com/email-verify',
        { form: params },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body);
                res.json(result)
            }
        }
    );

})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'))
});













app.listen(app.get('port'), function () {
    console.log('App is run on port', app.get('port'));
});


