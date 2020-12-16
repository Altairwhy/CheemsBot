const levelsSchema = require('../../models/levels-schema')
const mongo = require('../../configuration/mongo')

module.exports = (client) => {
    client.on('message', async (message) => {
        const { guild, member, author } = message
        if (message.channel.type === 'dm') return
        if (author.bot) return

        if (member.roles.cache.has('686556288880345088')) return
        if (message.channel.id === '762740698859569153') return

        let xpAdded = Math.floor(Math.random() * 50) + 1 + +message.content.length

        if (member.roles.cache.has('739877075648774206')) {
            xpAdded = Math.floor(Math.random() * 60) + 1 + +message.content.length
        } // Lv 5

        if (member.roles.cache.has('755851430421725245')) {
            xpAdded = Math.floor(Math.random() * 70) + 1 + +message.content.length
        } // 10 invites

        if (member.roles.cache.has('748343236984307753')) {
            xpAdded = Math.floor(Math.random() * 100) + 1 + +message.content.length
        } // 1 boost

        if (member.roles.cache.has('780520734392975361')) {
            xpAdded = Math.floor(Math.random() * 200) + 1 + +message.content.length
        } // 2 boosts

        addXP(guild.id, member.id, xpAdded, message)

    })
}

const addXP = async (guildId, userId, xpToAdd, message) => {

    const getNeededXP = (level) => level * level * 50

    const { member } = message

    await mongo().then(async () => {
        try {
            let result = await levelsSchema.findOneAndUpdate({
                guildId,
                userId,
            }, {
                guildId,
                userId,
                $inc: {
                    xp: xpToAdd
                }
            }, {
                upsert: true,
                new: true,
            })

            let { xp, level } = result
            const needed = getNeededXP(level)

            if (xp >= needed) {
                level++
                xp = 0
                message.channel.send(
                    `<:lightningbolt:768859060866908190> <@${message.author.id}>, You have reached level \`${level}\`
                `)

                await levelsSchema.updateOne({
                    guildId,
                    userId
                }, {
                    level,
                    xp,
                    needed,
                })
            }

        if (message.author.id === '472534605107560460') return
        
            if (level >= 100) {
                member.roles.remove('786838345299918869')
                member.roles.add('786838554520191008')
                return
            }

            if (level >= 90) {
                member.roles.remove('786838082702802984')
                member.roles.add('786838345299918869')
                return
            }i
            if (level >= 80) {
                member.roles.remove('785019796172963862')
                member.roles.add('786838082702802984')
                return
            }
            if (level >= 70) {
                member.roles.remove('785019868931948544')
                member.roles.add('785019796172963862')
                return
            }
            if (level >= 60) {
                member.roles.remove('785019663997337630')
                member.roles.add('785019868931948544')
                return
            }
            if (level >= 50) {
                member.roles.remove('785019566568112159')
                member.roles.add('785019663997337630')
                return
            }
            if (level >= 40) {
                member.roles.remove('785330262698885131')
                member.roles.add('785019566568112159')
                return
            }
            if (level >= 30) {
                member.roles.remove('765608850870894653')
                member.roles.add('785330262698885131')
                return
            }
            if (level >= 25) {
                member.roles.remove('765640795465711616')
                member.roles.add('765608850870894653')
                return
            }
            if (level >= 20) {
                member.roles.remove('765609582366031872')
                member.roles.add('765640795465711616')
                return
            }
            if (level >= 15) {
                member.roles.remove('765613293909442570')
                member.roles.add('765609582366031872')
                return
            }
            if (level >= 10) {
                member.roles.remove('765607634271076402')
                member.roles.add('765613293909442570')
                return
            }
            if (level >= 5) {
                member.roles.add('765607634271076402')
                member.roles.remove('786837456263053323')
                return
            }

            if (level >= 1) {
                member.roles.add('786837456263053323')
                return
            }

        } catch (err) {
            console.error(err)
        }
    })
}