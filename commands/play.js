const {SlashCommandBuilder} = require('@discordjs/builders');
const { QueryType } = require('discord-player');

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
        await interaction.deferReply();
        const guild = interaction.client.guilds.cache.get(interaction.guildId);
        const query = interaction.options.getString('query');
        const searchResult = await interaction.client.player
            .search(query, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })
            .catch(() => {
                console.log('he');
            });
        if (!searchResult || !searchResult.tracks.length) return await interaction.followUp({ content: 'No results were found!' });

        const queue = await interaction.client.player.createQueue(guild, {
            metadata: {
                channel: interaction.channel
            }
        });

        const member = guild.members.cache.get(interaction.user.id) ?? await guild.members.fetch(interaction.user.id);
        try {
            if (!queue.connection) await queue.connect(member.voice.channel);
        } catch {
            void interaction.client.player.deleteQueue(interaction.guildId);
            return await interaction.followUp({ content: 'Could not join your voice channel!' });
        }

        await interaction.followUp({ content: `⏱ | Loading your ${searchResult.playlist ? 'playlist' : 'track'}...` });
        searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
        if (!queue.playing) await queue.play();
    },
};