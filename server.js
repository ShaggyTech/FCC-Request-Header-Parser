var fs = require("fs");
var httpHeaders = require("http-headers");
var express = require('express');
var app = express();

app.use('/public', express.static(process.cwd() + '/public'));

/* http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
}); */

app.route('/_api/package.json')
  .get(function(req, res, next) {
    console.log('requested');
    fs.readFile(__dirname + '/package.json', function(err, data) {
      if(err) return next(err);
      res.type('txt').send(data.toString());
    });
  });

app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    });

app.route('/api/whoami')
  .get(function(req, res) {
    var regex = /\((.*?)\)/,
        ipaddress = req.headers["x-forwarded-for"].split(",")[0],
        language = req.headers["accept-language"].split(",")[0],
        software = regex.exec(req.headers["user-agent"])[1];
  
    res.json( {
        "ipaddress": ipaddress,
        "language": language,
        "software": software
      }
    );
  });

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
