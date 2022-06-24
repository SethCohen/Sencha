const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('snipe')
		.setDescription('Snipes the last deleted/edited message.'),
	async execute(interaction) {

		try {
			const embed = new MessageEmbed()
				.setAuthor({ name: global.snipe.author.username, iconURL: global.snipe.author.displayAvatarURL() })
				.setDescription(global.snipe.content)
				.setTimestamp(global.snipe.createdAt);

			return await interaction.reply({ embeds: [embed] });
		}
		catch (e) {
			return interaction.reply({ content: 'No message found.' });
		}
	},
};