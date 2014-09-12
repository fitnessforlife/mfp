'use strict';

var convertToNum = function(string){
  if (typeof string !== "string") throw new TypeError("Input type must be 'string'");
  if (string.match(/^[-,0-9]+$/) === null) throw new Error('Input string must only contain numbers and commas');

  return parseInt(string.split(',').join(''));
};

var mfpUrl = function(userId, date){
  if (typeof userId !== "string") throw new TypeError("User ID must be 'string'");

  if (date !== undefined) {
    if (typeof date !== "string") throw new TypeError("Date must be 'string'");
    if (date.match(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/) === null) throw new Error("Date must be formatted as valid 'YYYY-MM-DD'");
    return 'http://www.myfitnesspal.com/food/diary/' + userId + '?date=' + date;
  } else {
    return 'http://www.myfitnesspal.com/food/diary/' + userId;
  }

};

module.exports = {
  convertToNum: convertToNum,
  mfpUrl: mfpUrl
};
