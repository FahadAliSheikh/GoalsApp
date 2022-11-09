const mongooose = require('mongoose');
const goalSchema = mongooose.Schema({
    user: {
        type: mongooose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
}, {
    timestamps: true,
})

module.exports = mongooose.model('Goal', goalSchema);