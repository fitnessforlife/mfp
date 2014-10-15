'use strict';

var convertToNum = function(string){
  if (typeof string !== "string") throw new TypeError("Input type must be 'string'");
  if (string.match(/^[-,0-9]+$/) === null) throw new Error('Input string must only contain numbers and commas');

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

module.exports = {
  convertToNum: convertToNum,
  mfpUrl: mfpUrl
};
