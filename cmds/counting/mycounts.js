const countingSchema = require('../../models/counting-schema')
const mongo = require('../../configuration/mongo')

module.exports = {
    commands: ['mycounts', 'counts'],
    description: 'Checks how many counts you have',
    run: async (message, args) => {

        await mongo().then(async () => {
            try {
                const userId = message.author.id
                const guildId = message.guild.id

                const result = await countingSchema.findOne({
                    userId,
                    guildId,
                })

                const secondResult = await countingSchema.findOne({
                    guildId,
                })

                if (!result.userCounts) {
                    message.reply('You have no counts yet in <#768190407850459158>')
                    return
                }
                let msg = `You now have \`${result.userCounts}\` counts! And we are now at \`${secondResult.count}\` counts!`

                message.reply(msg)
            } catch (err) {
                console.error(err)
            }
        })
    }
}