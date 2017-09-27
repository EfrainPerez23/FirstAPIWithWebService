var express = require('express');
var request = require('request');
var app = express();

app.get('/', function(req, res) {
    request({ url: "http://api.fixer.io/latest" + "?base=" + req.query.base, json: true }, function(error, response, result) {
        if (!error && response.statusCode == 200) {
            res.status(200).json({ "success": true, status: 200, "base": req.query.base, "to": req.query.to, "monto": req.query.monto, "message": "Monto total", "valor": result.rates[req.query.to], "total": result.rates[req.query.to] * req.query.monto });
        }
    });
});

app.get('/date', function(req, res) {
    let minYear = req.query.FROM;
    let maxYear = req.query.TO;
    if (maxYear < minYear) {
        res.status(200).json({ "success": false, status: 500, "message": "Error", "years": {} });
    } else {
        var yearArray = [];
        while (minYear <= maxYear) {
            var request = require('sync-request');
            var res2 = request('GET', "http://api.fixer.io/" + minYear + "-12-23");
            yearArray.push(JSON.parse(res2.getBody('utf8')));
            minYear++;
        }
        res.status(200).json({ "success": true, status: 200, "message": "Cambios de moneda por anio", "years": yearArray });
    }

});
module.exports = app;