const { GuildMember } = require('discord.js')
const mongo = require('../../configuration/mongo')
const autoModSchema = require('../../models/moderation/auto-mod-schema')
const { checkWarns } = require('./check-warns')

module.exports = (client) => {
    client.on('message', async (message) => {
        const { author, guild, content } = message

        if (message.channel.type === 'dm') return 

        const guildId = guild.id, userId = author.id

        if (author.bot) return 

        const lines = content.split(/\r\n|\r|\n/).length

        await mongo().then(async () => {
            try {
                if (lines >= 5 && !message.member.hasPermission('ADMINISTRATOR')) {
                    await autoModSchema.findOneAndUpdate({
                        guildId,
                        userId,
                    }, {
                        guildId,
                        userId,
                        $inc: {
                            warnings: 3
                        }
                    }, {
                        upsert: true,
                        new: true,
                    })
                    message.delete()
                    message.reply('Do not send 5 lines messages!').then((msg) => {
                        msg.delete({
                            timeout: 5000
                        })
                  })

                  checkWarns(message)

                }
            } catch (err) {
                console.error(err)
            }
        })
    })
}