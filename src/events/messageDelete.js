const { logChannelId } = require('../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'messageDelete',
	execute(message) {
		const embed = new MessageEmbed()
			.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
			.setDescription(message.content)
			.setTimestamp(message.createdTimestamp)
			.setFooter({ text: 'The bot creator doesnt like logging :(\nMessage Deleted.' });

		message.guild.channels.fetch(logChannelId)
			.then(channel => {
				channel.send({ embeds: [embed] });
			})
			.catch(console.error);

	},
};