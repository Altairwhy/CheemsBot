const countingSchema = require('../../models/counting-schema')
const mongo = require('../../configuration/mongo')
const { MessageEmbed } = require('discord.js')

module.exports = (client) => {
  client.on('message', async (message) => {
    const { channel, guild, content, author, member } = message
    const countingChannel = '768190407850459158node'
    if (channel.type === 'dm') return

    const guildId = guild.id
    const userId = author.id

    if (author.bot) return
    if (channel.id != countingChannel) return
    if (content.startsWith('.')) return

    if (isNaN(content)) {
      message.delete()
      message.reply('Please only use this channel for counting!').then(m => m.delete({
        timeout: 3000
      }))
      return
    }

    await mongo().then(async () => {
      try {

        const result = await countingSchema.findOneAndUpdate({
          guildId,
        }, {
            guildId,
            $inc: {
              count: 1,
            }
          }, {
            upsert: true,
            new: true,
          })

        const userResult = await countingSchema.findOneAndUpdate({
          guildId,
          userId,
        }, {
            guildId,
            userId,
            $inc: {
              userCounts: 1,
            }
          }, {
            upsert: true,
            new: true,
          })

        if (userResult.userCounts >= 25 && !member.roles.cache.has('7768185830136610906')) {
          const counterRole = guild.roles.cache.find(role => {
            return role.id === '768185830136610906'
          })

          member.roles.add(counterRole)
          const gg = new MessageEmbed()
            .setColor(counterRole.hexColor)
            .setDescription(`<@${member.id}>, GG! You have got the <@&${counterRole.id}> for having more than 25 counts <a:PeepoParty:746337177989939321> <a:PeepoParty:746337177989939321> <a:PeepoParty:746337177989939321>`)
          channel.send(gg)
        }

        if (content === result.count) {

          const a = await countingSchema.findOne({
            guildId,
            userId,
            cooldown: 1
          })

          if (a) {
            await countingSchema.findOneAndUpdate({
              guildId,
            }, {
                guildId,
                $inc: {
                  count: -1,
                }
              }, {
                upsert: true,
                new: true,
              })
            await countingSchema.findOneAndUpdate({
              guildId,
              userId,
            }, {
                guildId,
                userId,
                $inc: {
                  userCounts: -1,
                }
              }, {
                upsert: true,
              })

            message.delete()
            message.reply('You cannot send two counts after each!').then((msg) => msg.delete({
              timeout: 10000
            }))
          } else {
            await countingSchema.updateMany({
              guildId,
            }, {
                cooldown: 0
              }).then(async () => {
                await countingSchema.findOneAndUpdate({
                  guildId,
                  userId
                }, {
                    guildId,
                    userId,
                    $inc: {
                      cooldown: 1
                    }
                  }, {
                    upsert: true,
                    new: true,
                  })
              })
          }

        }

        if (content != result.count) {

          await countingSchema.findOneAndUpdate({
            guildId,
          }, {
              guildId,
              $inc: {
                count: -1,
              }
            }, {
              upsert: true,
              new: true,
            })

          await countingSchema.findOneAndUpdate({
            guildId,
            userId,
          }, {
              guildId,
              userId,
              $inc: {
                userCounts: -1,
              }
            }, {
              upsert: true,
              new: true,
            })

          message.delete()
          message.reply(`The next count must be \`${result.count}\``).then((m) => m.delete({
            timeout: 4000
          }))
          return
        }

      } catch (err) {
        console.error(err)
      }
    })
  })
}