const ily = [
	'ily',
	'i love you',
];
const cute = [
	'cute',
];

module.exports = {
	name: 'messageCreate',
	execute(message) {
		if (message.author.id !== message.client.user.id) {
			if (message.mentions.has(message.client.user)) {
				const strMsg = message.content.toLowerCase();
				if ((new RegExp(ily.join('|')).test(strMsg)) && (new RegExp(cute.join('|')).test(strMsg))) {
					message.reply('what da frick. ily most. u\'re the cutest! <:bweep:811541787222343741>');
				}
				else if (new RegExp(ily.join('|')).test(strMsg)) {
					message.reply('ily more. <:bweep:811541787222343741>');
				}
				else if (new RegExp(cute.join('|')).test(strMsg)) {
					message.reply('no u! <:bweep:811541787222343741>');
				}

			}


		}
	},
};