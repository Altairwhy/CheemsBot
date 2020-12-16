const { MessageEmbed } = require('discord.js')

module.exports = (client) => {
  
  client.on("guildMemberUpdate", async (oldMember, newMember) => {
      
    if (!oldMember.premiumSince && newMember.premiumSince) {

      const { guild } = newMember
      
      const channelId = '739444766130831429'

      const channel = guild.channels.cache.get(channelId)

      channel.send(`<a:boost:772813966590083112> **${newMember.user.tag}** Just boosted the server!`).then(msg => {
        msg.react('757667184792305675')
      })

      var ee = new MessageEmbed()
      .setColor('#f141fd')
      .setTitle('TYSM!! for boosting!')
      .setTimestamp()
      .setDescription('<:Boost:772811518366449675> You now have access to all booster perks! more info is in <#739911321021186151>. Now please DM an active staff member to claim your custom role!')
      .setFooter('You are kool')
      .setImage(newMember.user.displayAvatarURL({
        dynamic: true
      }))
      try {

        newMember.send(ee)

      } catch(err) {

        console.log('The booster has their dms off')
    }

    return
  }

})
client.on('messageDelete', (message) => {
  return
    if (message.author.bot) return;
    if (message.channel.id === '762740698859569153') return 
    if (message.mentions.members.first() && !message.mentions.members.first().user.bot && message.mentions.members.first().user.id !== message.author.id && !message.content.startsWith('.')) {

        let embed = new MessageEmbed()
            .setTitle('Ghost Ping Detected')
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter('Haha', message.author.displayAvatarURL({
              dynamic: true
            }))
            .addField('Author', message.author)
            .addField('Message', message.content);

        message.channel.send(embed)
    }
})

    const updateMembers = (guild) => {

        const channel = guild.channels.cache.get('766503490695725067')
    
        channel.setName(`Members: ${guild.memberCount}`)
      }
    
client.on('guildMemberAdd', (member) => {
    
        updateMembers(member.guild)
      }) 
    
client.on('guildMemberLeave', (member) => {
        
        updateMembers(member.guild)
      })
    
      const guild = client.guilds.cache.get('766503490695725067no')
    
      updateMembers(guild)
}