module.exports = app => {
  const Order = app.models.order;

  return {
    async list(req, res) {
      const allOrders = await Order.list()
      res.satus(200)
      res.json({
        list: allOrders
      })
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
      res.json({
        message: 'order cannot be created. so sorry!!'
      })
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
      res.status(205)
      res.json({
        message: 'order updated'
      })
    }
  }
}
