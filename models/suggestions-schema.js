const mongoose = require('mongoose')

const suggestionsSchema = mongoose.Schema({
    guildId: {
        type: String,
        required: true,
    }, 
    suggestion: {
        type: Number,
        required: true,
        default: 0,
    }
})

module.exports = mongoose.model('suggestions', suggestionsSchema)