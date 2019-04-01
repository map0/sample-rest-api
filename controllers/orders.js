module.exports = app => {
  const Order = app.models.order;

  return {
    async list(req, res) {
      const allOrders = await Order.list()
      res.status(200)
      return res.json(allOrders)
    },
    async add(req, res) {
      // const newOrder = await Order.create(req.body)
      // await newOrder.save()
      const newOrder = await (new Order(req.body)).save()
      if (newOrder) {
        res.status(201)
        return res.json({
          message: 'order created. way to go!!'
        });
      }
      res.status(400)
      return res.json({
        message: 'order cannot be created. so sorry!!'
      })
    },
    async update(req, res) {
      app.validator.isMongoId(req.params.id)
      await Order.update(req.params.id, req.body)
      res.status(205)
      return res.json({
        message: 'order updated'
      })
    }
  }
}
