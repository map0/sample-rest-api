module.exports = app => {
  const orderSchema = new app.mongoose.Schema({
    products: [{
      type: app.mongoose.Schema.Types.ObjectId,
      ref: 'Products'
    }],
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    }
  });

  orderSchema.statics.list = async function list() {
    return this.aggregate(
      [
        {
          $project:
          {
            date:
            {
              $dateToString:
              {
                format: '%Y-%m-%d', date: '$date'
              }
            },
            products: 1,
            status: 1
          }
        }
      ]
    )
  }

  return app.mongoose.model('Order', orderSchema);
}
