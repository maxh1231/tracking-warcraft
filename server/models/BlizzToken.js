const { Schema, model } = require('mongoose');

const tokenSchema = new Schema(
    {
        access_token: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 120
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);


const BlizzToken = model('Token', tokenSchema);

module.exports = BlizzToken;
