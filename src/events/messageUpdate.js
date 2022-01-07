const { logChannelId } = require('../../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'messageUpdate',
	execute(oldMessage, newMessage) {
		const embed = new MessageEmbed()
			.setAuthor({ name: newMessage.author.tag, iconURL: newMessage.author.displayAvatarURL() })
			.setFields([
				{
					name: 'Old Message:',
					value: oldMessage.content,
				},
				{
					name: 'New Message:',
					value: newMessage.content,
				},
			])
			.setTimestamp(newMessage.createdTimestamp)
			.setFooter({ text: 'The bot creator doesnt like logging :(\nMessage Edited.' });

		newMessage.guild.channels.fetch(logChannelId)
			.then(channel => {
				channel.send({ embeds: [embed] });
			})
			.catch(console.error);

	},
};