module.exports = app => {
  const orderSchema = new app.mongoose.Schema({
    products: {
      type: [{
        type: app.mongoose.Schema.Types.ObjectId,
        ref: 'Products',
      }],
      default: undefined,
      required: 'please supply products. an order needs products'
    },
    status: {
      type: String,
      trim: true,
      enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
      required: 'please supply status. an order needs to be tracked'
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
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

  orderSchema.statics.update = async function update(id, payload) {
    return this.findOneAndUpdate(
      { _id: id },
      payload,
      {
        runValidators: true,
        new: true,
        upsert: true
      }
    )
  }

  return app.mongoose.model('Order', orderSchema);
}
