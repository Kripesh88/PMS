const jwt = require('jsonwebtoken');


const ACCESS_SECRET = process.env.SECRET;


module.exports = {
  generateAccessToken(payload) {
    return jwt.sign(payload, 
      ACCESS_SECRET,{
         expiresIn: "7d",
         });
  },
};
