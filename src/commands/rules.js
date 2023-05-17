import { SlashCommandBuilder } from 'discord.js';


const rules = ['> **1.    No gatekeeping or being pretentious.** No one likes a pretentious snob who goes "Ew coffee? Tea is way more superior" or "Bagged tea? Yikes." All preferences are welcomed here. And that goes beyond just tea.',
	'> **2.    Be respectful and polite.** No harassing, bullying, racism, hate speech, etc. Honestly, just try to be a decent human being and treat others with respect and decency.',
	'> **3.    No controversial topics or debates.** E.g. Politics, religion, diet, race, conspiracies, etc. We want to keep this place as inclusive as possible and conversations prone to arguments are not allowed.  We\'re just a tea club discord, this isn\'t the place for such discussions.',
	'> **4.    Be cautious of sensitive topics.** Add trigger content warnings and wrap things in spoiler tags (\' || content || \') when necessary.',
	'> **5.    No NSFW.** Keep the server clean.',
	'> **6.    No spamming.** No excessive messages or self-promoting. If you\'d like to advertise something, please contact an exec first.',
	'> **7.    No activities that break either school or discord policies.** E.g. No discussing or promoting cheating such as using Chegg, etc.',
	'> **8.    Chill, relax, and have fun. 🍵**'];


const specialRules = {
	69: '> **69.    Nice.**',
	1984: '> **1984.    ████ ██ █████████ █████.**',
	34: '> **34.    No horny! Bonk.**',
	420: '> **420.    Blaze it 🔥**',
};

export default {
	data: new SlashCommandBuilder()
		.setName('rules')
		.setDescription('Displays the rules.')
		.addIntegerOption(option => option.setName('rule')
			.setDescription('The rule to post.'),
		),
	async  execute(interaction) {
		const ruleNumber = interaction.options.getInteger('rule');
		const ruleContent = specialRules[ruleNumber] || rules[ruleNumber - 1];

		if (ruleContent) {
			await interaction.reply({ content: ruleContent });
		}
		else {
			await interaction.reply({ content: `${rules.join('\n')}` });
		}
	},
};