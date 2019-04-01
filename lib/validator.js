const isAlphanumeric = require('validator/lib/isAlphanumeric');
const isMongoId = require('validator/lib/isMongoId');

module.exports = app => {
  // console.log(isAlphanumeric, 8888)
  return {
    isAlphanumeric,
    isMongoId
  }
}
