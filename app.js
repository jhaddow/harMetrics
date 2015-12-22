var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
var port = process.env.PORT || 9901;
app.use(bodyParser.json());



app.listen(port, function(){
  console.log('listening on port ' + port);
})