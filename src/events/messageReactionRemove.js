import { getStarboard, removeFromStarboard, starboardUsers } from '../helpers/dbModel.js';
import { EmbedBuilder } from 'discord.js';

/**
 * Handles starboard events on reaction removal.
 *
 * @param messageReaction	The reaction that was removed.
 * @param user				The user that removed the reaction.
 * @returns {Promise<void>}	Nothing.
 */
const handleStarboardReactionRemove = async (messageReaction, user) => {
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

	if (!process.env.STARBOARD_CHANNEL_ID) {
		console.error('starboardChannelId is not specified in config.json. Cannot remove from starboard.');
		return;
	}

	messageReaction.message.guild.channels.fetch(process.env.STARBOARD_CHANNEL_ID)
		.then(async channel => {
			if (messageReaction.count < 5) {
				const starboard = await getStarboard(messageReaction.message.id);
				if (!starboard) return null;
				const starboardMsg = await channel.messages.fetch(starboard.starboardId);
				await starboardMsg.delete();
				removeFromStarboard(messageReaction.message.id);
				starboardUsers(messageReaction.message.author.id, -1, 0);
				starboardUsers(user.id, 0, -1);
			}
			else {
				const starboard = await getStarboard(messageReaction.message.id);
				channel.messages.fetch(starboard.starboardId)
					.then(message => {
						message.edit({ embeds: [embed] });
						starboardUsers(messageReaction.message.author.id, -1, 0);
						starboardUsers(user.id, 0, -1);
					})
					.catch(console.error);
			}
		})
		.catch(console.error);

};

export default { name: 'messageReactionRemove',
	async  execute(messageReaction, user) {
		if (messageReaction.partial) {await messageReaction.fetch();}
		if (messageReaction.emoji.toString() === '⭐') {await handleStarboardReactionRemove(messageReaction, user);}
	} };