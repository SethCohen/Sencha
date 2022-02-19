const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('servercopypasta')
		.setDescription('Posts tea club\'s virtues. Copypasta starts with " our good..."')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user to mention.'))
		.addStringOption(option =>
			option.setName('prefix').setDescription('Prefix message to put in front of the copypasta. e.g. "No Swearing in"')),

	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const prefix = interaction.options.getString('prefix');
		return await interaction.reply({ content: `${user ? user : ''} ${prefix ? prefix : ''} our good christian atheist muslim jewish buddhist hindu taoist shinto sikh various aboriginal religions wicca pagan orange juice pastafarianism tea club server!`, files: ['./src/assets/threaten.jpg'] });
	},
};