const mongooose = require('mongoose');
const userSchema = mongooose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name value']
    },
    email: {
        type: String,
        require: [true, 'Please provide an email'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'Please provide a password']
    }
}, {
    timestamps: true,
})

module.exports = mongooose.model('User', userSchema);