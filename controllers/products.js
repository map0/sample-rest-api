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
      res.satus(200)
      res.json(stringifyPrices)
    },
    async add(req, res) {
      await Product.create(req.body)
      res.status(201)
      res.json({
        message: 'product created. thats the spirit!!'
      })
    },
    async update(req, res) {
      // for (let prop in req.query) {
      //   if (req.query[prop]) {
      //     update[prop] = req.query[prop];
      //   }
      // }
      await Product.findOneAndUpdate(
        { _id: req.params.id },
        req.query,
        {
          runValidators: true,
          new: true,
          upsert: true
        }
      )
      res.status(205)
      res.json({
        message: 'product updated'
      })
    },
    async delete(req, res) {
      await Product.deleteOne({ _id: req.params.id })
      res.status(205)
      res.send('ok. deleted')
    }
  }
}
