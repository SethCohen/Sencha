const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pauses current song'),
	async execute(interaction) {
		await interaction.deferReply();

		const queue = interaction.client.player.getQueue(interaction.guildId);
		if (!queue || !queue.playing) return void await interaction.editReply({ content: '❌ | No music is being played!' });
		const paused = queue.setPaused(true);
		return void await interaction.editReply({ content: paused ? '⏸ | Paused!' : '❌ | Something went wrong!' });
	},
};