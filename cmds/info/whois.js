const Discord = require('discord.js')
const moment = require('moment')

module.exports = {
    cooldown: '30s',
    commands: ['whois', 'userinfo', 'profile'],
    description: 'Sends info on a user',
    run: async (message, args) => {

        const member = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase()) || message.member
        const status = {
            online: "Online",
            idle: "Idle",
            dnd: "Do Not Disturb",
            offline: "Offline/Invisible"
          };
      
          const info = new Discord.MessageEmbed()
          .setAuthor(`${member.user.username}'s Info`, member.user.displayAvatarURL({
              dynamic: true
          }))
          .setColor('RANDOM')
          .setThumbnail(member.user.displayAvatarURL({
              dynamic: true,
          }))
          .setTimestamp()
          .addField("User ID:", member.id)
          .addField("Status", status[member.user.presence.status], true)
          .addField("Joined At", moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss"), true)
          .addField("Created At", moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss"), true)
          .addField("Avatar:", member.user.displayAvatarURL({
              dynamic: true,
          }));
      
          message.channel.send(info)
    }
}