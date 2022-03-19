const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { modChannelId, modRoleId } = require('../../config.json');
const { updatePunishmentLogs } = require('../helpers/dbModel');

const banUser = (interaction, user, reason, shame) => {
	updatePunishmentLogs(user.id, 'timesBanned');
	interaction.guild.members.ban(user, { days: 0, reason: reason })
		.then(memberBanned => {
			if (shame === 'yes') {
				return interaction.reply({ content: `**${memberBanned.user?.tag ?? memberBanned.tag ?? memberBanned}** has been banned. \n**Reason:** ${reason}` });
			}
			return interaction.reply({ content: `**${memberBanned.user?.tag ?? memberBanned.tag ?? memberBanned}** has been banned. \n**Reason:** ${reason}`, ephemeral: true });
		})
		.catch(console.error);

};

const logToModChannel = (interaction, user, reason) => {
	try {
		const embed = new MessageEmbed()
			.setAuthor({ name: user.tag, iconURL:user.displayAvatarURL() })
			.setColor('#ff9595')
			.setDescription(`User has been banned.\n**Reason:** ${reason}\n**Ban Author:** ${interaction.member}`)
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
				.setDescription('The ban reason. This gets sent to the user anonymously.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('shame')
				.setDescription('Shames the user in chat. Posts to wherever command is called.')
				.addChoices([
					['Yes', 'yes'],
					['No', 'no'],
				])),
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
					content: 'You cannot ban this person.',
					ephemeral: true,
				});
			}
			else {
				user.send(`**You've been banned from ${interaction.guild.name}.**\n**Reason:** ${reason}`)
					.then(() => {
						banUser(interaction, user, reason, shame);
						logToModChannel(interaction, user, reason);
					})
					.catch(() => {
						console.error(`Can't DM ${user}.`);
						banUser(interaction, user, reason, shame);
						logToModChannel(interaction, user, reason);
					});
			}
		});


	},
};