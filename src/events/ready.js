const { guildId, adminRoleId, memeChannelId } = require('../../config.json');
const { createDatabase, getGiveaways } = require('../helpers/dbModel');
const { createTimeout } = require('../helpers/giveawayTimeouts');
const fs = require('fs');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity('I love you.');

		// Set admin command perms
		const guild = client.guilds.cache.get(guildId);
		const commands = await guild.commands.fetch();
		const banCommand = await commands.find(command => command.name === 'ban');
		const permissions = [
			{
				id: adminRoleId,
				type: 'ROLE',
				permission: true,
			},
		];
		await banCommand.permissions.add({ permissions });

		// Check for active giveaways
		createDatabase();

		const giveaways = getGiveaways();
		console.log('Giveaways Found:', giveaways);

		// Set timers for giveaways
		for (const giveaway of giveaways) {
			guild.channels.fetch(giveaway.channelId)
				.then(channel => {
					channel.messages.fetch(giveaway.messageId)
						.then(message => {
							createTimeout(message, giveaway.amountWinners, giveaway.prize, giveaway.endDate);
						})
						.catch(console.error);
				})
				.catch(console.error);
		}

		// Autopost wholesome memes to meme channel
		const files = fs.readdirSync('./src/assets/wholesome-memes/');
		setInterval(() => {
			const chosenFile = files[Math.floor(Math.random() * files.length)];
			guild.channels.fetch(memeChannelId)
				.then(channel => {
					channel.send({ content: 'Here have a wholesome meme. 🙂', files: [`./src/assets/wholesome-memes/${chosenFile}`] });
				})
				.catch(console.error);
		}, 86400000);


	},
};