module.exports = app => {
  const Product = app.models.product;

  return {
    async list(req, res) {
      const vat = await app.services.jsonVat.countryVat()
      console.log(vat, 6666)

      const allProducts = await Product.find({})
      res.json({ list: allProducts })
    },
    async add(req, res) {
      await Product.create(req.body)
      res.sendStatus(201)
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
      res.send('product updated')
    },
    async delete(req, res) {
      await Product.deleteOne({ _id: req.params.id })
      res.send('ok. deleted')
    }
  }
}
