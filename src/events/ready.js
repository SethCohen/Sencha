const { EmbedBuilder } = require('discord.js');
const { guildId, memeChannelId } = require('../../config.json');
const { createDatabase, getGiveaways } = require('../helpers/dbModel');
const { createTimeout } = require('../helpers/giveawayTimeouts');
const cron = require('node-cron');
const justreddit = require('justreddit');

/**
 * Checks database for giveaways that are ending soon and creates a timeout for them.
 *
 * @param guild	The guild that the giveaways are in.
 */
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

/**
 * Posts a meme to the meme channel every 24 hours
 *
 * @param guild The guild to post the meme in
 */
const autopostWholesomeMemes = (guild) => {
	if (!memeChannelId) {
		console.error('memeChannelId not specified in config.json. Cannot post wholesome memes anywhere.');
		return;
	}

	// Schedules daily autoposting for 12:00pm EST
	cron.schedule('0 12 * * *', () => {
		justreddit.randomPostFromSub({ subReddit: 'wholesomememes' }).then((post) => {

			const embed = new EmbedBuilder()
				.setTitle(post.title)
				.setColor('#9eeeff')
				.setDescription(`[Image Source](${post.url}) | [Github](https://github.com/SethCohen/Sencha)`)
				.setImage(post.image);

			guild.channels.fetch(memeChannelId)
				.then(channel => {
					channel.send({ content: 'Here have a wholesome meme. 🙂', embeds: [embed] });
				})
				.catch(console.error);
		});
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