var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var _ = require('lodash');


module.exports.run = function(){
  return fs.readFileAsync(path.resolve(__dirname, '../harFiles/github.com.har'), 'utf8')
    .then(function(data){
      return JSON.parse(data);
    })
    .then(function(data){
      return _.sortBy(data.log.entries, 'startedDateTime');
    })
    .catch(function(err){
      throw new Error(err);
    });

};

function groupData(data){
  return _.groupBy(data.log.entries, 'response.content.mimeType');
}

function categorize(data){
  var map = {
    image: [],
    json: [],
    javascript: [],
    font: [],
    html: [],
    css: [],
    other: []
  };

  _.forEach(map, function(array, mapKey){
    _.forEach(data, function(arrayToConcat, dataKey){
      if(dataKey.indexOf(mapKey) > -1) {
        map[mapKey] = _(map[mapKey]).concat(arrayToConcat).value();
        delete data[dataKey];
      }
    });
  });

  _.forEach(data, function(array){
    map.other = _(map.other).concat(array).value();
  });

  return map;
}