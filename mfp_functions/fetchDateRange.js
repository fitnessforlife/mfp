'use strict';
/*jshint -W083 */
//ignore warning to not put functions in loops

var fetchSingleDate = require('./fetchSingleDate');

var fetchDateRange = function(username, dateStart, dateEnd, fields, callback) {
  var results = {
    username: username,
    data: {}
  };

  var startDate = new Date(dateStart.slice(0,4), dateStart.slice(5,7), dateStart.slice(7,9));
  var endDate = new Date(dateEnd.slice(0,4), dateEnd.slice(5,7), dateEnd.slice(7,9));

  var newDate = startDate;
  var dateStrings = [];
  var str;

  while (newDate <= endDate){
    str = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
    dateStrings.push(str);
    newDate.setDate(newDate.getDate()+1);
  }

  var remainder = dateStrings.length;

  for (var i = 0; i < dateStrings.length; i++) {
    fetchSingleDate(username, dateStrings[i], fields, function(data){
      results.data[dateStrings[i]] = data;
      remainder--;
      if(!remainder){
        callback(results);
      }
    });
  }
};

module.exports = fetchDateRange;
