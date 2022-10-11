const { starboardChannelId } = require('../../config.json');
const { insertStarboard, getStarboard, starboardUsers } = require('../helpers/dbModel');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'messageReactionAdd',
	async execute(messageReaction, user) {
		if (messageReaction.partial) await messageReaction.fetch();

		if (messageReaction.emoji.toString() === '⭐') {
			const embed = new EmbedBuilder()
				.setAuthor({
					name: messageReaction.message.author.tag,
					iconURL: messageReaction.message.author.displayAvatarURL(),
				})
				.setTitle(`🌟 ${messageReaction.count}`)
				.setColor(0xfdd835)
				.setDescription(`${messageReaction.message.content}\n\n[Jump To Message](${messageReaction.message.url})`)
				.setTimestamp(messageReaction.message.createdTimestamp);

			if (messageReaction.message.attachments.size > 0) embed.setImage(messageReaction.message.attachments.first().url);

			messageReaction.message.guild.channels.fetch(starboardChannelId)
				.then(async channel => {
					if (messageReaction.count === 5) {
						const starboardMsg = await channel.send({ embeds: [embed] });
						insertStarboard(starboardMsg.id, messageReaction.message.id, messageReaction.message.url, messageReaction.count);
						starboardUsers(messageReaction.message.author.id, 1, 0);
						starboardUsers(user.id, 0, 1);
					}
					else if (messageReaction.count > 5) {
						const starboard = await getStarboard(messageReaction.message.id);
						channel.messages.fetch(starboard.starboardId)
							.then(message => {
								message.edit({ embeds: [embed] });
								insertStarboard(message.id, messageReaction.message.id, messageReaction.message.url, messageReaction.count);
								starboardUsers(messageReaction.message.author.id, 1, 0);
								starboardUsers(user.id, 0, 1);
							})
							.catch(console.error);
					}
				})
				.catch(console.error);
		}
	},
};