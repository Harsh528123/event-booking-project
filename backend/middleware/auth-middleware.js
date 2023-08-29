import jwt from 'jsonwebtoken'

export const handleAuth = (req) => {
    const authHeader = req.get('Authorization')
    // Authorization header in the requests is needed for certain accesses like booking

    if (!authHeader) {
        //  if no auth field, go to the next middleware function
        return {isAuth : false};

    } else {
        const token = authHeader.split(' ') // IE Authorization: Bearer tokenValue is common in public apis
        if ( !token || token === ""){
            return {isAuth : false};
        }
        try {
            var decodedToken = jwt.verify(token[1], "somesupersecretkey");
            // if it equals the key, then we are good. Ideally, the key is in an environment variable
        } catch (err) {
            console.log(err);
            return {isAuth : false};
        }
        if (!decodedToken) {
            return {isAuth : false};
        } else {
            // make the property true on the req and give the user id that got authenticated
            return {isAuth : true, userId: decodedToken.userId};
        }
    }
}

