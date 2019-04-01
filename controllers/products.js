module.exports = app => {
  const Product = app.models.product;

  /* eslint no-restricted-syntax:0 */
  /* eslint no-prototype-builtins:0 */
  function stringifyField(allProducts, field) {
    for (const elem of allProducts) {
      for (const prop in elem) {
        if (prop === field && elem.hasOwnProperty(prop)) {
          elem[prop] = elem[prop].toString()
        }
      }
    }
    return allProducts
  }

  return {
    async list(req, res) {
      const vat = await app.services.jsonVat.countryVat(req.decoded)
      const allProducts = await Product.list(vat)
      const stringifyPrices = stringifyField(allProducts, 'price')
      res.status(200)
      return res.json(stringifyPrices)
    },
    async add(req, res) {
      await Product.create(req.body)
      res.status(201)
      return res.json({
        message: 'product created. thats the spirit!!'
      })
    },
    async update(req, res) {
      app.validator.isMongoId(req.params.id)
      await Product.update(req.params.id, req.body)
      res.status(205)
      return res.json({
        message: 'product updated'
      })
    },
    async delete(req, res) {
      await Product.deleteOne({ _id: req.params.id })
      res.status(205)
      return res.send('ok. deleted')
    }
  }
}
