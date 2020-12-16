module.exports = {
  description: "Does nothing",
  run: async (message) => {

    const target = message.mentions.members.first()

    if (!target) {
      message.reply('Ping someone or i demote you instead')
      return
    }

    const messages = ['Did you just try to demote them-',
      `I hate <@${target.id}> too, so i'm just gonna demote :D`,
      `<@${target.id}> has been demoted and banned`,
      'You have been demoted instead :D', 'No', 'WTF did you just try to do??',
      `No, <@${target.id}> is kool!`,
      'Maybe...', 'I thought you guys were friends >:(']

    const r = messages[Math.floor(Math.random() * messages.length)]

    message.channel.send(r)
  }
}