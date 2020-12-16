const Discord = require('discord.js')

module.exports = {
  commands: ['servericon', 'serverpfp'],
  description: 'Sends the icon of a server',
  callback: (message) => {

    const serverPfp = message.guild.iconURL({
      dynamic: true,
      size: 4096
    })
    const embed = new Discord.MessageEmbed()
    .setTimestamp()
    .setTitle(`Server Icon for ${message.guild.name}`)
    .setImage(message.guild.iconURL({
      dynamic: true,
      size: 4096
    }))
    .setColor('BLUE')
    .setDescription(`Click [here](${serverPfp}) for the icon link`)

    message.channel.send(embed)
  }
}