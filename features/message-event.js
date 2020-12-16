const deadChat = new RegExp(/(dead chat|chat dead|ded chat|chat ded)/ig)
module.exports = (client) => {
    client.on('message', async (message) => {
        const { author, guild } = message

        if (message.channel.type === 'dm') return
        
        if (message.channel.type === 'news') {
            message.crosspost()
        }
        
        if (author.bot) return  
        
        const pingCerz = new RegExp(/^<@!?729608920695439411>/)
        
        if (message.content.match(pingCerz) || message.content.match(/(Cerz)/ig)) {
          message.react('786355272431566848')
        }
        
        if (message.content.match(deadChat)) {
            message.channel.send(`<@${author.id}> didn't ask`)
        }


        const doWeird = async () => {
            try {

                console.log('giving some roles :D')

                const inviterMembers = guild.members.cache.filter((m) => m.roles.cache.has('750351684554981446'))

                const pingRolesMembers = guild.members.cache.filter(m => {
                    return m.roles.cache.has('757166041922142208') || m.roles.cache.has('779308285558784000') || m.roles.cache.has('759751843617964072') || m.roles.cache.has('779308286846828544') || m.roles.cache.has('779308286846828544')
                })

                const voterMembers = message.guild.members.cache.filter(m => {
                    return m.roles.cache.has('766554974557306880') || m.roles.cache.has('783281472974356521')
                })
                const boosters = guild.members.cache.filter((m) => {
                    return m.roles.cache.has('748343236984307753')
                })

                const mods = guild.members.cache.filter(m => m.roles.cache.has('768525304620515349'))

                const humans = guild.members.cache.filter((m) => !m.user.bot)

                humans.forEach((human) => {
                    human.roles.add('782177713997873153') // ----
                    human.roles.add('782175588752031784') // chri
                })

                inviterMembers.forEach((inviterMember) => {
                    inviterMember.roles.add('782177584334635008')
                });
                pingRolesMembers.forEach((pingRolesMember) => {
                    pingRolesMember.roles.add('782181126986530828')
                })
                boosters.forEach((booster) => {
                    booster.roles.add('782251957758722059')
                })
                mods.forEach((mod) => {
                    mod.roles.add('782251646423269407')
                })
                voterMembers.forEach((voter) => {
                    voter.roles.add('783280280785125377')
                })

            } catch (err) {
                console.error(err)
            }
        }
        
        // doWeird()

        if (message.content === '!rank') {
            message.delete({
                timeout: 10000
            })
            message.reply('My prefix is `.`, please try running `.rank` in <#738495918738767893>').then((m) => m.delete({
                timeout: 10000
            }))
        }

        if (message.member.premiumSinceTimestamp >= 2) {
            message.member.roles.add('780520734392975361')
        }

        if (message.channel.id !== '751394180261085234') return
        if (message.content.length >= 7) {
            message.delete()
            message.reply('You cannot send more than one word or more than 7 characters words in this channel!').then(m => m.delete({
                timeout: 6000
            }))
            return
        }
    })
}