# Sencha

## A discord bot for the OTeaU club server. 

This bot isn't meant to be used for any other Discord servers - although possible. This bot is specifically designed to work for the needs of a specific Discord server and thus may not work as intended in other servers. 

---

## Moderation Commands:
- `/ban <user> <reason> <optional:shame>`
  - Bans a user, sending a log of it to `#moderator` and anonymously DMs the user with the reason.
  - If `shame` is `True`, the command usage is posted to chat for all users to see who was banned and for why.
  - e.g. `/ban user: @Seth reason: Ban test. shame: Yes`

- `/kick <user> <reason> <optional:shame>`
  - Kicks a user, sending a log of it to `#moderator` and anonymously DMs the user with the reason.
  - If `shame` is `True`, the command usage is posted to chat for all users to see who was banned and for why.
  - e.g. `/kick user: @Seth reason: Kick test. shame: Yes`

- `/timeout <user> <duration> <reason> <optional:shame>`
  - Timeouts a user, sending a log of it to `#moderator` and anonymously DMs the user with the reason.
  - If `shame` is `True`, the command usage is posted to chat for all users to see who was banned and for why.
  - e.g. `/timeout user: @Seth duration: 1m:30s reason: Timeout test. shame: Yes` (Sets a timeout length of 1 minute and 30 seconds)
  - e.g. `/timeout user: @Seth duration: 5m reason: Timeout test 2.` (Timeouts user for 5 minutes)
  - e.g. `/timeout user: @Seth duration: 1d:2h:30m:5s reason: Timeout test 3.` (Timeouts user for 1 day, 2 hours, 30 minutes, and 5 seconds)