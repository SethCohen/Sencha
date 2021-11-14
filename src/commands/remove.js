const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Removes the specified track by track number from queue.')
        .addIntegerOption(option =>
            option.setName('track')
                .setDescription('The track number to remove.')
                .setRequired(true)),
    async execute(interaction) {
        const trackIndex = interaction.options.getInteger('track');
        const queue = interaction.client.player.getQueue(interaction.guildId);
        if (!queue) return await interaction.reply({ content: '❌ No music is being played!' });
        try {
            const trackName = queue.tracks[trackIndex - 1].title;
            queue.remove(trackIndex- 1);
            return await interaction.reply({ content: `❌ Removed track **${trackName}**.` });
        } catch(err){
            if(err instanceof TypeError) return await interaction.reply({ content: `❌ Invalid track number!` });
        }
    },
};