const { Schema, model } = require('mongoose');

const tokenSchema = new Schema(
    {
        access_token: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 65000
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);


const BlizzToken = model('BlizzToken', tokenSchema);

module.exports = BlizzToken;
