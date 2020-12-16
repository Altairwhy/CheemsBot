const mongoose = require('mongoose');

const reqNumber = {
    type: Number,
    default: 0,
}

const reqString = {
    type: String,
    required: true,
}

const levelsSchema = mongoose.Schema({
    guildId: reqString,
    userId: reqString,
    xp: reqNumber,
    level: reqNumber,
    needed: reqNumber,
})

module.exports = mongoose.model('level and xp system', levelsSchema, 'level and xp system')