const Discord = require('discord.js')

module.exports = {
  commands: ['vote', 'voting', 'votes'],
  description: 'Sends the link to vote for the server',
  callback: (message) => {

    const someLink = 'https://top.gg/servers/765603730652921946/vote'
    const embed = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setTitle('Link to vote for the server on top.gg')
    .setTimestamp()
    .setDescription(`Click [here](${someLink}) for the link, perks for every role can be found in <#739911321021186151>`)
    .setFooter('We really do appreciate votes!', message.guild.iconURL({
      dynamic: true
    }))


    message.channel.send(embed)

  }
}