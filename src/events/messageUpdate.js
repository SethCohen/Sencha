const { logChannelId } = require('../../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'messageUpdate',
	execute(oldMessage, newMessage) {
		if (oldMessage.partial || !['DEFAULT', 'REPLY'].includes(oldMessage.type)) {
			return false;
		}

		global.snipe = oldMessage;

		try {
			if (oldMessage.content !== newMessage.content) {
				const embed = new MessageEmbed()
					.setAuthor({ name: newMessage.author.tag, iconURL: newMessage.author.displayAvatarURL() })
					.setColor('#baffc2')
					.setDescription(`Message Edited in ${newMessage.channel} from ${newMessage.author}.\n[Jump To Message](${newMessage.url})`)
					.setFields([
						{
							name: 'Old:',
							value: oldMessage.content.length > 1024 ? oldMessage.content.slice(0, 1021) + '...' : oldMessage.content,
						},
						{
							name: 'New:',
							value: newMessage.content.length > 1024 ? newMessage.content.slice(0, 1021) + '...' : newMessage.content,
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