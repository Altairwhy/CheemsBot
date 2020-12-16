const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const warnSchema = mongoose.Schema({
    guildId: reqString,
    userId: reqString,
    warnings: {
        type: [Object],
        required: true
    },
})

module.exports = mongoose.model('warnings', warnSchema)