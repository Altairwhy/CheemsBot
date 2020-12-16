module.exports = {
  commands: ['boosterlvl', 'boosterlevel', 'boosterlv'],
  description: 'Shows the server boosts',
  callback: (message) => {

    const { guild } = message

    const { MessageEmbed } = require('discord.js')

    const e = new MessageEmbed()
    .setColor('#f141fd')
    .setTimestamp()
    .setTitle('Boost Count')
    .setDescription(`<:Boost:772811518366449675> We are at level **${guild.premiumTier}** boosts!`)
    .setFooter('Why so pog?')
    message.channel.send(e)
  }
}