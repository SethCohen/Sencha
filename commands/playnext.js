const {SlashCommandBuilder} = require('@discordjs/builders');
const {QueryType} = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('playnext')
        .setDescription('Adds to top of queue')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('The song url you want to play.')
                .setRequired(true)),
    async execute(interaction) {
        const query = interaction.options.getString('query');

        await interaction.deferReply();

        const queue = interaction.client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return await interaction.followUp({ content: '❌ | No music is being played!' });

        const searchResult = await interaction.client.player
            .search(query, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })
            .catch(() => {
                console.log('he');
            });

        if (!searchResult || !searchResult.tracks.length) return await interaction.followUp({ content: 'No results were found!' });
        queue.insert(searchResult.tracks[0]);
        return await interaction.followUp({ content: '⏱ | Loading your track...' });
    },
};