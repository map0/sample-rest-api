module.exports = app => {
  const User = app.models.user;

  function fetchRoutes() {
    const routes = []

    app.routes.stack.forEach(route => routes.push({
      path: route.route.path,
      methods: route.route.methods
    }))
    return routes
  }

  return {
    async index(req, res) {
      const availableRoutes = fetchRoutes()
      res.status(200);
      res.json({
        message: 'Welcome to this awesome-soon-to-be restapi',
        routes: availableRoutes
      })
    },
    async add(req, res) {
      const newUser = new User({ username: req.body.username });
      try {
        await newUser.save();
        res.status(201);
        return res.json({
          status: 'data created',
          token: res.token
        });
      } catch (e) {
        if (e.errmsg && e.errmsg.match('duplicate key')) {
          res.status(403);
          return res.json({
            message: 'ooops. this record exists',
          })
        }
        res.status(500);
        return res.json({
          message: 'smt went terribly wrong while storing the record'
        })
      }
    }
  }
}
