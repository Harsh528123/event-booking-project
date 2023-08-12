const jwt = require('jsonwebtoken')

/**
 * 
 * @param {*} req in the 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
module.exports = (req, res, next) => {
    // next is the next function to let req continue
    const authHeader = req.get('Authorization')
    // Authorization header in the requests is needed for certain accesses like booking
    
    if (!authHeader) {
        //  if no auth field, go to the next middleware function
        req.isAuth = false;
        return next();

    } else {
        const token = authHeader.split(' ') // IE Authorization: Bearer tokenValue is common in public apis
        if ( !token || token === ""){
            req.isAuth = false;
            return next();

        } else {
            let decodedToken;
            try {
                decodedToken = jwt.verify(token[1], "somesupersecretkey");
                // if it equals the key, then we are good. Ideally, the key is in an environment variable
            } catch (err) {
                console.log(err);
                req.isAuth = false;
                return next();
            }
            if (!decodedToken) {

                req.isAuth = false;
                return next();
            } else {
                // make the property true on the req and give the user id that got authenticated
                req.isAuth = true
                req.userId = decodedToken.userId;
                return next();
            }
        }
    }

}