require('dotenv').config()

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Altair:Altairisnice@cheemfriend.bmxhj.mongodb.net/Data', { useNewUrlParser: true, useUnifiedTopology: true})

const { Client, Intents } = require('discord.js') 
const client = new Client({ 
  disableMentions: 'everyone',
  ws: { intents: Intents.ALL },
  presence: {
    activity: {
      name: 'Cheem Friend',
      type: 'WATCHING',
    }
  }
})

const WOKcommands = require('wokcommands') 

client.on('ready', async () => {
  console.log(`${client.user.tag} Is ready!!!`)
  
 new WOKcommands(client, 'cmds', 'features')
 .setDefaultPrefix(process.env.prefix)
 .setMongoPath(process.env.mongoPath)
})

client.login(process.env.token)