const { modChannelId, modRoleId } = require('../../config.json');
const { updatePunishmentLogs } = require('../helpers/dbModel');
const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

/**
 * Kicks a user from the server, adding a record to the database.
 *
 * @param interaction		The interaction object.
 * @param user				The user to kick.
 * @param reason			The reason for the kick.
 * @param shame				Whether or not to shame the user in chat.
 * @returns {Promise<void>}	Returns a message to chat.
 */
const kickUser = (interaction, user, reason, shame) => {
	updatePunishmentLogs(user.id, 'timesKicked');
	interaction.guild.members.kick(user, reason)
		.then(memberKicked => {
			if (shame === 'yes') {
				return interaction.reply({ content: `**${memberKicked.user?.tag ?? memberKicked.tag ?? memberKicked}** has been kicked. \n**Reason:** ${reason}` });
			}
			return interaction.reply({ content: `**${memberKicked.user?.tag ?? memberKicked.tag ?? memberKicked}** has been kicked. \n**Reason:** ${reason}`, ephemeral: true });
		})
		.catch(console.error);

};

/**
 * Logs the kick to the mod channel.
 *
 * @param interaction		The interaction object.
 * @param user				The user that got kicked.
 * @param reason			The reason for the kick.
 * @returns {Promise<void>}	Returns a message to chat.
 */
const logToModChannel = (interaction, user, reason) => {
	try {
		const embed = new EmbedBuilder()
			.setAuthor({ name: user.tag, iconURL:user.displayAvatarURL() })
			.setColor(0xffe695)
			.setDescription(`User has been kicked.\n**Reason:** ${reason}\n**Kick Author:** ${interaction.member}`)
			.setTimestamp(interaction.createdTimestamp)
			.setFooter({ text: 'The bot creator doesnt like logging :(' });

		if (!modChannelId) {
			console.log('modChannelId is not specified in config.json. Cannot log kicks.');
			return;
		}

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
		.setName('kick')
		.setDescription('Kicks a specified user.')
		.setDefaultPermission(false)
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user to kick.')
				.setRequired(true),
		)
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('The kick reason. This gets sent to the user anonymously.')
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
					content: 'You cannot kick this person.',
					ephemeral: true,
				});
			}
			else {
				user.send(`**You've been kicked from ${interaction.guild.name}.**\n**Reason:** ${reason}`)
					.then(() => {
						kickUser(interaction, user, reason, shame);
						logToModChannel(interaction, user, reason);
					})
					.catch(() => {
						console.error(`Can't DM ${user}.`);
						kickUser(interaction, user, reason, shame);
						logToModChannel(interaction, user, reason);
					});
			}
		});


	},
};