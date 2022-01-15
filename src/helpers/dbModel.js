const Database = require('better-sqlite3');

function createDatabase() {
	const db = new Database('./src/database.sqlite', { verbose: console.log });
	db.prepare('CREATE TABLE IF NOT EXISTS giveaways(messageId TEXT PRIMARY KEY, channelId TEXT, prize TEXT, amountWinners TEXT, endDate TEXT)').run();
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

function addGiveaway(messageId, channelId, prize, amountWinners, endDate) {
	const db = new Database('./src/database.sqlite', { verbose: console.log });
	const statement = db.prepare(`
			INSERT INTO giveaways (messageId, channelId, prize, amountWinners, endDate) VALUES (@messageId, @channelId, @prize, @amountWinners, @endDate)
		`);
	statement.run({
		messageId: messageId,
		channelId: channelId,
		prize: prize,
		amountWinners: amountWinners,
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

module.exports = {
	createDatabase,
	deleteGiveaway,
	addGiveaway,
	getGiveaways,
};