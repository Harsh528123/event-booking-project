const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    // next is the next function to let req continue
    const authHeader = req.get('Authorization')
    console.log(authHeader);
    if (!authHeader) {
      //  if no auth field
        req.isAuth = false;
        console.log("here")
        return next();
    } else {
        console.log("here1")
        const token = authHeader.split(' ') // IE Authorization: Bearer tokenValue is common in public apis
        if (!token || token === ""){
            req.isAuth = false;
            console.log("17")
            return next();
        } else {
            let decodedToken;
            try {
                decodedToken = jwt.verify(token[1], "somesupersecretkey");
            } catch (err) {
                console.log(err);
                req.isAuth = false;
                console.log("24");
                return next();
            }
            if (!decodedToken) {
                req.isAuth = false;
                console.log("29")
                return next();
            } else {
                console.log("32")
                req.isAuth = true
                req.userId = decodedToken.userId;
                return next();
            }
        }
    }

}