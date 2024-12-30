const jwt = require("jsonwebtoken")

module.exports.checkLogin = (req, res, next) => {
    try {
        // Check for token in both session and Authorization header
        const token = req.session.token || req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.redirect('/admin/login');
        }
    
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                req.session.destroy();
                return res.redirect('/admin/login');
            }
            
            req.admin = decoded;
            next();
        });
    } catch (error) {
        req.session.destroy();
        return res.redirect('/admin/login');
    }
};
