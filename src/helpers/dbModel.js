const Database = require('better-sqlite3');

function createDatabase() {
	const db = new Database('./src/database.sqlite');

	const createStatements = [
		'CREATE TABLE IF NOT EXISTS giveaways(messageId TEXT PRIMARY KEY, channelId TEXT, prize TEXT, amountWinners TEXT, startDate TEXT, endDate TEXT)',
		'CREATE TABLE IF NOT EXISTS punishmentLogs(user TEXT UNIQUE, timesBanned INTEGER, timesKicked INTEGER, timesTimeout INTEGER, timesWarned INTEGER, timesBricked INTEGER)',
	].map(sql => db.prepare(sql));

	for (const createStatement of createStatements) {
		createStatement.run();
	}
	db.close();
}

function deleteGiveaway(messageId) {
	const db = new Database('./src/database.sqlite');
	const statement = db.prepare(`
			DELETE FROM giveaways 
			WHERE messageId = @messageId
		`);
	statement.run({ messageId: messageId });
	db.close();
}

function addGiveaway(messageId, channelId, prize, amountWinners, startDate, endDate) {
	const db = new Database('./src/database.sqlite');
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
	const db = new Database('./src/database.sqlite');
	const statement = db.prepare('SELECT * FROM giveaways');
	const result = statement.all();
	db.close();
	return result;
}

function getGiveaway(messageId) {
	const db = new Database('./src/database.sqlite');
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

function updatePunishmentLogs(user, column) {
	const db = new Database('./src/database.sqlite');
	const insertStatement = db.prepare(`
			INSERT OR IGNORE INTO punishmentLogs (user, timesBanned, timesKicked, timesTimeout, timesWarned, timesBricked) 
			VALUES (@user, 0, 0, 0, 0, 0)
		`);
	insertStatement.run({
		user: user,
	});
	let updateStatement;
	switch (column) {
	case 'timesBanned':
		updateStatement = db.prepare('UPDATE punishmentLogs SET timesBanned = timesBanned + 1 WHERE user = @user');
		break;
	case 'timesKicked':
		updateStatement = db.prepare('UPDATE punishmentLogs SET timesKicked = timesKicked + 1 WHERE user = @user');
		break;
	case 'timesTimeout':
		updateStatement = db.prepare('UPDATE punishmentLogs SET timesTimeout = timesTimeout + 1 WHERE user = @user');
		break;
	case 'timesWarned':
		updateStatement = db.prepare('UPDATE punishmentLogs SET timesWarned = timesWarned + 1 WHERE user = @user');
		break;
	case 'timesBricked':
		updateStatement = db.prepare('UPDATE punishmentLogs SET timesBricked = timesBricked + 1 WHERE user = @user');
		break;
	}
	updateStatement.run({ user: user });
	db.close();
}

function getUserPunishmentLogs(user) {
	const db = new Database('./src/database.sqlite');

	const statement = db.prepare('SELECT * FROM punishmentLogs WHERE user = @user');
	const result = statement.get({ user: user });
	db.close();
	return result;
}

function updateStarboard(starboardId, messageId) {
	const db = new Database('./src/database.sqlite');
	const insertStatement = db.prepare(`
			INSERT OR IGNORE INTO starboard (starboardId, messageId) 
			VALUES (@starboardId, @messageId)
		`);
	insertStatement.run({
		starboardId: starboardId,
		messageId: messageId,
	});
	db.close();
}

function getStarboard(messageId) {
	const db = new Database('./src/database.sqlite');

	const statement = db.prepare('SELECT * FROM starboard WHERE messageId = @messageId');
	const result = statement.get({ messageId: messageId });
	db.close();
	return result;
}

function removeFromStarboard(messageId) {
	const db = new Database('./src/database.sqlite');

	const statement = db.prepare('DELETE FROM starboard WHERE messageId = @messageId');
	statement.run({ messageId: messageId });
	db.close();
}

module.exports = {
	createDatabase,
	deleteGiveaway,
	addGiveaway,
	getGiveaways,
	getGiveaway,
	updatePunishmentLogs,
	getUserPunishmentLogs,
	updateStarboard,
	getStarboard,
	removeFromStarboard,
};