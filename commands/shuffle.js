const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('Shuffles the queue'),
    async execute(interaction) {
        await interaction.deferReply();

        const queue = interaction.client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return await interaction.followUp({ content: '❌ | No music is being played!' });

        await queue.shuffle();

        return await interaction.followUp({ content: '✅ | Queue has been shuffled!' });
    },
};