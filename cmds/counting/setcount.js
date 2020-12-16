const countingSchema = require('../../models/counting-schema')
const mongo = require('../../configuration/mongo')

module.exports = {
    requiredPermissions: ['ADMINISTRATOR'],
    description: 'Updates the the count if the bot was down',
    run: async (message, args) => {

        const newCount = args[0]
        if (!newCount) {
            message.delete()
            message.reply('Please provide a new count!').then(m => m.delete({
                timeout: 4000
            }))
            return
        }

        if (isNaN(newCount)) {
            message.delete()
            message.reply('Please provide a new count!').then(m => m.delete({
                timeout: 4000
            }))
            return
        }

        await mongo().then(async () => {
            try {
                await countingSchema.findOneAndUpdate({
                    guildId: message.guild.id,
                }, {
                    guildId: message.guild.id,
                    count: newCount - 1,
                }, {
                    upsert: true,
                    new: true
                })

                message.reply(`The next count has been set to \`${newCount}\``)
            } catch (err) {
                console.error(err)
            }
        })
    }
}