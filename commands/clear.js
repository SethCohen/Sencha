const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears queue.'),
    async execute(interaction) {
        await interaction.deferReply();

        const queue = interaction.client.player.getQueue(interaction.guildId);
        if (!queue) return await interaction.followUp({ content: '❌ | No music in the queue!' });

        queue.clear();

        return await interaction.followUp({ content: '❌ | Queue cleared.' });
    },
};