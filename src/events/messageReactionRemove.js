const { starboardChannel } = require('../../config.json');
const { getStarboard, removeFromStarboard } = require('../helpers/dbModel');
const { EmbedBuilder } = require('@discordjs/builders');
module.exports = {
	name: 'messageReactionRemove',
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
				.setDescription(`${messageReaction.message.content}.\n\n[Jump To Message](${messageReaction.message.url})`)
				.setImage(messageReaction.message.attachments.first().url)
				.setTimestamp(messageReaction.message.createdTimestamp);

			messageReaction.message.guild.channels.fetch(starboardChannel)
				.then(async channel => {
					if (messageReaction.count < 1) {
						const starboard = await getStarboard(messageReaction.message.id);
						const starboardMsg = await channel.messages.fetch(starboard.starboardId);
						await starboardMsg.delete();
						removeFromStarboard(messageReaction.message.id);
					}
					else {
						const starboard = await getStarboard(messageReaction.message.id);
						channel.messages.fetch(starboard.starboardId)
							.then(message => {
								message.edit({ embeds: [embed] });
							})
							.catch(console.error);
					}
				})
				.catch(console.error);
		}

	},
};