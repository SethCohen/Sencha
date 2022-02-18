const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('seek')
		.setDescription('Seeks to a given time in song')
		.addIntegerOption(option =>
			option.setName('time')
				.setDescription('The time to seek to (in seconds)')
				.setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply();

		const queue = interaction.client.player.getQueue(interaction.guildId);
		if (!queue || !queue.playing) return void await interaction.editReply({ content: '❌ | No music is being played!' });

		const time = interaction.options.getInteger('time') * 1000;
		await queue.seek(time);

		await interaction.editReply({ content: `✅ | Seeked to ${time / 1000} seconds` });
	},
};