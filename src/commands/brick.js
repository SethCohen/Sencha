const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('brick')
		.setDescription('Brick a user.')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user to brick.')
				.setRequired(true),
		),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const brickFiles = fs.readdirSync('./assets').filter(file => file.startsWith('brick'));

		const file = 'assets\\\\' + brickFiles[Math.floor(Math.random() * brickFiles.length)];

		return await interaction.reply({ content: `${user} has been bricked.`, files: [file] });
	},
};