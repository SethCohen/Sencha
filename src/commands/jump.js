const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('jump')
		.setDescription('Jumps to a specific track')
		.addIntegerOption(option =>
			option.setName('tracks')
				.setDescription('number of tracks to skip.')
				.setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply();

		const queue = interaction.client.player.getQueue(interaction.guildId);
		if (!queue || !queue.playing) return void await interaction.editReply({ content: '❌ | No music is being played!' });

		const trackIndex = interaction.options.getInteger('tracks') - 1;
		const trackName = queue.tracks[trackIndex].title;
		queue.jump(trackIndex);

		await interaction.editReply({ content: `⏭ | **${trackName}** has jumped the queue!` });
	},
};