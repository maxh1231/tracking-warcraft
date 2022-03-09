const { Schema, model } = require('mongoose');

const tokenSchema = new Schema(
    {
        access_token: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            required: true
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
