const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('brick')
        .setDescription('Brick a user.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription("The user to brick.")
                .setRequired(true)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('user')
        let num = Math.floor(Math.random() * 7) + 1
        let file
        switch (num) {
            case (1):
                file = "./assets/brick1.gif"
                break
            case (2):
                file = "./assets/brick2.gif"
                break
            case (3):
                file = "./assets/brick3.gif"
                break
            case (4):
                file = "./assets/brick4.gif"
                break
            case (5):
                file = "./assets/brick5.gif"
                break
            case (6):
                file = "./assets/brick6.gif"
                break
            case (7):
                file = "./assets/brick7.gif"
                break
            default:
                file = "./assets/brick1.gif"
        }
        return await interaction.reply({ content: `${user} has been bricked.`, files: [file] });
    },
};