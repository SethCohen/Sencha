const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('The current queue.')
        .addIntegerOption(option =>
            option.setName('page')
                .setDescription('The page.')),
    async execute(interaction) {
        await interaction.deferReply();

        let page = interaction.options.getInteger('page');
        const queue = interaction.client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return await interaction.followUp({ content: '❌ | No music is being played!' });
        if (!page) page = 1;
        const pageStart = 10 * (page - 1);
        const pageEnd = pageStart + 10;
        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(pageStart, pageEnd).map((m, i) => {
            return `${i + pageStart + 1}. **${m.title}** ([link](${m.url}))`;
        });

        return await interaction.followUp({
            embeds: [
                {
                    title: 'Server Queue',
                    description: `${tracks.join('\n')}${
                        queue.tracks.length > pageEnd
                            ? `\n...${queue.tracks.length - pageEnd} more track(s)`
                            : ''
                    }`,
                    color: 0xff0000,
                    fields: [{ name: 'Now Playing', value: `🎶 | **${currentTrack.title}** ([link](${currentTrack.url}))` }]
                }
            ]
        });
    },
};