const { MessageEmbed } = require('discord.js')

module.exports = {
  globalCooldown: '1m',
  commands: ['poll', 'polls'],
  description: 'Makes a poll',
  callback: (message, args) => {

    const { member, channel } = message

     if (!member.hasPermission('CHANGE_NICKNAME')) {
       message.delete({timeout: 3000})
       message.channel.send('<:Fail:769965557084454952> | You do not the required permission to run this command').then((m) => {
         m.delete({timeout: 2000})
       })
       return
     }

     const content = args.join(' ')

     if (!content) {
       message.delete({timeout: 3000})
       channel.send('<:Fail:769965557084454952> | Please provide something to be voted on').then((m) => {
         m.delete({timeout: 3000})
       })
       return
     }

     message.delete()
     const poll = new MessageEmbed()
     .setTimestamp()
     .setTitle(`Poll by ${member.user.tag}`)
     .setDescription(`${content} ?`)
     .setFooter('Vote now!', message.member.user.displayAvatarURL({
       dynamic: true
     }))


     if (member.hasPermission('MANAGE_GUILD') && message.channel.id === '769498921524658177') {
       message.channel.send('<@&779308286846828544>', poll).then(message => {
        message.react('745613383763623936')
          .then(() => {
              message.react('748481681044013066') 
          })
        })

     } else {

      message.channel.send(poll).then(message => {
        message.react('745613383763623936')
          .then(() => {
              message.react('748481681044013066') 
          })
        })
     }
  }
}