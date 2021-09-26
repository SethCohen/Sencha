const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('disconnect')
        .setDescription('Stops the player and disconnects the bot.'),
    async execute(interaction) {
        const queue = interaction.client.player.getQueue(interaction.guildId);
        queue.destroy();
        return await interaction.reply({ content: '🛑 Stopped the player. Ciao!' });
    },
};