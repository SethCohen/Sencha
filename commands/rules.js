const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription('Displays the rules.')
        .addIntegerOption(option =>
            option.setName('rule')
                .setDescription("The rule to post.")
        ),
    async execute(interaction) {
        const rule = interaction.options.getInteger('rule')
        switch (rule) {
            case 1:
                await interaction.reply({content: `> **1. No gatekeeping or being pretentious.** No one likes a pretentious snob who goes "Ew coffee? Tea is way more superior" or "Bagged tea? Yikes.
                > All preferences are welcomed here. And that goes beyond just tea.`})
                break
            case 2:
                await interaction.reply({content: `> **2. Be civil and polite. No harassing, bullying, racism, hate speech, etc.** Honestly, just try to be a decent human being.`})
                break
            case 3:
                await interaction.reply({content: `> **3. No NSFW or spamming.** Keep the server clean.`})
                break
            case 4:
                await interaction.reply({content: `> **4. No politics or controversial topics.** We're just a tea club discord, this isn't the place for such discussions. `})
                break
            case 5:
                await interaction.reply({content: `> **5. Chill, relax, and have fun.** 🍵`})
                break
            default:
                return await interaction.reply({
                    content: `> **1. No gatekeeping or being pretentious.** No one likes a pretentious snob who goes "Ew coffee? Tea is way more superior" or "Bagged tea? Yikes." 
                    > All preferences are welcomed here. And that goes beyond just tea.
                    > 
                    > **2. Be civil and polite. No harassing, bullying, racism, hate speech, etc.** Honestly, just try to be a decent human being.
                    > 
                    > **3. No NSFW or spamming.** Keep the server clean.
                    > 
                    > **4. No politics or controversial topics.** We're just a tea club discord, this isn't the place for such discussions. 
                    > 
                    > **5. Chill, relax, and have fun.** 🍵`})
        }
    },
};