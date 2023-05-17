import { AuditLogEvent, EmbedBuilder, Events } from 'discord.js';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
	name: Events.GuildAuditLogEntryCreate,
	execute(auditLogEntry, guild) {
		if (auditLogEntry.action === AuditLogEvent.MemberBanAdd || auditLogEntry.action === AuditLogEvent.MemberKick || (auditLogEntry.action === AuditLogEvent.MemberUpdate && auditLogEntry.changes[0].key === 'communication_disabled_until') && auditLogEntry.changes[0].old === undefined) {
			logToModChannel(auditLogEntry, guild);
			return;
		}
	},
};

const modActions = {
	[AuditLogEvent.MemberBanAdd]: 'banned',
	[AuditLogEvent.MemberKick]: 'kicked',
	[AuditLogEvent.MemberUpdate]: 'muted',
};

async function logToModChannel(auditLogEntry, guild) {
	if (!process.env.MOD_CHANNEL_ID) {
		console.log('MOD_CHANNEL_ID is not specified in .env file.\nCannot log mod actions.');
		return;
	}

	try {
		const embed = new EmbedBuilder()
			.setAuthor({ name: auditLogEntry.target.tag, iconURL:auditLogEntry.target.displayAvatarURL() })
			.setColor(0xbc95ff)
			.setDescription(`User has been ${modActions[auditLogEntry.action]}.\n**Reason:** ${auditLogEntry.reason}\n**Moderator:** ${auditLogEntry.executor}`)
			.setTimestamp(auditLogEntry.createdTimestamp)
			.setFooter({ text: 'The bot creator doesnt like logging :(' });

		const modChannel = await guild.channels.fetch(process.env.MOD_CHANNEL_ID);
		await modChannel.send({ embeds: [embed] });
	}
	catch (e) {
		console.error(e);
	}
}