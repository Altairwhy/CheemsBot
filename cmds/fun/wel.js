module.exports = {
  cooldown: '5s',
  commands: ['wel', 'welcome'],
  description: 'Sends the welcome emoji',
  callback: (message) => {
    
    message.delete()

    message.channel.send('<a:welcome1:786585256634482708><a:welcome2:786585308572418049>')
  }
}