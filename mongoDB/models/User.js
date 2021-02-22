const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
        minlength: 6,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    pictures: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'picture' }
    ]
})
module.exports = mongoose.model('User', userSchema)