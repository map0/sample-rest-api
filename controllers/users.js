module.exports = app => {
  const User = app.models.user;

  return {
    async index(req, res) {
      res.send('hello world!!!');
    },
    async add(req, res) {
      const newUser = new User({ username: req.body.username });
      try {
        await newUser.save();
        return res.send('data created');
      } catch (e) {
        if (e.errmsg.match('duplicate key')) {
          return res.send('ooops. this record exists')
        }
        return res.send('smt went wrong while storing the record')
      }
    }
  }
}
