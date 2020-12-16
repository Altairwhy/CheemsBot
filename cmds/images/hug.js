const { MessageEmbed } = require('discord.js')
const Neko = require('neko-love.js')

module.exports = {
    description: 'Hugs someone',
    run: async (message, args) => {

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if (!target) {
            message.reply('Can\'t you mention someone to hug ?')
            return
        }
        const replies = [
            'You so lonely that you want to hug your self :(',
            'Can we be friends so we can hug each other :D',
            'How can humans hug their selfs ?',
            'I can hug you instead'
        ]

        const ra = replies[Math.floor(Math.random() * replies.length)]

        if (target === message.member) {
            message.reply(ra)
            return
        }

        const hugReplies = [
            'Aww you look cutee',
            `<@${message.member.id}> hugs <@${target.id}>`
        ]

        const hugRa = hugReplies[Math.floor(Math.random() * hugReplies.length)]

        Neko("hug").then(async (url) => {
            const hugEmbed = new MessageEmbed()
             .setTimestamp()
             .setColor('RANDOM')
             .setDescription(hugRa)
             .setImage(url)

             message.channel.send(hugEmbed)
        }) 
    }
}