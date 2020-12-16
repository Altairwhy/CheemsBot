const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true,
}

const sameMessageSchema = mongoose.Schema({
    guildId: reqString,
    userId: reqString,
    msg: reqString,
    msgCount: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('same-messages', sameMessageSchema)