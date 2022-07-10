const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const { updatePunishmentLogs } = require('../helpers/dbModel');

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
		const path = './src/assets/';
		const brickFiles = fs.readdirSync(path).filter(file => file.startsWith('brick'));

		const file = path + brickFiles[Math.floor(Math.random() * brickFiles.length)];

		updatePunishmentLogs(user.id, 'timesBricked');

		return await interaction.reply({ content: `${user} has been bricked.`, files: [file] });
	},
};