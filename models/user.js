module.exports = app => {
  const userSchema = new app.mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
  });

  return app.mongoose.model('User', userSchema);
}
