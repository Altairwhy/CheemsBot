const { MessageEmbed } = require('discord.js')
const Neko = require('neko-love.js')

module.exports = {
    description: 'Pats someone',
    run: async (message, args) => {

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if (!target) {
            message.reply('Can\'t you mention someone to pat ?')
            return
        }

        const replies = [
            'You so lonely that you want to pat your self :(',
            'Can we be friends so we can pat each other :D',
            'I can pat you instead'
        ]

        const ra = replies[Math.floor(Math.random() * replies.length)]

        if (target === message.member) {
            message.reply(ra)
            return
        }

        const patReplies = [
            'Aww you look cutee',
            `<@${message.member.id}> pats <@${target.id}>`
        ]

        const patRa = patReplies[Math.floor(Math.random() * patReplies.length)]

        Neko("pat").then(async (url) => {
            const patEmbed = new MessageEmbed()
             .setTimestamp()
             .setColor('RANDOM')
             .setDescription(patRa)
             .setImage(url)

             message.channel.send(patEmbed)
        }) 
    }
}