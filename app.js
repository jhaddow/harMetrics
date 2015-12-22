var express = require('express');
var bodyParser = require('body-parser');
var readFile = require('./utils/read-har-file');

var app = express();
var port = process.env.PORT || 9901;
app.use(bodyParser.json());
app.use(express.static(_dirname + '/client'));


app.listen(port, function(){
  console.log('listening on port ' + port + ' with version ' + process.version);

});

app.get('/api/getData', function(req, res){
  readFile.run()
    .then(function(data){
      res.status(200).json(data);
    })
    .catch(function(err){
      res.status(500).json(err);
    });
});