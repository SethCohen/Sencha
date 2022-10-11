const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rules')
		.setDescription('Displays the rules.')
		.addIntegerOption(option =>
			option.setName('rule')
				.setDescription('The rule to post.'),
		),
	async execute(interaction) {
		const rule = interaction.options.getInteger('rule');
		switch (rule) {
		case 1:
			await interaction.reply({ content: `> **1. No gatekeeping or being pretentious.** No one likes a pretentious snob who goes "Ew coffee? Tea is way more superior" or "Bagged tea? Yikes.
                > All preferences are welcomed here. And that goes beyond just tea.` });
			break;
		case 2:
			await interaction.reply({ content: '> **2. Be civil and polite. No harassing, bullying, racism, hate speech, etc.** Honestly, just try to be a decent human being.' });
			break;
		case 3:
			await interaction.reply({ content: '> **3. No weight and diet talk.** Discussions in the server about weight and diet are not allowed here. This includes comments about value judgments related to weight and food. ' });
			break;
		case 4:
			await interaction.reply({ content: '> **4. Be cautious of sensitive topics.** All sensitive topics need to be kept in #spilling-the-tea. Remember to use content warnings and wrap things in spoiler tags (`|| content ||`) when discussing sensitive topics.' });
			break;
		case 5:
			await interaction.reply({ content: '> **5. No NSFW or spamming.** Keep the server clean.' });
			break;
		case 6:
			await interaction.reply({ content: '> **6. No politics or controversial topics.** We\'re just a tea club discord, this isn\'t the place for such discussions. ' });
			break;
		case 7:
			await interaction.reply({ content: '> **7. Chill, relax, and have fun.** 🍵' });
			break;
		case 69:
			await interaction.reply({ content: '> **69. Nice.**' });
			break;
		case 1984:
			await interaction.reply({ content: '> **1984. ████ ██ █████████ █████.**' });
			break;
		default:
			return await interaction.reply({
				content: `> **1. No gatekeeping or being pretentious.** No one likes a pretentious snob who goes "Ew coffee? Tea is way more superior" or "Bagged tea? Yikes."
                        > All preferences are welcomed here. And that goes beyond just tea.
                        > 
                        > **2. Be civil and polite. No harassing, bullying, racism, hate speech, etc.** Honestly, just try to be a decent human being.
                        > 
                        > **3. No weight and diet talk.** Discussions in the server about weight and diet are not allowed here. This includes commenwts about value judgments related to weight and food. 
                        > 
                        > **4. Be cautious of sensitive topics.** All sensitive topics need to be kept in #spilling-the-tea. Remember to use content warnings and wrap things in spoiler tags (\`|| content ||\`) when discussing sensitive topics.
                        > 
                        > **5. No NSFW or spamming.** Keep the server clean.
                        > 
                        > **6. No politics or controversial topics.** We're just a tea club discord, this isn't the place for such discussions. 
                        > 
                        > **7. Chill, relax, and have fun.** 🍵` });
		}
	},
};