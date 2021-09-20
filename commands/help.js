const {MessageEmbed} = require("discord.js");
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Lists all commands'),
    async execute(interaction) {
        let embed = new MessageEmbed()
            .setColor("ORANGE")
            .setTitle("Help & Commands")
            .setDescription("A brief description of available commands.")
            .addFields(
                {name: '/play <youtube-url>', value: 'Plays youtube video to a voice channel.'},
            )

        return interaction.reply({embeds: [embed]});
    },
};