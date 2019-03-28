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

  return app.mongoose.model('Order', orderSchema);
}
