const { logChannelId } = require('../../config.json');
const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'messageDelete',
	execute(message) {
		if (message.partial) {
			return false;
		}

		global.snipe = message;

		console.log(message);

		try {
			const embed = new EmbedBuilder()
				.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
				.setColor(0xff9595)
				.setDescription(`Message Deleted in ${message.channel} from ${message.author}.\n${message.content}`)
				.setTimestamp(message.createdTimestamp)
				.setFooter({ text: 'The bot creator doesnt like logging :(' });

			message.guild.channels.fetch(logChannelId)
				.then(channel => {
					channel.send({ embeds: [embed], files: [...message.attachments.values()] });
				})
				.catch(console.error);
		}
		catch (e) {
			console.error(e);
		}

	},
};