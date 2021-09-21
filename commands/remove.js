const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Removes the specified track.')
        .addIntegerOption(option =>
            option.setName('track')
                .setDescription('The track to remove.')
                .setRequired(true)),
    async execute(interaction) {
        const trackIndex = interaction.options.getInteger('track');

        await interaction.deferReply();

        const queue = interaction.client.player.getQueue(interaction.guildId);
        if (!queue) return await interaction.followUp({ content: '❌ | No music is being played!' });

        try {
            const trackName = queue.tracks[trackIndex - 1].title;
            queue.remove(trackIndex- 1);

            return interaction.followUp({ content: `❌ | Removed track ${trackName}.` });
        } catch(err){
            if(err instanceof TypeError) console.log('Invalid track number.')
        }
    },
};