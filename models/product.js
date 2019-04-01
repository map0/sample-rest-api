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

  productSchema.statics.update = async function update(id, payload) {
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

  return app.mongoose.model('Product', productSchema);
}
