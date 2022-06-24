const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { getUserPunishmentLogs } = require('../helpers/dbModel');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Gets punishment records of a user.')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user to get info of.')
				.setRequired(true),
		),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		let logs = await getUserPunishmentLogs(user.id);

		if (!logs) {
			logs = {
				timesBanned: 0,
				timesKicked: 0,
				timesTimeout: 0,
				timesWarned: 0,
			};
		}

		const embed = new MessageEmbed()
			.setAuthor({ name: user.tag, iconURL:user.displayAvatarURL() })
			.setDescription('Times...')
			.addFields(
				{ name: 'Banned', value: logs.timesBanned.toString() },
				{ name: 'Kicked', value: logs.timesKicked.toString() },
				{ name: 'Timeout', value: logs.timesTimeout.toString() },
				{ name: 'Warned', value: logs.timesWarned.toString() });

		return interaction.reply({ embeds: [embed] });


	},
};