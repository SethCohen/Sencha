const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('noswearing')
        .setDescription('Reminds people what our servers virtues are about.')
        .addUserOption(option =>
        option.setName('user')
            .setDescription('The user to remind not to swear.')),

    async execute(interaction) {
        const user = interaction.options.getUser('user')
        return await interaction.reply({content: `${user ? user : ''} No swearing in our good christian atheist muslim jewish buddhist hindu taoist shinto sikh various aboriginal religions wicca pagan orange juice pastafarianism tea club server!`, files: ['./assets/noswearing.jpg']})
    },
};