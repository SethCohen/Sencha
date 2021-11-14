const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('np')
		.setDescription('See whats currently playing.'),
	async execute(interaction) {
		const queue = interaction.client.player.getQueue(interaction.guildId);
		if (!queue || !queue.playing) return await interaction.reply({ content: '❌ No music is being played!' });
		const progress = queue.createProgressBar();
		const percentage = queue.getPlayerTimestamp();
		return await interaction.reply({
			embeds: [
				{
					title: 'Now Playing',
					description: `**[${queue.current.title}](${queue.current.url})**! - \`${percentage.progress === Infinity ? 'Live' : percentage.progress + '%'}\``,
					fields: [
						{
							name: '\u200b',
							value: progress.match(/ 0:00/g) ? ' ◉ LIVE' : progress,
						},
					],
					color: 0x003b70,
					image: {
						url: `${queue.current.thumbnail}`,
					},
				},
			],
		});
	},
};