'use strict';
/*jshint -W083 */
//ignore warning to not put functions in loops

var fetchSingleDate = require('./fetchSingleDate');

var fetchDateRange = function(username, dateStart, dateEnd, fields, callback) {
  var results = {
    username: username,
    data: []
  };

  var startDate = new Date(dateStart.slice(0,4), dateStart.slice(5,7) - 1, dateStart.slice(8,10));
  var endDate = new Date(dateEnd.slice(0,4), dateEnd.slice(5,7) - 1, dateEnd.slice(8,10));

  var newDate = startDate;
  var dateStrings = [];
  var str;

  while (newDate <= endDate){
    str = newDate.getFullYear() + '-';

    //add month to str
    if ( (newDate.getMonth() + 1) < 10) {
      str += '0' + (newDate.getMonth() + 1);
    } else {
      str += (newDate.getMonth() + 1);
    }

    str += '-';

    //add day to str
    if (newDate.getDate() < 10) {
      str += '0' + newDate.getDate();
    } else {
      str += newDate.getDate();
    }

    dateStrings.push(str);
    newDate.setDate(newDate.getDate()+1);
  }

  var remainder = dateStrings.length;

  dateStrings.forEach(function(date, index){
    fetchSingleDate(username, date, fields, function(data){
      results.data[index] = data;
      remainder--;
      if(!remainder){
        callback(results);
      }
    });
  });
};

module.exports = fetchDateRange;
