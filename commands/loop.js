const {SlashCommandBuilder} = require('@discordjs/builders');
const { QueueRepeatMode } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Set loop mode.')
        .addIntegerOption(option =>
            option.setName('mode')
                .setDescription('The loop type.')
                .setRequired(true)
                .addChoice('Off', QueueRepeatMode.OFF)
                .addChoice('Track', QueueRepeatMode.TRACK)
                .addChoice('Queue', QueueRepeatMode.QUEUE)
                .addChoice('Autoplay', QueueRepeatMode.AUTOPLAY)),
    async execute(interaction) {

        await interaction.deferReply();
        const queue = interaction.client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return await interaction.followUp({ content: '❌ | No music is being played!' });
        const loopMode = interaction.options.getInteger('mode');
        const success = queue.setRepeatMode(loopMode);
        const mode = loopMode === QueueRepeatMode.TRACK ? '🔂' : loopMode === QueueRepeatMode.QUEUE ? '🔁' : '▶';
        return await interaction.followUp({ content: success ? `${mode} | Updated loop mode!` : '❌ | Could not update loop mode!' });
    },
};