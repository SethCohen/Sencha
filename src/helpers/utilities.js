function isGuildMemberModerator(member) {
	return member.roles.cache.has(process.env.MOD_ROLE_ID);
}

async function sendModInteractionResponseToServer(interaction, member, reason, shame_user, interactionType) {
	await interaction.reply({
		content: `**${member}** has been ${interactionType}. \n**Reason:** ${reason}`,
		ephemeral: !shame_user,
	});
}

async function sendModInteractionResponseToUser(member, interaction, reason, interactionType) {
	await member.send(`**You've been ${interactionType} from ${interaction.guild.name}.**\n**Reason:** ${reason}`);
}

export {
	isGuildMemberModerator,
	sendModInteractionResponseToServer,
	sendModInteractionResponseToUser,
};