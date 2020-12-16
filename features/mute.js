const muteSchema = require('../models/moderation/mute-schema')
const mongo = require('../configuration/mongo')

module.exports = async (client) => {

    await mongo().then(async () => {
        try {
            const checkMutes = async () => {
                const now = new Date()

                const conditionnal = {
                    expires: {
                        $lt: now
                    },
                    current: true
                }

                const results = await muteSchema.find(conditionnal)

                if (results && results.length) {

                    for (const result of results) {

                        const { guildId, userId } = result

                        const guild = client.guilds.cache.get(guildId)
                        const member = (await guild.members.fetch()).get(userId)

                        if (!member) return 
                        
                        if (member.user.bot) return 

                        const mutedRole = guild.roles.cache.find(role => {
                            return role.name === 'Muted'
                        })

                        member.roles.remove(mutedRole).then(() => {
                            member.roles.add('766694907686813736')
                          })
                    }

                    await muteSchema.updateMany(conditionnal, {
                        current: false,
                    })
                }

                setTimeout(checkMutes, 1000 * 50 * 10)
            }

            checkMutes()

            client.on('guildMemberAdd', async (member) => {
                const { guild, id } = member

                const currentMute = await muteSchema.findOne({
                    userId: id,
                    guildId: guild.id,
                    current: true
                })

                const mutedRole = guild.roles.cache.find(role => {
                    return role.name === 'Muted'
                })

                if (currentMute) {
                    member.roles.add(mutedRole)

                }
            })
        } catch (err) {
            console.error(err)
        }
    })
}