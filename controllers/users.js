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
        testToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluMiIsImNvdW50cnlDb2RlIjoiIiwiaWF0IjoxNTU0MTA1NzAzLCJleHAiOjE2NDA1MDU3MDN9.7ixSFVkc5uNamgWCcTTt54zoDr16mvNdHsOC5mUgk6g',
        routes: availableRoutes
      })
    },
    async add(req, res) {
      try {
        await (new User({ username: req.body.username })).save();
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
        if (e instanceof Error && e.name && e.name === 'ValidationError') {
          res.status(422);
          return res.json({
            message: `${e.name} ${e.message ? e.message : ''}`
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
