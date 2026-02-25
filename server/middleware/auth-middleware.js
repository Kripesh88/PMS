const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: 'User not authenticated',
        data: null,
      });
    }

    //Extract token
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    if (!token) {
      return res.status(401).json({
        message: 'User not logged in',
        data: null,
      });
    }

    //  Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: 'Could not authenticate user',
          data: null,
        });
      }

      //  Attach decoded payload
      req.user = decoded;
      return next();
    });
  } catch (err) {
    console.error('[Auth Error]:', err);
    return res.status(500).json({
      message: 'Internal Server Error',
      data: null,
    });
  }
};

module.exports = authMiddleware;