// const { isAlphanumeric } = require('validator/lib/isAlphanumeric');

module.exports = app => {
  const userSchema = new app.mongoose.Schema({
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: (v) => app.validator.isAlphanumeric(v),
        message: 'Only alphanums allowed...Up for another try?'
      }
    },
  });

  return app.mongoose.model('User', userSchema);
}
