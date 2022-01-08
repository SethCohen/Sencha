const { logChannelId } = require('../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'messageDelete',
	execute(message) {
		if (message.partial) {
			return false;
		}

		try {
			const embed = new MessageEmbed()
				.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
				.setColor('#ff9595')
				.setTitle(`Message Deleted in #${message.channel.name}`)
				.setDescription(message.content)
				.setTimestamp(message.createdTimestamp)
				.setFooter({ text: 'The bot creator doesnt like logging :(' });

			message.guild.channels.fetch(logChannelId)
				.then(channel => {
					channel.send({ embeds: [embed] });
				})
				.catch(console.error);
		}
		catch (e) {
			console.error(e);
		}

	},
};