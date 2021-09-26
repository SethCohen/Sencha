const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js");

/** convertTime
 *      Converts a given time in milliseconds to HH:MM:SS format.
 * @param ms            The time in milliseconds.
 * @returns {string}    The formatted time string.
 */
const convertTime = (ms) => {
    let seconds = ms / 1000;
    let hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    let minutes = parseInt(seconds / 60);
    seconds = seconds % 60;
    return hours + ":" + minutes + ":" + seconds;
}

/** truncate
 *      Truncates a given string and adds an ellipsis to end if needed.
 *
 * @param str           String to be truncated.
 * @returns {string|*}  Truncated? string.
 */
function truncate(str){
    return (str.length > 25) ? str.substr(0, 25-1) + '...' : str;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Lists all songs to be played.'),
    async execute(interaction) {
        await interaction.deferReply();

        const queue = interaction.client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) {
            return await interaction.followUp({content: 'No music is being played!'})
        }
        else if (queue.tracks.length === 0) {
            return await interaction.followUp({content: 'There is no music in the queue!'})
        } else {
            const currentTrack = queue.current;

            const row = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId('prev')
                    .setLabel('👈Prev')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('next')
                    .setLabel('👉 Next')
                    .setStyle('SECONDARY')
            );

            let chunkSize = 10;
            let embeds = []
            let chunks = []
            let index = 0
            let pageNumber = 1
            for (let i = 0, j = queue.tracks.length; i < j; i += chunkSize) {
                let chunk = queue.tracks.map((track, trackIndex) => {
                    return `**${trackIndex + 1}. [${truncate(track.title)}](${track.url})** - ${track.duration}`;
                }).slice(i, i + chunkSize);
                chunks.push(chunk)
            }

            for (const chunk of chunks) {
                const embed = new MessageEmbed()
                    .setColor(0x003b70)
                    .setTitle(`Server Queue`)
                    .setDescription(`${chunk.join('\n')}`)
                    .setFooter(`Page ${pageNumber++}/1 - Queue Length ${convertTime(queue.totalTime)}`)
                    .addField('Now Playing', `**[${currentTrack.title}](${currentTrack.url})**`)
                    .setThumbnail(`${currentTrack.thumbnail}`)
                embeds.push(embed)
            }

            await interaction.editReply({embeds: [embeds[index]], components: [row]});
            const message = await interaction.fetchReply()
            const collector = message.createMessageComponentCollector({time: 60000});

            collector.on('collect', async i => {
                if (i.customId === 'next' && index < embeds.length - 1) {
                    ++index
                    await i.update({embeds: [embeds[index]]});
                } else if (i.customId === 'prev' && index > 0) {
                    --index
                    await i.update({embeds: [embeds[index]]});
                } else {
                    await i.reply({content: "No valid page to go to.", ephemeral: true})
                }
            });

            collector.on('end', collected => {
                const row = new MessageActionRow().addComponents(
                    new MessageButton()
                        .setCustomId('prev')
                        .setLabel('👈Prev')
                        .setStyle('SECONDARY')
                        .setDisabled(true),
                    new MessageButton()
                        .setCustomId('next')
                        .setLabel('👉 Next')
                        .setStyle('SECONDARY')
                        .setDisabled(true)
                );
                interaction.editReply({components: [row]})
                // console.log(`Collected ${collected.size} interactions.`);
            });
        }
    },
};