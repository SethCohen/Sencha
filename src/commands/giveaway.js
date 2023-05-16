import { addGiveaway, deleteGiveaway, getGiveaway } from '../helpers/dbModel.js';
import { createTimeout, cancelTimeout } from '../helpers/giveawayTimeouts.js';
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export default {
	data:  new SlashCommandBuilder()
		.setName('giveaway')
		.setDescription('Manage giveaways.')
		.addSubcommand(subcommand => subcommand
			.setName('create')
			.setDescription('Create a giveaway')
			.addStringOption(option => option
				.setName('time')
				.setDescription('Time till giveaway ends. e.g. 1d0h0m0s or 1d for 1 day.')
				.setRequired(true))
			.addStringOption(option => option
				.setName('prize')
				.setDescription('The prize.')
				.setRequired(true))
			.addIntegerOption(option => option
				.setName('winners')
				.setDescription('Amount of winners. e.g. 1')
				.setRequired(true)))
		.addSubcommand(subcommand => subcommand
			.setName('end')
			.setDescription('Ends a giveaway immediately. Defaults to latest giveaway if no message id is specified')
			.addStringOption(option => option
				.setName('message_id')
				.setDescription('The giveaway message id.')))
		.addSubcommand(subcommand => subcommand
			.setName('reroll')
			.setDescription('Rerolls a giveaway for new winners. Must specify location for bot to know which giveaway to reroll.')
			.addStringOption(option => option
				.setName('channel_id')
				.setDescription('The channel id the giveaway is in.')
				.setRequired(true))
			.addStringOption(option => option
				.setName('message_id')
				.setDescription('The giveaway message id.')
				.setRequired(true)))
		.addSubcommand(subcommand => subcommand
			.setName('delete')
			.setDescription('Deletes a giveaway. Defaults to latest giveaway if no messageId specified')
			.addStringOption(option => option.setName('message_id')
				.setDescription('The giveaway message id.'))),
	async  execute(interaction) {
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

			const embed = new EmbedBuilder()
				.setTitle(`New Giveaway Created!\nPrize: ${prize}`)
				.setColor(0x9eeeff)
				.setDescription(`**Amount of winners:** ${amountWinners}\n**Ends:** ${dateEnd.toString()}\n**Hosted by:** ${interaction.user}\n\nReact with 🎁 to enter!`)
				.setFooter({ text: `Giveaway message id: ${message.id}` });

			await interaction.editReply({ embeds: [embed] });
			await message.react('🎁');

			addGiveaway(message.id, message.channelId, prize, amountWinners, Date.now(), dateEnd.getTime());

			createTimeout(message, amountWinners, prize, dateEnd.getTime());

		}
		else if (interaction.options.getSubcommand() === 'end') {
			const messageId = interaction.options.getString('message_id');
			const giveaway = getGiveaway(messageId);

			interaction.guild.channels.fetch(giveaway.channelId)
				.then(channel => {
					channel.messages.fetch(giveaway.messageId)
						.then(async (message) => {
						// console.log(message);
							if (interaction.user !== message.interaction.user) {
								return await interaction.editReply({ content: 'You can\'t end this giveaway. You are not the giveaway author.' });
							}

							const reactionUsers = await message.reactions.resolve('🎁').users.fetch();
							const winners = reactionUsers.filter(user => user !== interaction.client.user).random(giveaway.amountWinners);
							const successMessage = `Congratulations to all winners and thank you to all those who entered!\n**Winner(s):** ${winners}`;
							const failMessage = 'No one joined the giveaway thus there are no winners!';

							const embed = new EmbedBuilder()
								.setTitle(`Giveaway Ended!\nPrize: ${giveaway.prize}`)
								.setColor(0x9eeeff)
								.setDescription(winners.length ? successMessage : failMessage)
								.setFooter({ text: `Giveaway message id: ${message.id}\nEnded on` })
								.setTimestamp(Number(giveaway.endDate));

							await interaction.editReply({ embeds: [embed] });

							cancelTimeout(giveaway.messageId);
							deleteGiveaway(message.id);

						})
						.catch(console.error);
				})
				.catch(console.error);
		}
		else if (interaction.options.getSubcommand() === 'reroll') {
			const channelId = interaction.options.getString('channel_id');
			const messageId = interaction.options.getString('message_id');

			interaction.guild.channels.fetch(channelId)
				.then(channel => {
					channel.messages.fetch(messageId)
						.then(async (message) => {
							if (interaction.user !== message.interaction.user) {
								return await interaction.editReply({ content: 'You can\'t reroll this giveaway. You are not the giveaway author.' });
							}

							const reactionUsers = await message.reactions.resolve('🎁').users.fetch();
							const winners = reactionUsers.filter(user => user !== interaction.client.user).random(1);
							const successMessage = `Congratulations to all winners and thank you to all those who entered!\n**New Winner(s):** ${winners}`;
							const failMessage = 'No one joined the giveaway thus there are no winners!';

							const embed = new EmbedBuilder()
								.setTitle('Giveaway Rerolled!')
								.setColor(0x9eeeff)
								.setDescription(winners.length ? successMessage : failMessage)
								.setFooter({ text: `Giveaway message id: ${message.id}` });

							await interaction.editReply({ embeds: [embed] });

						})
						.catch(console.error);
				})
				.catch(console.error);
		}
		else if (interaction.options.getSubcommand() === 'delete') {
			const messageId = interaction.options.getString('message_id');
			const giveaway = getGiveaway(messageId);

			interaction.guild.channels.fetch(giveaway.channelId)
				.then(channel => {
					channel.messages.fetch(giveaway.messageId)
						.then(async (message) => {
							if (interaction.user !== message.interaction.user) {
								return await interaction.editReply({ content: 'You can\'t delete this giveaway. You are not the giveaway author.' });
							}

							const embed = new EmbedBuilder()
								.setTitle('Giveaway Cancelled And Deleted.')
								.setColor(0x9eeeff)
								.setDescription('Aww....')
								.setFooter({ text: `Giveaway message id: ${message.id}` });

							cancelTimeout(giveaway.messageId);
							deleteGiveaway(message.id);

							return await interaction.editReply({ embeds: [embed] });
						})
						.catch(console.error);
				})
				.catch(console.error);
		}
	},
};