const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffles the queue.'),
    async execute(interaction) {
        const queue = interaction.client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return await interaction.reply({ content: '❌ No music is being played!' });
        queue.shuffle();
        return await interaction.reply({ content: 'Queue has been shuffled!' });
    },
};