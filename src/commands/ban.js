const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const { modChannelId, modRoleId } = require('../../config.json');
const { updatePunishmentLogs } = require('../helpers/dbModel');

/**
 * Bans a user from the server, adding a record to the database.
 *
 * @param interaction		The interaction object.
 * @param user				The user to ban.
 * @param reason			The reason for the ban.
 * @param shame				Whether or not to shame the user in chat.
 * @returns {Promise<void>}	Returns a message to chat.
 */
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

/**
 * Logs the ban to the mod channel.
 *
 * @param interaction		The interaction object.
 * @param user				The user that got banned.
 * @param reason			The reason for the ban.
 * @returns {Promise<void>} Returns a message to chat.
 */
const logToModChannel = (interaction, user, reason) => {
	try {
		const embed = new EmbedBuilder()
			.setAuthor({ name: user.tag, iconURL:user.displayAvatarURL() })
			.setColor(0xff9595)
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
				.addChoices(
					{ name: 'Yes', value: 'yes' },
					{ name:'No', value: 'no' },
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