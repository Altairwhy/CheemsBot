const Discord = require('discord.js')

module.exports = (client) => {
    client.on('guildMemberAdd', async (member) => {

        const { guild, id } = member
        const channelId = "765658318269972530"
        const channel = guild.channels.cache.get(channelId)
        var rules = guild.channels.cache.get('765615007852920842')

        rules.send(`<@${id}>`).then((m) => m.delete({
            timeout: 1000
        }))
        
        const someOtherEmbed = new Discord.MessageEmbed()
         .setTitle('New member!!')
         .setColor('BLUE')
         .setDescription(`**${member.user.tag}**, Welcome to the server! Enjoy your stay :D`)
         .setTimestamp()
         
        channel.send(someOtherEmbed)

        const serverLink = 'https://discord.gg/XuZ2MbD'

        const welcomeEmbed = new Discord.MessageEmbed()
        .setImage('https://media.discordapp.net/attachments/755075404854853693/772050615425564702/PicsArt_10-31-11.52.33.png?width=911&height=475')
        .setTitle(`Welcome ${member.user.tag} <a:PeepoParty:746337177989939321>`)
        .setColor('GREEN')
        .setTimestamp()
        .setFooter(`You are member #${guild.memberCount}`, client.user.displayAvatarURL())
        .setDescription(`
        Hello! Many thanks for joining **${guild.name}**, we are glad you are here! To have access to all member channels in the server

Permanent Server link [Here](${serverLink})
`)

        try {

            member.send(welcomeEmbed)

        } catch(err) {

            console.log(err)

        }
    })
}