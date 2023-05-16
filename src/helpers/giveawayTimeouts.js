import { deleteGiveaway } from '../helpers/dbModel.js';
import { EmbedBuilder } from '@discordjs/builders';

const listOfTimeouts = {};

function createTimeout(message, amountWinners, prize, endDate) {
	listOfTimeouts[message.id] = setTimeout(() => {
		const winners = message.reactions.resolve('🎁').users.cache.filter(user => user !== message.client.user).random(amountWinners);
		const successMessage = `Congratulations to all winners and thank you to all those who entered!\n**Winner(s):** ${winners}`;
		const failMessage = 'No one joined the giveaway thus there are no winners!';

		const embed = new EmbedBuilder()
			.setTitle(`Giveaway Ended!\nPrize: ${prize}`)
			.setColor(0x9eeeff)
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

export {
	createTimeout,
	cancelTimeout,
};