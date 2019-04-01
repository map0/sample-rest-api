const isAlphanumeric = require('validator/lib/isAlphanumeric');
const isMongoId = require('validator/lib/isMongoId');

/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
module.exports = app => {
  return {
    isAlphanumeric,
    isMongoId
  }
}
