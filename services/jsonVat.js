/**
 * We consume some data from https://github.com/adamcooke/json-vat
 * see @ https://jsonvat.com/
 */
const axios = require('axios');

const countryCode = 'BG';

module.exports = app => {
  return {
    async countryVat() {
      let vat = 1
      await axios.get('https://jsonvat.com')
        .then(response => {
          const countryVATs = response.data.rates
          const countryTarget = countryVATs.find(el => el.code === countryCode)
          vat = countryTarget.periods[0].rates.standard // latest update
        })
        .catch(error => {
          // TBD throw appropriate error
          app.log(error);
        });
      return vat
    }
  }
}
