const sameMessageSchema = require('../../models/moderation/same-message-schema')
const autoModSchema = require('../../models/moderation/auto-mod-schema')
const { checkWarns } = require('./check-warns')

module.exports = (client) => {
    client.on('message', async (message) => {

        if (message.channel.type === 'dm') return

        const { guild, member, content, author } = message
        if (author.bot) return

        const guildId = guild.id, userId = author.id

        if (member.id === guild.owner.id) {
            return
        }

        const result = await sameMessageSchema.findOne({
            guildId,
            userId,
        })

        if (result === null) {
            await sameMessageSchema.findOneAndUpdate({
                guildId,
                userId,
            }, {
                guildId,
                userId,
                msg: content,
                msgCount: 0
            }, {
                upsert: true,
                new: true,
            })
            return
        }

        if (result.msg === content) {
            await sameMessageSchema.findOneAndUpdate({
                guildId,
                userId,
            }, {
                guildId,
                userId,
                msg: content,
                $inc: {
                    msgCount: 1
                }
            }, {
                upsert: true,
                new: true
            })

        } else {
            await sameMessageSchema.findOneAndUpdate({
                guildId,
                userId,
            }, {
                guildId,
                userId,
                msg: content,
                msgCount: 0
            }, {
                upsert: true,
                new: true
            })
        }

        if (result.msgCount >= 3) {
            
            await sameMessageSchema.findOneAndUpdate({
                guildId,
                userId,
            }, {
                guildId,
                userId,
                msg: content,
                msgCount: 0
            }, {
                upsert: true,
            })
            await autoModSchema.findOneAndUpdate({
                guildId,
                userId,
            }, {
                guildId: message.guild.id,
                userId: message.author.id,
                $inc: {
                    warnings: 3
                }
            }, {
                upsert: true,
            })
            
            message.reply('Do not spam! All your last messages has the same content').then((m => {
                m.delete({
                    timeout: 10000
                })
            }))

            checkWarns(message)
        }
    })
}