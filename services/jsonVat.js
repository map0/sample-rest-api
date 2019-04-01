/**
 * We consume some data from https://github.com/adamcooke/json-vat
 * see @ https://jsonvat.com/
 */
const axios = require('axios');

/* eslint arrow-body-style: 0 */
module.exports = app => {
  return {
    async countryVat(countryCode = 'BG') {
      let vat = 1
      await axios.get('https://jsonvat.com')
        .then(response => {
          const countryVATs = response.data.rates
          const countryTarget = countryVATs.find(el => el.code === countryCode)
          vat = countryTarget.periods[0].rates.standard // latest update
        })
        .catch(error => {
          app.log.error(error);
          throw new Error('Not a valid country code')
        });
      return vat
    }
  }
}
