const { MessageEmbed } = require('discord.js')
const Neko = require('neko-love.js')

module.exports = {
    description: 'Cries',
    run: async (message, args) => {

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member 

        const cryReplies = [
            'Oh no',
            `<@${target.id}> Cries :(`
        ]

        const cryRa = cryReplies[Math.floor(Math.random() * cryReplies.length)]

        Neko("cry").then(async (url) => {
            const cryEmbed = new MessageEmbed()
             .setTimestamp()
             .setColor('RANDOM')
             .setDescription(cryRa)
             .setImage(url)

             message.channel.send(cryEmbed)
        }) 
    }
}