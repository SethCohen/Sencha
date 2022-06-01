const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { modChannelId, modRoleId } = require('../../config.json');
const { updatePunishmentLogs } = require('../helpers/dbModel');

const warnUser = (interaction, user, reason, shame) => {
	updatePunishmentLogs(user.id, 'timesWarned');
	if (shame === 'yes') {
		return interaction.reply({ content: `**${ user.tag ?? user}** has been warned.\n**Reason:** ${reason}` });
	}
	return interaction.reply({ content: `**${user.tag ?? user}** has been warned.\n**Reason:** ${reason}`, ephemeral: true });
};

const logToModChannel = (interaction, user, reason) => {
	try {
		const embed = new MessageEmbed()
			.setAuthor({ name: user.tag, iconURL:user.displayAvatarURL() })
			.setColor('#bc95ff')
			.setDescription(`User has been warned.\n**Reason:** ${reason}\n**Warn Author:** ${interaction.member}`)
			.setTimestamp(interaction.createdTimestamp)
			.setFooter({ text: 'The bot creator doesnt like logging :(' });

		interaction.guild.channels.fetch(modChannelId)
			.then(channel => {
				channel.send({ embeds: [embed] });
			})
			.catch(console.error);
	}
	catch (e) {
		console.error(e);
	}
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('Warn a specified user.')
		.setDefaultPermission(false)
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user to timeout.')
				.setRequired(true),
		)
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('The timeout reason. This gets sent to the user anonymously.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('shame')
				.setDescription('Shames the user in chat. Posts to wherever command is called.')
				.addChoices(
					{ name: 'Yes', value: 'yes' },
					{ name: 'No', value:  'no' },
				)),
	async execute(interaction) {
		if (!interaction.member.roles.cache.has(modRoleId)) {
			return interaction.reply({
				content: 'You do not have enough permissions to use this command.',
				ephemeral: true,
			});
		}

		const user = interaction.options.getUser('user');
		const reason = interaction.options.getString('reason');
		const shame = interaction.options.getString('shame');

		interaction.guild.members.fetch(user).then(member => {
			if (member.roles.cache.has(modRoleId)) {
				return interaction.reply({
					content: 'You cannot warn this person.',
					ephemeral: true,
				});
			}
			else {
				member.send(`**You've been warned from ${interaction.guild.name}.**\n**Reason:** ${reason}`)
					.then(() => {
						warnUser(interaction, user, reason, shame);
						logToModChannel(interaction, user, reason);
					})
					.catch(() => {
						console.error(`Can't DM ${user}.`);
						warnUser(interaction, user, reason, shame);
						logToModChannel(interaction, user, reason);
					});
			}
		});


	},
};