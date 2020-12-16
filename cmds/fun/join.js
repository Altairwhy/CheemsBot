module.exports = {
  commands: ['join', 'connect'],
  description: 'Joins a voice channel',
  callback: (message) => {

    const { voice } = message.member

    if (!voice.channelID) {
      message.delete({
        timeout: 3000
      })
      
      message.channel.send('<:Fail:769965557084454952> | You need to be in a voice channel first').then((m) => {
         m.delete({timeout: 3000})
       })
       return
    }

    voice.channel.join()
    message.channel.send('<:MarkCheck:772118527255642152> | joined!')
  }
}