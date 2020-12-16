const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}
const number = {
    type: Number,
    default : 0,
}
const countingSchema = mongoose.Schema({
    guildId: reqString,
    userId: reqString,
    userCounts: number,
    count: number,
    cooldown: number,
})

module.exports = mongoose.model('counting', countingSchema, 'counting')