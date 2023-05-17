import { EmbedBuilder } from 'discord.js';

const handleDeletedMessageLogging = (message) => {
	try {
		const embed = new EmbedBuilder()
			.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
			.setColor(0xff9595)
			.setDescription(`Message Deleted in ${message.channel} from ${message.author}.\n${message.content}`)
			.setTimestamp(message.createdTimestamp)
			.setFooter({ text: 'The bot creator doesnt like logging :(' });

		if (!process.env.LOG_CHANNEL_ID) {
			console.log('LOG_CHANNEL_ID is not specified in .env file.\nCannot log deleted messages.');
			return;
		}

		message.guild.channels.fetch(process.env.LOG_CHANNEL_ID)
			.then(channel => {
				channel.send({ embeds: [embed], files: [...message.attachments.values()] });
			})
			.catch(console.error);
	}
	catch (e) {
		console.error(e);
	}
};

export default { name: 'messageDelete', execute(message) {
	if (message.partial) {return false;}

	global.snipe.set(message.channelId, message);

	handleDeletedMessageLogging(message);

} };