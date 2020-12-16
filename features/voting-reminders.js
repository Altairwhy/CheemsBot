const { MessageEmbed } = require('discord.js')

module.exports = async (client) => {

    const guild = client.guilds.cache.get('738332727950049362')
    const channel = guild.channels.cache.get('779667628363874365')

    const sendVotingReminders = async () => {

        const embed = new MessageEmbed()
         .setColor('RANDOM')
         .addField(`<:kek:772069282205007893> Vote for ${guild.name} on top.gg `, `Be sure to vote for us on top.gg every 12h! click [here](https://top.gg/servers/765603730652921946/vote)`)
         .addField('<:kannapeer:786316190011752499>  Rate us on DISBOARD.org', 'https://disboard.org/server/765603730652921946')

        channel.send(embed)
    }
    const send = async () => {
        const voters = guild.members.cache.filter((m) => {
            return m.roles.cache.has('766554974557306880') || m.roles.cache.has('783281472974356521')
        })
        voters.forEach((voter) => {
            voter.send('**Voting Reminder**\nYour vote has expired, to vote again go to this link: https://top.gg/servers/765603730652921946/vote, press `Vote`, and you should be good to go!\n\nThank you for voting for,us!')
        });
    }
    setTimeout(send, 43200000);
    setTimeout(sendVotingReminders, 10400000)
}