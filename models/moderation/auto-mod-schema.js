const mongoose = require('mongoose')
const requiredString = {
    type: String,
    required: true
}
const autoModSchema = mongoose.Schema({
    userId: requiredString,
    guildId: requiredString,
    warnings: {
        type: Number,
        default: 0,
        required: true,
    }
})

module.exports = mongoose.model('auto-moderation', autoModSchema)