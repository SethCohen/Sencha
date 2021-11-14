const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Bans a specified user.')
		.setDefaultPermission(false)
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user to ban.')
				.setRequired(true),
		)
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('The reason for banning the user.'))
		.addStringOption(option =>
			option.setName('shame')
				.setDescription('Shame the user in chat?')
				.addChoices([
					['Yes', 'yes'],
					['No', 'no'],
				])),
	async execute(interaction) {
		const user = interaction.options.getUser('user');
		let reason = interaction.options.getString('reason');
		reason = reason ? reason : 'n/a';
		const shame = interaction.options.getString('shame');

		if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
			return interaction.reply({
				content: 'You do not have enough permissions to use this command.',
				ephemeral: true,
			});
		}

		interaction.guild.members.fetch(user).then(member => {
			if (member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
				return interaction.reply({
					content: 'You cannot ban this person.',
					ephemeral: true,
				});
			}
			else {
				user.send(`**You've been banned from ${interaction.guild.name}.**\n**Reason:** ${reason}`)
					.then(
						interaction.guild.members.ban(user, { days: 0, reason: reason })
							.then(kickInfo => {
								if (shame === 'yes') {
									return interaction.reply({ content: `Banned ${kickInfo.user?.tag ?? kickInfo.tag ?? kickInfo}` });
								}
							})
							.catch(() => console.log('Can\'t ban user.')),
					)
					.catch(() => {
						console.log('Can\'t DM user.');
						interaction.guild.members.ban(user, { days: 0, reason: reason })
							.then(kickInfo => {
								if (shame === 'yes') {
									return interaction.reply({ content: `Banned ${kickInfo.user?.tag ?? kickInfo.tag ?? kickInfo}` });
								}
							})
							.catch(() => console.log('Can\'t ban user.'));
					});
			}
		});


	},
};