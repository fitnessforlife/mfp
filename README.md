mfp
==============
A third-party API for accessing MyFitnessPal diary data

[![Circle CI](https://circleci.com/gh/andrewzey/mfp.svg?style=shield&circle-token=e1f56bff19b1519adb77480cbb13550a0d3028e8)](https://circleci.com/gh/andrewzey/mfp)
[![Coverage Status](https://coveralls.io/repos/andrewzey/mfp/badge.png?branch=master)](https://coveralls.io/r/andrewzey/mfp?branch=master)
[![Dependency Checker](https://david-dm.org/andrewzey/mfp.png)](https://david-dm.org/andrewzey/mfp)

## Installation

```
npm install mfp --save
```

## Usage

```
var mfp = require('mfp');
```

### Diary Status Check

```
var check = mfp.diaryStatusCheck;

check('username'); // returns "public", "private", "nonexistent"
```

## Local Dependencies
- request (latest)
- cheerio (latest)


## Contributing

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

## Development Dependencies

####Global
- gulp (>= 3.4.0)

####Local
- mocha (latest)
- chai (latest)
- coveralls (latest)
- gulp (3.4.0 - latest version supported by CircleCI as of 2014-09-12)
- gulp-mocha (latest)
- gulp-istanbul (latest)
- gulp-jshint (latest)
- jshint-stylish (latest)

## Tests

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

## Release History

* 0.1.0 Initial release, diaryStatusCheck()

## Backlog
* add 'fetchSingleDate' function
* add 'fetchDateRange' function
