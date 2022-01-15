const { guildId, adminRoleId } = require('../../config.json');
const { createDatabase, getGiveaways, deleteGiveaway } = require('../helpers/dbModel');
const { setTimeout } = require('timers/promises');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity('I love you.');

		// Set admin command perms
		const guild = client.guilds.cache.get(guildId);
		const commands = await guild.commands.fetch();
		const banCommand = await commands.find(command => command.name === 'ban');
		const permissions = [
			{
				id: adminRoleId,
				type: 'ROLE',
				permission: true,
			},
		];
		await banCommand.permissions.add({ permissions });

		// Check for active giveaways
		createDatabase();

		const giveaways = getGiveaways();
		console.log('Giveaways Found:', giveaways);

		// Set timers for giveaways
		for (const giveaway of giveaways) {
			guild.channels.fetch(giveaway.channelId)
				.then(channel => {
					channel.messages.fetch(giveaway.messageId)
						.then(message => {
							setTimeout(giveaway.endDate - Date.now())
								.then(() => {
									const winners = message.reactions.resolve('🎁').users.cache.filter(user => user !== client.user).random(giveaway.amountWinners);
									const successMessage = `Congratulations to all winners and thank you to all those who entered!\n**Winner(s):** ${winners}`;
									const failMessage = 'No one joined the giveaway thus there are no winners!';

									const embed = new MessageEmbed()
										.setTitle(`Giveaway Ended!\nPrize: ${giveaway.prize}`)
										.setColor('#9eeeff')
										.setDescription(winners.length ? successMessage : failMessage)
										.setFooter({ text: `Giveaway message id: ${message.id}\nEnded on` })
										.setTimestamp(new Date(giveaway.endDate));

									message.reply({ embeds: [embed] });

									deleteGiveaway(message.id);
								})
								.catch(console.error);
						})
						.catch(console.error);
				})
				.catch(console.error);
		}


	},
};