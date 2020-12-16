const { MessageEmbed } = require('discord.js')
const Neko = require('neko-love.js')

module.exports = {
    description: 'Slaps someone',
    run: async (message, args) => {

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if (!target) {
            message.reply('Can\'t you mention someone to slap ?')
            return
        }
        const replies = [
            'You so lonely that you want to slap your self :(',
            'Can we be friends so we can slap each other :D',
            'I can hug you instead'
        ]

        const ra = replies[Math.floor(Math.random() * replies.length)]

        if (target === message.member) {
            message.reply(ra)
            return
        }

        const slapReplies = [
            `<@${message.member.id}> slaps <@${target.id}>`
        ]

        const slapRa = slapReplies[Math.floor(Math.random() * slapReplies.length)]

        Neko("slap").then(async (url) => {
            const slapEmbed = new MessageEmbed()
             .setTimestamp()
             .setColor('RANDOM')
             .setDescription(slapRa)
             .setImage(url)

             message.channel.send(slapEmbed)
        }) 
    }
}