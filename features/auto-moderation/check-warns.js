const autoModSchema = require('../../models/moderation/auto-mod-schema')
const mongo = require('../../configuration/mongo')
const { MessageEmbed } = require('discord.js')

const checkWarns = async (message) => {
  await mongo().then(async () => {
    try {

      const { author, guild } = message

      const guildId = guild.id, userId = author.id
      if (author.bot) return

      const mutedRole = guild.roles.cache.find(role => {
        return role.name === 'Muted'
      })
      const resetWarns = async () => {
        await autoModSchema.updateOne({
          guildId,
          userId,
        }, {
            guildId,
            userId,
            warnings: 0
          })
      }

      if (message.member.hasPermission('BAN_MEMBERS')) {
        resetWarns()
        return
      }

      const results = await autoModSchema.find({
        userId,
        guildId,
      })

      for (const result of results) {
        const { warnings } = result

        if (warnings >= 3) {

          resetWarns()

          const member = message.guild.members.cache.get(userId)

          member.roles.add(mutedRole).then(() => {
            member.roles.remove('766694907686813736')
          })

          const reachedWarnings = new MessageEmbed()
            .setColor('RED')
            .setFooter('Cerz makes good bots, right?')
            .setDescription(`**${member.user.tag}** has been auto-muted for having more than \`3\` auto-moderation warnings, they will be unmuted in \`1h\``)
          message.channel.send(reachedWarnings)

          setTimeout(() => {
            member.send(`You have been unmuted in ${guild.name}`)
            member.roles.remove(mutedRole).then(() => {
              member.roles.add('766694907686813736')
            })
          }, 1000 * 60 * 60 * 60)
        }

      }


      const deleteWarnings = async () => {
        await autoModSchema.deleteMany({
          guildId,
        })
      }

      setTimeout(() => {
        deleteWarnings()
      }, 1000 * 60 * 60 * 24)

    } catch (err) {
      console.error(err)
    }
  })
}

module.exports.checkWarns = checkWarns