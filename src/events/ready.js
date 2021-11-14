const { guildId, banCommandId, adminRoleId } = require('../../config.json');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity('I love you.');

		const guild = client.guilds.cache.get(guildId);
		const command = await guild.commands.fetch(banCommandId);

		const permissions = [
			{
				id: adminRoleId,
				type: 'ROLE',
				permission: true,
			},
		];

		await command.permissions.add({ permissions });
	},
};