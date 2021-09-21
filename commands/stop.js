const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops the player.'),
    async execute(interaction) {
        await interaction.deferReply();
        const queue = interaction.client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return await interaction.followUp({ content: '❌ | No music is being played!' });
        queue.destroy();
        return await interaction.followUp({ content: '🛑 | Stopped the player!' });
    },
};