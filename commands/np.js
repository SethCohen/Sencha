const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('np')
        .setDescription('See whats currently playing.'),
    async execute(interaction) {
        await interaction.deferReply();

        const queue = interaction.client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return await interaction.followUp({ content: '❌ | No music is being played!' });
        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        return await interaction.followUp({
            embeds: [
                {
                    title: 'Now Playing',
                    description: `🎶 | **${queue.current.title}**! (\`${perc.progress === 'Infinity' ? 'Live' : perc.progress + '%'}\`)`,
                    fields: [
                        {
                            name: '\u200b',
                            value: progress.replace(/ 0:00/g, ' ◉ LIVE')
                        }
                    ],
                    color: 0xffffff
                }
            ]
        });
    },
};