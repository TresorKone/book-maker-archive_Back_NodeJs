const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    books: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Book'
        }
    ],
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);