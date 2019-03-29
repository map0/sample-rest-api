module.exports = app => {
  const Order = app.models.order;

  return {
    async list(req, res) {
      const allOrders = await Order.list()
      res.json({ list: allOrders })
    },
    async add(req, res) {
      await Order.create(req.body)
      res.sendStatus(201)
    },
    async update(req, res) {
      await Order.findOneAndUpdate(
        { _id: req.params.id },
        req.query,
        {
          runValidators: true,
          new: true,
          upsert: true
        }
      )
      res.send('order updated')
    }
  }
}
