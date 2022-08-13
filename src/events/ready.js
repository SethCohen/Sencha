const { guildId, memeChannelId } = require('../../config.json');
const { createDatabase, getGiveaways } = require('../helpers/dbModel');
const { createTimeout } = require('../helpers/giveawayTimeouts');
const fs = require('fs');
const cron = require('node-cron');

const startActiveGiveaways = (guild) => {
	const giveaways = getGiveaways();
	if (!giveaways.length) return;

	console.log('Giveaways Found:', giveaways);
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
};

const autopostWholesomeMemes = (guild) => {
	const files = fs.readdirSync('./src/assets/wholesome-memes/');

	// Schedules daily autoposting for 12:00pm EST
	cron.schedule('0 12 * * *', () => {
		const chosenFile = files[Math.floor(Math.random() * files.length)];
		guild.channels.fetch(memeChannelId)
			.then(channel => {
				channel.send({ content: 'Here have a wholesome meme. 🙂', files: [`./src/assets/wholesome-memes/${chosenFile}`] });
			})
			.catch(console.error);
	}, {
		scheduled: true,
		timezone: 'America/Toronto',
	});
};

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity('I love you.');
		const guild = client.guilds.cache.get(guildId);

		createDatabase();

		startActiveGiveaways(guild);

		autopostWholesomeMemes(guild);

	},
};