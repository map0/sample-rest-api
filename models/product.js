module.exports = app => {
  const productSchema = new app.mongoose.Schema({
    name: {
      type: String,
      required: 'a product needs a lovely name',
      trim: true,
    },
    category: {
      type: String,
      required: 'a product needs a proper name',
      trim: true,
    },
    price: {
      type: Number,
      required: 'a product needs a decent price',
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
