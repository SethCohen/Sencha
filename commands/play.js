const {SlashCommandBuilder} = require('@discordjs/builders');
const { Player, QueryType, QueueRepeatMode } = require("discord-player");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays a given youtube video to a voice channel the user is in.')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('The song url you want to play.')
                .setRequired(true)),
    async execute(interaction) {
        if (!interaction.member.voice.channelId) return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });

        const query = interaction.options.getString('query');

        const queue = interaction.client.player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel
            }
        });

        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.reply({ content: "Could not join your voice channel!", ephemeral: true });
        }

        await interaction.deferReply();
        const track = await interaction.client.player.search(query, {
            requestedBy: interaction.user
        }).then(x => x.tracks[0]);
        if (!track) return await interaction.followUp({ content: `❌ | Track **${query}** not found!` });

        queue.play(track);

        return await interaction.followUp({ content: `⏱️ | Loading track **${track.title}**!` });
    },
};