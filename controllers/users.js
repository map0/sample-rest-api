module.exports = app => {
  const User = app.models.user;

  return {
    async index(req, res) {
      res.send('hello world!!!');
    },
    async add(req, res) {
      const newUser = new User({ username: req.body.username });
      newUser.save();
      res.send('data created')
    }
  }
}