const Database = require('better-sqlite3');

function createDatabase() {
	const db = new Database('./src/database.sqlite', { verbose: console.log });
	db.prepare('CREATE TABLE IF NOT EXISTS giveaways(messageId TEXT PRIMARY KEY, channelId TEXT, prize TEXT, amountWinners TEXT, startDate TEXT, endDate TEXT)').run();
	db.close();
}

function deleteGiveaway(messageId) {
	const db = new Database('./src/database.sqlite', { verbose: console.log });
	const statement = db.prepare(`
			DELETE FROM giveaways 
			WHERE messageId = @messageId
		`);
	statement.run({ messageId: messageId });
	db.close();
}

function addGiveaway(messageId, channelId, prize, amountWinners, startDate, endDate) {
	const db = new Database('./src/database.sqlite', { verbose: console.log });
	const statement = db.prepare(`
			INSERT INTO giveaways (messageId, channelId, prize, amountWinners, startDate, endDate) VALUES (@messageId, @channelId, @prize, @amountWinners, @startDate, @endDate)
		`);
	statement.run({
		messageId: messageId,
		channelId: channelId,
		prize: prize,
		amountWinners: amountWinners,
		startDate: startDate,
		endDate: endDate,
	});
	db.close();
}

function getGiveaways() {
	const db = new Database('./src/database.sqlite', { verbose: console.log });
	const statement = db.prepare('SELECT * FROM giveaways');
	const result = statement.all();
	db.close();
	return result;
}

function getGiveaway(messageId) {
	const db = new Database('./src/database.sqlite', { verbose: console.log });
	if (messageId) {
		// Gets specified giveaway

		const statement = db.prepare('SELECT * FROM giveaways WHERE messageId = @messageId');
		const result = statement.get({ messageId: messageId });
		db.close();
		return result;
	}
	else {
		// Gets an unspecified/latest giveaway

		const statement = db.prepare('SELECT * FROM giveaways ORDER BY startDate DESC LIMIT 1');
		const result = statement.get({ messageId: messageId });
		db.close();
		return result;
	}
}


module.exports = {
	createDatabase,
	deleteGiveaway,
	addGiveaway,
	getGiveaways,
	getGiveaway,
};