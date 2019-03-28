module.exports = app => {
  const exceptions = {
    NotFoundError: class NotFoundError extends Error {},
    // RequestValidationError: class ValidationError extends Error {
    //   constructor(e) {
    //     super(e);
    //     this.name = 'ValidationError';
    //     this.message = 'Failed to validate request data';
    //     this.errors = e.useFirstErrorOnly().mapped();
    //   }
    // },
  };

  // not found
  app.express.use((req, res, next) => res.status(404).json({ error: '404' }))

  // catch all exceptions
  app.express.use((err, req, res, next) => {
    app.log.error(`${err.name}: ${err.message}`);
    app.log.debug(err);

    if (res.headersSent) return next(err);
    return res.status(500).send(`${err.name}: ${err.message}`);
  });

  return exceptions;
}
