const {channelId} = require('../config.json');

module.exports = {
    name: 'guildBanAdd',
    execute(ban) {
        ban.fetch()
            .then(fetchedBan => {
                console.log(`${fetchedBan.user.username} has been banned.\nReason:\n${fetchedBan.reason}`)
                fetchedBan.guild.channels.fetch(channelId)
                    .then(channel => {
                        channel.send(`**${fetchedBan.user} has been banned.**\n**Reason:**\n${fetchedBan.reason}`)
                    })
                    .catch(() => console.log("Can't fetch channel."))

            })
            .catch(() => console.log("Can't fetch ban."))
    },
};