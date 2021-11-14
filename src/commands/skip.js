const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips the current song.'),
    async execute(interaction) {
        const queue = interaction.client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return await interaction.reply({ content: '❌ No music is being played!' });
        const currentTrack = queue.current;
        const success = queue.skip();
        return await interaction.reply({
            content: success ? `Skipped **${currentTrack}**.` : '❌ Something went wrong!'
        });
    },
};