const { logChannelId } = require('../../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'messageUpdate',
	execute(oldMessage, newMessage) {
		if (oldMessage.partial) {
			return false;
		}

		try {
			if (oldMessage.content !== newMessage.content) {
				const embed = new MessageEmbed()
					.setAuthor({ name: newMessage.author.tag, iconURL: newMessage.author.displayAvatarURL() })
					.setColor('#baffc2')
					.setTitle(`Message Updated in #${newMessage.channel.name}`)
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
					.setFooter({ text: 'The bot creator doesnt like logging :(' });

				newMessage.guild.channels.fetch(logChannelId)
					.then(channel => {
						channel.send({ embeds: [embed] });
					})
					.catch(console.error);

			}
		}
		catch (e) {
			console.error(e);
		}
	},
};