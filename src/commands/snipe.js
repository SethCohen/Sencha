const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('snipe')
		.setDescription('Snipes the last deleted/edited message.'),
	async execute(interaction) {
		const message = global.snipe.get(interaction.channelId);

		if (message === undefined) {
			return interaction.reply({ content: 'No message found.' });
		}

		const embed = new EmbedBuilder()
			.setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
			.setDescription(message.content)
			.setTimestamp(message.createdAt);

		global.snipe.delete(interaction.channelId); // don't show the same message twice

		return await interaction.reply({ embeds: [embed] });
	},
};