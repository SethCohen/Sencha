const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');
const { modChannelId } = require('../../config.json');
const ms = require('ms');

const timeoutUser = (interaction, member, duration, reason, shame) => {
	member.timeout(duration, reason)
		.then(memberMuted => {
			if (shame === 'yes') {
				return interaction.reply({ content: `**${memberMuted.user?.tag ?? memberMuted.tag ?? memberMuted}** has been muted.\n**Duration:** ${ms(duration, { long: true })}\n**Reason:** ${reason}` });
			}
			return interaction.reply({ content: `**${memberMuted.user?.tag ?? memberMuted.tag ?? memberMuted}** has been muted.\n**Duration:** ${ms(duration, { long: true })}\n**Reason:** ${reason}`, ephemeral: true });
		})
		.catch(console.error);

};

const logToModChannel = (interaction, user, duration, reason) => {
	try {
		const embed = new MessageEmbed()
			.setAuthor({ name: user.tag, iconURL:user.displayAvatarURL() })
			.setColor('#bc95ff')
			.setDescription(`User has been muted.\n**Duration:** ${ms(duration, { long: true })}\n**Reason:** ${reason}\n**Mute Author:** ${interaction.member}`)
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
		.setName('timeout')
		.setDescription('Timeout a specified user.')
		.setDefaultPermission(false)
		.addUserOption(option =>
			option.setName('user')
				.setDescription('The user to timeout.')
				.setRequired(true),
		)
		.addStringOption(option =>
			option.setName('duration')
				.setDescription('The timeout length. e.g. 30m or 1d:1h:1m:1s.')
				.setRequired(true),
		)
		.addStringOption(option =>
			option.setName('reason')
				.setDescription('The timeout reason. This gets sent to the user anonymously.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('shame')
				.setDescription('Shames the user in chat. Posts to wherever command is called.')
				.addChoices([
					['Yes', 'yes'],
					['No', 'no'],
				])),
	async execute(interaction) {
		if (!interaction.member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) {
			return interaction.reply({
				content: 'You do not have enough permissions to use this command.',
				ephemeral: true,
			});
		}

		const user = interaction.options.getUser('user');
		const strDuration = interaction.options.getString('duration');
		const duration = strDuration.split(':').reduce((partialSum, currentVal) => partialSum + ms(currentVal), 0);
		const reason = interaction.options.getString('reason');
		const shame = interaction.options.getString('shame');

		interaction.guild.members.fetch(user).then(member => {
			if (member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) {
				return interaction.reply({
					content: 'You cannot timeout this person.',
					ephemeral: true,
				});
			}
			else {
				member.send(`**You've been muted from ${interaction.guild.name}.**\n**Reason:** ${reason}`)
					.then(() => {
						timeoutUser(interaction, member, duration, reason, shame);
						logToModChannel(interaction, user, duration, reason);
					})
					.catch(() => {
						console.error(`Can't DM ${user}.`);
						timeoutUser(interaction, member, duration, reason, shame);
						logToModChannel(interaction, user, duration, reason);
					});
			}
		});


	},
};