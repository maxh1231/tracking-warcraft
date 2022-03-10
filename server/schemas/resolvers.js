const { AuthenticationError } = require('apollo-server-express');
const { User, BlizzToken } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                return userData;
            }
            throw new AuthenticationError('Log in required');
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user)
            return { token, user }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found');
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        addToken: async (parent, args) => {
            const token = await BlizzToken.create(args.access_token);

            console.log(args);
            return { token }
        },
    }
}



module.exports = resolvers;