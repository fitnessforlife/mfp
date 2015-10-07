mfp
==============
A third-party API for accessing MyFitnessPal diary data.

For it to work, you should set your diary privacy status to "public".

[![NPM](http://img.shields.io/npm/v/mfp.svg)](https://www.npmjs.org/package/mfp)
[![Circle CI](https://circleci.com/gh/andrewzey/mfp.svg?style=shield&circle-token=e1f56bff19b1519adb77480cbb13550a0d3028e8)](https://circleci.com/gh/andrewzey/mfp)
[![Coverage Status](http://img.shields.io/coveralls/andrewzey/mfp.svg)](https://coveralls.io/r/andrewzey/mfp?branch=master)
[![Dependency Checker](http://img.shields.io/david/andrewzey/mfp.svg)](https://david-dm.org/andrewzey/mfp)

# Installation

```
npm install mfp --save
```

# Usage

```
var mfp = require('mfp');
```

## mfp.fetchSingleDate(username, date, [fields], callback)
Asynchronously scrapes nutrient data from a user's food diary on a given date.
- username `String`
- date `String` with format YYYY-MM-DD
- fields `String` or `Array`
  - `String` 'all', which will fetch data for all nutrient fields
  - `Array` of nutrient field names, each a `String`. Allowable field names:
    - 'calories'
    -	'carbs'
    - 'fat'
    - 'protein'
    - 'cholesterol'
    - 'sodium'
    - 'fiber'
    - 'sugar'
- callback `Function`
  - the callback is passed a single argument `data`, which will be an `Object`
  whose keys are the nutrient field names and values are each a `Number`, as well as the date.
  Eg. `{ 'date': '2014-10-05', 'calories': 2078, 'carbs': 98, 'fat': 119, 'saturated fat': 35, 'protein': 153 }`


Example 1:

```
mfp.fetchSingleDate('username', '2014-09-15', 'all', function(data){
  console.log(data);
});
```

Example 2:

```
mfp.fetchSingleDate('username', '2014-09-15', ['calories', 'protein', 'carbs', 'fat'], function(data){
  console.log(data);
});
```

## mfp.fetchDateRange(username, dateStart, dateEnd, [fields], callback)
Asynchronously scrapes nutrient data from a user's food diary on a given date.
- username `String`
- dateStart `String` with format YYYY-MM-DD
- dateEnd `String` with format YYYY-MM-DD
- fields `String` or `Array`
  - `String` 'all', which will fetch data for all nutrient fields
  - `Array` of nutrient field names, each a `String`. Allowable field names:
    - 'calories'
    -	'carbs'
    - 'fat'
    - 'protein'
    - 'cholesterol'
    - 'sodium'
    - 'fiber'
    - 'sugar'
- callback `Function`
  - the callback is passed a single argument `data`, which will be an `Object`
  with the following format:
  Eg.
  ```
  { username: 'exampleUser',
    data: [
      { 'date': '2014-07-05', 'calories': 2078, 'carbs': 98, 'fat': 119, 'saturated fat': 35, 'protein': 153 },
      { 'date': '2014-07-06', 'calories': 2078, 'carbs': 98, 'fat': 119, 'saturated fat': 35, 'protein': 153 },
      { 'date': '2014-07-07', 'calories': 2078, 'carbs': 98, 'fat': 119, 'saturated fat': 35, 'protein': 153 }
    ]
  }
  ```


Example 1:

```
mfp.fetchDateRange('username', '2014-09-15', '2014-09-18', 'all', function(data){
  console.log(data);
});
```

Example 2:

```
mfp.fetchDateRange('username', '2014-09-15', '2014-09-18', ['calories', 'protein', 'carbs', 'fat'], function(data){
  console.log(data);
});
```

## mfp.diaryStatusCheck(username, callback)
Asynchronously checks the privacy status of a user's food diary.

- username `String`
- callback `Function`
  - the callback is passed a single argument `status`, which will be a `String`
with the following possible values:
    - 'public'
    - 'private'
    - 'invalid user'

Example:

```
mfp.diaryStatusCheck('username', function(status) {
  console.log(status);
});
```

## mfp.apiStatusCheck(callback)
Asynchronously checks to see if all the API functions work correctly. They may
cease to work because MyFitnessPal can change the way they present data on their
site at any time.

- callback `Function`
  - the callback is passed a single argument `errors`, which will be an `array`
containing the following possible `string`s:
    - 'diaryStatusCheck isn't working correctly for public profiles'
    - 'diaryStatusCheck isn't working correctly for private profiles'
    - 'diaryStatusCheck isn't working correctly for invalid usernames'
    - 'fetchSingleDate with all nutrients isn't working correctly'
    - 'fetchSingleDate with user-specified nutrients isn't working correctly'

Example:

```
mfp.apiStatusCheck(function(errors) {
  if (errors.length !== 0) {
    errors.forEach(function(error){
      console.log(error);
    });
  } else {
    console.log("There aren't any errors!");
  }
});
```


# Local Dependencies
- request (latest)
- cheerio (latest)
- chai (latest)

# Contributing

**Feel free to contribute with any of the items in the backlog.**

**To Contribute via Issue Notice:**

- Write up a description of the problem
- I will write a fix correspondingly

**To Contribute via Pull Request:**

- Fork the repo

- In lieu of a formal styleguide, take care to maintain the existing coding style.

  - Global "strict mode" is enabled for this project.
  - Commits should be prefixed appropriately:
    - New Features: (feat)
    - Bug Fixes: (fix)
    - Documentation: (doc)
    - Refactoring and Code Cleanup: (refact)

- Add unit tests for any new or changed functionality. Write tests in the appropriate spec file in the `test` directory

- Submit a pull request to master branch

# Development Dependencies

####Global
- gulp (latest)

####Local
- mocha (latest)
- coveralls (latest)
- gulp (latest)
- gulp-mocha (latest)
- gulp-istanbul (latest)
- gulp-jshint (latest)
- jshint-stylish (latest)

# Tests

### Run JSHint Linting
```
gulp lint
```

### Run Tests
```
gulp test
```

### Automatically lint and test on source file changes
```
gulp watch
```

# Release History

* 0.1.0 Initial release, diaryStatusCheck()
* 0.1.1 Update documentation, badges/shields
* 0.2.0 Add fetchSingleDate function
* 0.3.0 Add fetchDateRange function. Add 'date' parameter to fetchSingleDate results.
* 0.4.0 Add apiStatusCheck function
* 0.4.1 Fix Critical Bug: add fetchDateRange function and apiStatusCheck to index.js
* 0.4.2 Fix Critical Bug: add chai as local dependency
* 0.5.0 Multiple Enhancements and Fixes:
  - Refactored fetchSingleDate - 1.6x faster
  - Refactored fetchDateRange - 3.88x faster for 5 days, 6.9x faster for 20 days
  - Removed unsupported nutrient fields from fetchSingleDate and fetchDateRange:
    - 'saturated fat'
    - 'polyunsaturated fat'
    - 'monounsaturated fat'
    - 'trans fat'
    - 'potassium'
    - 'carbohydrates'
    - 'vitamin a'
    - 'vitamin c'
    - 'calcium'
    - 'iron'
  - Fixed occasionally failing apiStatusCheck spec
* 0.5.1 Fix Critical Bug: failing CircleCI build due to file naming issue
* 0.5.2 Update documentation
* 0.5.3 Fix Bug: diaryStatusCheck correctly returns 'invalid user' when hitting 404 page
* 0.5.4 Update dependencies, update tests to use mocha's done() for async tests
* 0.5.5 Add User Agent String to Request Headers to Fix Failing Scraping
* 0.5.6 Add User-Agent String to Request Headers of checking if diary is public

# Known Issues


# Backlog
* add `exportCSV` function
