const jwt = require('jsonwebtoken');

/* eslint arrow-body-style: 0 */
/* eslint no-unused-vars: 0 */
module.exports = app => {
  return {
    async checkToken(req, res, next) {
      let token = req.headers['x-access-token'] || req.headers.authorization;

      if (token && req.headers.authorization) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }
      if (!token) {
        return res.json({
          success: false,
          message: 'Auth token is not supplied'
        });
      }
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Token is not valid'
          });
        }
        req.decoded = decoded;
        next();
      });
    },
    async createToken(req, res, next) {
      const { username, password } = req.body;
      // For the given username fetch user from DB
      const mockedUsername = 'admin';
      const mockedPassword = 'password';

      if (!username || !password) {
        return res.send(400).json({
          success: false,
          message: 'Authentication failed! Please check the request'
        });
      }
      if (username === mockedUsername && password === mockedPassword) { // mock db.find
        const token = jwt.sign(
          {
            username,
            countryCode: req.body.countryCode || ''
          },
          process.env.JWT_SECRET,
          { expiresIn: 86400 } // expires in 24 hours
        );
        // return the JWT token for the future API calls
        res.token = token;
        return next()
      }
      return res.json({
        success: false,
        message: 'Incorrect username or password'
      });
    }
  }
}
