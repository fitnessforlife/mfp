'use strict';

var fetchDateRange = require('../mfp_functions/fetchDateRange');

fetchDateRange('azey47', '2014-10-06', '2014-10-09', 'all', function(data){
  console.log(data);
});
