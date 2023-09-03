// const User = require('../../models/user.js');
import { userModel } from '../../models/user.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { userNotFound } from '../errors/authenticationError.js';
import { incorrectPassword } from '../errors/authenticationError.js';

export const userMutations = { 
    
        /**
         * creates user given email and password
         * @param {*} args 
         * @returns 
         */
        createUser: async (parent, args, contextValue, info) => {
            try {
                const existingUser = await userModel.findOne({ email: args.userInput.email });
                if (existingUser) {
                throw new Error('User exists already.');
                }
                const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
        
                const user = new userModel({
                    email: args.userInput.email,
                    password: hashedPassword
                });
        
                const result = await user.save();
        
                return { ...result._doc, password: null, _id: result.id };
            } catch (err) {
                throw err;
            }
        }
    }
export const userQueries = {
        login: async (parent, args, contextValue, info) => {
            const user = await userModel.findOne({email: args.email});
            if (!user) {
                throw userNotFound;
            }
            console.log("logged in")
            const isEqual = await bcrypt.compare(args.password, user.password);
            if (!isEqual) {
                throw incorrectPassword;
            } else {
                const token = jwt.sign({userId: user.id, email: user.email}, 'somesupersecretkey', {
                    expiresIn: '1h'
                });
                return {userId: user.id, token: token, tokenExpiration: 1}
                // can use token to store some data in it (first argument)
                // second argument is a string to hash token and used for validation (don't expose to clients)
            }
        }
}
