
const link = new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/ig)
const discordInvite = new RegExp(/(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/ig)

module.exports = {
  commands: ['say'],
  description: 'Sends a message by the bot',
  callback: (message, args) => {

    const content = args.join(' ')

    if (message.author.bot) {
      return
    }

    if (content.match(link)|| content.match(discordInvite) || content.match(link)) return
    if (!content) {s
      message.delete({
        timeout: 3000
      })
      message.channel.send('<:Fail:769965557084454952> | Your message was too short, maybe send something actually or learn to type...').then((m) => {
        m.delete({ timeout: 3000 })
      })
      return


    }

    if (content.startsWith('.')) {
      message.delete()
      message.reply('Your message can\' be a command').then((m) => {
        m.delete({
          timeout: 2400
        })
      })
      return
    }
    const stupidPong = message.mentions.roles.first()

    if (stupidPong) {

      message.channel.send("Didn't really work my guy :( ")
      return
    }
    message.delete()
    message.channel.send(content)

  }
}