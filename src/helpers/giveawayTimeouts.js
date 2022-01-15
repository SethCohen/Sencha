const { MessageEmbed } = require('discord.js');
const { deleteGiveaway } = require('../helpers/dbModel');

const listOfTimeouts = {};

function createTimeout(message, amountWinners, prize, endDate) {
	listOfTimeouts[message.id] = setTimeout(() => {
		const winners = message.reactions.resolve('🎁').users.cache.filter(user => user !== message.client.user).random(amountWinners);
		const successMessage = `Congratulations to all winners and thank you to all those who entered!\n**Winner(s):** ${winners}`;
		const failMessage = 'No one joined the giveaway thus there are no winners!';

		const embed = new MessageEmbed()
			.setTitle(`Giveaway Ended!\nPrize: ${prize}`)
			.setColor('#9eeeff')
			.setDescription(winners.length ? successMessage : failMessage)
			.setFooter({ text: `Giveaway message id: ${message.id}\nEnded on` })
			.setTimestamp(new Date(endDate));

		message.reply({ embeds: [embed] });

		deleteGiveaway(message.id);
	}, endDate - Date.now());
}

function cancelTimeout(messageId) {
	console.log(`${messageId} setTimeout cancelled`);
	clearTimeout(listOfTimeouts[messageId]);
	delete listOfTimeouts[messageId];
}

module.exports = {
	createTimeout,
	cancelTimeout,
};