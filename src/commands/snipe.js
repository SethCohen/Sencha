const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('snipe')
		.setDescription('Snipes the last deleted/edited message.'),
	async execute(interaction) {

		try {
			const embed = new EmbedBuilder()
				.setAuthor({ name: snipe.author.username, iconURL: snipe.author.displayAvatarURL() })
				.setDescription(snipe.content)
				.setTimestamp(snipe.createdAt);

			return await interaction.reply({ embeds: [embed] });
		}
		catch (e) {
			return interaction.reply({ content: 'No message found.' });
		}
	},
};