const { MessageEmbed } = require('discord.js')

module.exports = {
  cooldown : '30s',
  commands: ['membercount', 'members'],
  description: 'Sends the member count of a server',
  callback: (message) => {

    const bots = message.guild.members.cache.filter(m => m.user.bot)
    const humans = message.guild.members.cache.filter(m => !m.user.bot)

    const embed = new MessageEmbed()
    .setTitle(`Members for ${message.guild.name}`)
    .setColor('GREEN')
    .setDescription(`\`${message.guild.memberCount}\` members!`)
    .addField('Humans', `\`${humans.size}\``)
    .addField('Bots', `\`${bots.size}\``)
    .setTimestamp()
    .setThumbnail(message.guild.iconURL({
      dynamic: true
    }))

    message.channel.send(embed)
  }
}