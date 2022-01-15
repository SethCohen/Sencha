const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { setTimeout } = require('timers/promises');
const { addGiveaway, deleteGiveaway } = require('../helpers/dbModel');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('giveaway')
		.setDescription('Manage giveaways.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('create')
				.setDescription('Create a giveaway')
				.addStringOption(option =>
					option
						.setName('time')
						.setDescription('Time till giveaway ends. e.g. 1d0h0m0s or 1d for 1 day.')
						.setRequired(true))
				.addStringOption(option =>
					option
						.setName('prize')
						.setDescription('The prize.')
						.setRequired(true))
				.addIntegerOption(option =>
					option
						.setName('winners')
						.setDescription('Amount of winners. e.g. 1')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('end')
				.setDescription('Ends a giveaway immediately. Defaults to latest giveaway if no messageId specified'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('reroll')
				.setDescription('Rerolls a giveaway for new winners. Defaults to latest giveaway if no messageId specified'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('delete')
				.setDescription('Deletes a giveaway. Defaults to latest giveaway if no messageId specified')),
	async execute(interaction) {
		await interaction.deferReply();

		if (interaction.options.getSubcommand() === 'create') {
			const message = await interaction.fetchReply();

			const prize = interaction.options.getString('prize');
			const time = interaction.options.getString('time');
			const amountWinners = interaction.options.getInteger('winners');

			const re = /(?:(\d+)d)?(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/;
			const toMilliseconds = input => {
				const [, days, hours, minutes, seconds] = input.match(re);
				// console.log(days, hours, minutes, seconds);
				const totalSeconds = (days || 0) * 24 * 3600
					+ ((hours || 0) * 3600)
					+ ((minutes || 0) * 60)
					+ parseInt(seconds || 0);

				return totalSeconds * 1000;
			};
			const dateEnd = new Date(Date.now() + toMilliseconds(time));

			if (toMilliseconds(time) === 0) {
				return interaction.editReply('Improper time range selected. Please try again!');
			}

			const embed = new MessageEmbed()
				.setTitle(`New Giveaway Created!\nPrize: ${prize}`)
				.setColor('#9eeeff')
				.setDescription(`**Amount of winners:** ${amountWinners}\n**Ends:** ${dateEnd.toString()}\n**Hosted by:** ${interaction.user}\n\nReact with 🎁 to enter!`)
				.setFooter({ text: `Giveaway message id: ${message.id}` });

			await interaction.editReply({ embeds: [embed] });
			await message.react('🎁');

			addGiveaway(message.id, message.channelId, prize, amountWinners, dateEnd.getTime());

			setTimeout(dateEnd - Date.now())
				.then(() => {

					const winners = message.reactions.resolve('🎁').users.cache.filter(user => user !== interaction.client.user).random(amountWinners);
					const successMessage = `Congratulations to all winners and thank you to all those who entered!\n**Winner(s):** ${winners}`;
					const failMessage = 'No one joined the giveaway thus there are no winners!';

					embed.setTitle(`Giveaway Ended!\nPrize: ${prize}`)
						.setDescription(winners.length ? successMessage : failMessage)
						.setFooter({ text: `Giveaway message id: ${message.id}\nEnded on` })
						.setTimestamp(dateEnd);

					interaction.followUp({ embeds: [embed] });

					deleteGiveaway(message.id);
				})
				.catch(console.error);

		}

	},
};