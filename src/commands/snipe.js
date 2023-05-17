import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('snipe')
		.setDescription('Snipes the last deleted/edited message.'),
	async  execute(interaction) {
		const message = global.snipe.get(interaction.channelId);

		if (!message) {
			return interaction.reply({ content: 'No message found.' });
		}

		const repliedTo = await message.channel.messages.fetch(message.reference.messageId);

		const embed = new EmbedBuilder()
			.setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
			.setTimestamp(message.createdAt)
			.setDescription(repliedTo ? `**${repliedTo.author}:** ${repliedTo.content}\n\n${message.content}` : message.content);

		global.snipe.delete(interaction.channelId); // don't show the same message twice

		return await interaction.reply({ embeds: [embed] });
	},
};