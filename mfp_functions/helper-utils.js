'use strict';

var convertToNum = function(string){
  if (typeof string !== "string") throw new TypeError("Input type must be 'string'");

  //ignore any characters that aren't numbers or commas
  var newString = string.replace(/[^0-9\.]+/g, '');

  if (newString.match(/^[-,0-9]+$/) === null) throw new Error('Input string must contain numbers');

  return parseInt(string.split(',').join(''));
};

var mfpUrl = function(userId, startDate, endDate){
  if (typeof userId !== "string") throw new TypeError("User ID must be 'string'");

  if (startDate !== undefined && endDate !== undefined) {
    if (typeof startDate !== "string") throw new TypeError("Date must be 'string'");
    if (typeof endDate !== "string") throw new TypeError("Date must be 'string'");
    if (startDate.match(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/) === null) throw new Error("Date must be formatted as valid 'YYYY-MM-DD'");
    if (endDate.match(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/) === null) throw new Error("Date must be formatted as valid 'YYYY-MM-DD'");
    return 'http://www.myfitnesspal.com/reports/printable_diary/' + userId + '?from=' + startDate + '&to=' + endDate;
  } else {
    return 'http://www.myfitnesspal.com/reports/printable_diary/' + userId;
  }
};

var formatDate = function(dateObject) {
    if (dateObject.constructor !== Date) throw new Error("argument must be a valid JavaScript Date object");
    var str = dateObject.getFullYear() + '-';

    //add month to str
    if ( (dateObject.getMonth() + 1) < 10) {
      str += '0' + (dateObject.getMonth() + 1);
    } else {
      str += (dateObject.getMonth() + 1);
    }

    str += '-';

    //add day to str
    if (dateObject.getDate() < 10) {
      str += '0' + dateObject.getDate();
    } else {
      str += dateObject.getDate();
    }

    return str;
};

module.exports = {
  convertToNum: convertToNum,
  mfpUrl: mfpUrl,
  formatDate: formatDate
};
