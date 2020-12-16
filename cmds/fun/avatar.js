const Discord = require('discord.js')

module.exports = {
    commands: ['avatar', 'av', 'pfp'],
    description: 'Sends the avatar of a user.',

    callback: (message, args) => {

        const { guild, channel } = message
        
        const member = message.mentions.members.first() || guild.members.cache.get(args[0]) || message.member


        const avatar = member.user.displayAvatarURL({size: 4096, dynamic: true})

        if (member) {
            var wow = new Discord.MessageEmbed()
            .setImage(avatar)
            .setTimestamp()
            .setDescription(`[Avatar URL](${avatar})`)
            .setColor(message.member.roles.highest.hexColor)
            .setTitle(member.user.tag)
            channel.send(wow)
        }
    },

}