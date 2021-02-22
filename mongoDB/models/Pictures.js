
const mongoose = require('mongoose');
const pictureSchema = mongoose.Schema({
    idPic: {
        type: Number
    },
    title: {
        type: String,
        minlength: 1
    },
    url: {
        type: String,
    },
    thumbnailUrl: {
        type: String,
    },
    owner: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }]
})
module.exports = mongoose.model('picture', pictureSchema)