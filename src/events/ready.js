const { guildId, adminRoleId } = require('../../config.json');
const { createDatabase, getGiveaways } = require('../helpers/dbModel');
const { createTimeout } = require('../helpers/giveawayTimeouts');

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


	},
};