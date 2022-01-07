const { guildId, adminRoleId } = require('../../config.json');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity('I love you.');

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
	},
};