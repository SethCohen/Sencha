import { readdirSync } from 'fs';
import { updatePunishmentLogs } from '../helpers/dbModel.js';
import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('brick')
		.setDescription('Brick a user.')
		.addUserOption(option => option.setName('user')
			.setDescription('The user to brick.')
			.setRequired(true),
		),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		const path = './src/assets/';
		const brickFiles = readdirSync(path).filter(file => file.startsWith('brick'));

		const file = path + brickFiles[Math.floor(Math.random() * brickFiles.length)];

		updatePunishmentLogs(user.id, 'timesBricked');

		return await interaction.reply({ content: `${user} has been bricked.`, files: [file] });
	},
};