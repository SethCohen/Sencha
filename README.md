# Sencha

## A discord bot for the OTeaU club server. 

This bot isn't meant to be used for any other Discord servers - although possible. This bot is specifically designed to work for the needs of a specific Discord server and thus may not work as intended in other servers. 

---

## Features
- Music playing
- Fun inside joke commands
- Utility & Moderation 
- Automatically posts wholesome memes to #memes :)

## Music Commands:
- `/clear` Clears queue.
- `/disconnect` Disconnects bot from channel.
- `/jump <track #>` Jumps to song in queue.
- `/loop <mode>` Available modes: `Off` `Track` `Queue` `Autoplay`
- `/np` Shows currently playing song.
- `/pause` Pauses current song.
- `/resume` Resumes current song.
- `/play <url>` Adds song to bottom of queue.
- `/playnext <url>` Adds song to top of queue.
- `/seek <time>` Goes to specified time in seconds.
- `/shuffle` Shuffles queue.
- `/skip` Skips currently playing song.

## Fun Commands:
- `/servercopypasta <user> <prefix>`
  - Posts ` our good christian atheist muslim jewish buddhist hindu taoist shinto sikh various aboriginal religions wicca pagan orange juice pastafarianism tea club server!`
  - `user` mentions the specified user.
  - `prefix` prefaces the copypasta.
  - e.g. `/servercopypasta No swearing in`
    - Sends `No swearing in our good christian atheist muslim jewish buddhist hindu taoist shinto sikh various aboriginal religions wicca pagan orange juice pastafarianism tea club server!` to chat.

- `/brick <user>`
  - Posts a gif of someone throwing a brick at a specified user.

## Utility Commands:
- `/rules <optional:rule number>`
  - Posts the rules to chat.
  - e.g. `/rules 5`
- `/giveaway create <time> <prize> <winners>`
- `/giveaway end <giveaway message id>`
- `/giveaway reroll <giveaway channel id> <giveaway message id>`
- `/giveaway delete <giveaway message id>`


## Moderation Commands:
Things to note:
- All moderation commands are automatically logged to `#moderator` with who got punished, the action author, the reason, etc.
- Every command has an optional `shame` parameter. Defaults to `No`. On `Yes`, the command output is visible to everyone. Only specify `Yes` if you wish for public chat to know **why** someone was banned.
- A copy of the reason is anonymously DM'd to the user punished through the Sencha bot. The user will not know who banned them, but they will at least be given an explanation. 

Commands:
- `/ban <user> <reason> <optional:shame>`
  - e.g. `/ban user: @Seth reason: Ban test. shame: Yes`

- `/kick <user> <reason> <optional:shame>`
  - e.g. `/kick user: @Seth reason: Kick test. shame: Yes` (Kicks user and doesn't hide command usage from chat)

- `/timeout <user> <duration> <reason> <optional:shame>`
  - e.g. `/timeout user: @Seth duration: 1m:30s reason: Timeout test. shame: Yes` (Sets a timeout length of 1 minute and 30 seconds and doesn't hide the command usage from chat)
  - e.g. `/timeout @Seth 5m Timeout test 2.` (Timeouts user for 5 minutes)
  - e.g. `/timeout @Seth 1d:2h:30m:5s Timeout test 3.` (Timeouts user for 1 day, 2 hours, 30 minutes, and 5 seconds)

- `/warn <user> <reason> <optional:shame>`
  - e.g. `/warn user: @Seth reason: Warning Test`

- `/userinfo <user>`
  - Prints how many the user has been punished.
  - e.g. `/userinfo user: @Seth`