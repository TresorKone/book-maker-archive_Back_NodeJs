const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    fullName: {
        type: String,
        require: false
    },
    description: {
        type: String,
        require: false
    },
    account:
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true
        }
}, {timestamps: true});

module.exports = mongoose.model('Profile', profileSchema);