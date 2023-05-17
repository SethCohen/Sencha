import { EmbedBuilder } from 'discord.js';
import * as dotenv from 'dotenv';
dotenv.config();

const handleStarboardReactionRemove = async (messageReaction) => {
	const messageReference = messageReaction.message.reference;
	let repliedMessage;
	if (messageReference) repliedMessage = await messageReaction.message.channel.messages.fetch(messageReference.messageId);

	const embed = new EmbedBuilder()
		.setAuthor({
			name: messageReaction.message.author.tag,
			iconURL: messageReaction.message.author.displayAvatarURL(),
		})
		.setTitle(`🌟 ${messageReaction.count}`)
		.setColor(0xfdd835)
		.setDescription(`${repliedMessage ? `**${repliedMessage.author}:** "${repliedMessage.content}"\n\n` : ''}${messageReaction.message.content}\n\n[Jump To Message](${messageReaction.message.url}) | [Github](https://github.com/SethCohen/Sencha)`)
		.setTimestamp(messageReaction.message.createdTimestamp)
		.setFooter({ text: messageReaction.message.id });

	if (messageReaction.message.attachments.size > 0) embed.setImage(messageReaction.message.attachments.first().url);

	if (!process.env.STARBOARD_CHANNEL_ID) {
		console.error('starboardChannelId is not specified in .env\nCannot pin to starboard.');
		return;
	}

	const starboardChannel = await messageReaction.message.guild.channels.fetch(process.env.STARBOARD_CHANNEL_ID);
	const message = messageReaction.message;

	const starboardMessages = await starboardChannel.messages.fetch({ limit: 100 });
	const starboardMessage = starboardMessages.find((msg) => {
		if (msg?.embeds[0]?.footer?.text.includes(message.id)) return true;
		return false;
	});

	if (starboardMessage && messageReaction.count < parseInt(process.env.STARBOARD_THRESHOLD)) {
		await starboardMessage.delete();
	}
	else {
		await starboardChannel.edit({ embeds: [embed] });
	}
};

export default { name: 'messageReactionRemove',
	async  execute(messageReaction, user) {
		if (messageReaction.partial) {await messageReaction.fetch();}
		if (messageReaction.emoji.toString() === '⭐') {await handleStarboardReactionRemove(messageReaction, user);}
	} };