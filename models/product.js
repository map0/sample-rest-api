module.exports = app => {
  const productSchema = new app.mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    }
  });

  productSchema.statics.list = async function list(vat) {
    return this.aggregate(
      [
        {
          $project: {
            name: 1,
            category: 1,
            price: {
              $multiply: ['$price', vat]
            }
          }
        }
      ]
    )
  }

  return app.mongoose.model('Product', productSchema);
}
