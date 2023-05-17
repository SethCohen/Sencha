import { readdirSync } from 'fs';
import path from 'path';
import { SlashCommandBuilder } from 'discord.js';

const getRandomBrickFile = (dir) => {
	const brickFiles = readdirSync(dir).filter(file => file.startsWith('brick'));
	const randomFile = brickFiles[Math.floor(Math.random() * brickFiles.length)];
	return path.join(dir, randomFile);
};

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
		const file = getRandomBrickFile('./src/assets/');

		return await interaction.reply({ content: `${user} has been bricked.`, files: [file] });
	},
};
