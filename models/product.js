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
      type: String,
      required: true,
      trim: true,
    }
  });

  return app.mongoose.model('Product', productSchema);
}
