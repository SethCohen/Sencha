const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Clears queue.'),
	async execute(interaction) {
		const queue = interaction.client.player.getQueue(interaction.guildId);
		if (!queue) return await interaction.reply({ content: '❌ No music in the queue!' });
		queue.clear();
		return await interaction.reply({ content: '❌ Queue cleared.' });
	},
};