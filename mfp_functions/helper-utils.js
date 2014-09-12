'use strict';

var convertToNum = function(string){
  if (typeof string !== "string") throw new TypeError("Input type must be 'string'");
  if (string.match(/^[-,0-9]+$/) === null) throw new Error('Input string must only contain numbers and commas');

  return parseInt(string.split(',').join(''));
};

var mfpUrl = function(userId, date){
  date = date.slice(0,4) + '-' + date.slice(4,6) + '-' + date.slice(6,8);
  return 'http://www.myfitnesspal.com/food/diary/' +
         userId +
         '?date=' +
         date;
};

module.exports = {
  convertToNum: convertToNum,
  mfpUrl: mfpUrl
};
