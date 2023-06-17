const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


module.exports = {

    /**
     * creates user given email and password
     * @param {*} args 
     * @returns 
     */
    createUser: async args => {
        try {
            const existingUser = await User.findOne({ email: args.userInput.email });
            if (existingUser) {
            throw new Error('User exists already.');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
    
            const user = new User({
            email: args.userInput.email,
            password: hashedPassword
            });
    
            const result = await user.save();
    
            return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
            throw err;
        }
    },
    login: async ({email, password}) => {
        const user = await User.findOne({email: email});
        if (!user) {
            throw new Error('User does not exist');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            throw new Error("Password is incorrect!")
        } else {
            const token = jwt.sign({userId: user.id, email: user.email}, 'somesupersecretkey', {
                expiresIn: '1h'
            });
            return {userId: user.id, token: token, tokenExpiration: 1}
            // can use token to store some data in it (first argument)
            // second argument is a string to hash token and used for validation (don't expose to clients)
        }
    }
};