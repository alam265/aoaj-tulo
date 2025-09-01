const jwt = require("jsonwebtoken")

module.exports.checkLogin = (req, res,next) => { 
    const token = req.session.token
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
      }
    
      jwt.verify(token, process.env.JWT_SECRET  , (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid token' });
        }
        req.session.user = user;
        console.log(req.session.user)
        next();
      });
    }
