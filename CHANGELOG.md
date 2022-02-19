# Changelog

## Upcoming

- Emote role assigning
- Socials feed (Send posts from specific Instagram or Twitter accounts to a specific channel)

## v1.6.0 - 2022-02-17
### Added
- Added auto posting wholesome memes every 24 hours to #memes channel. [[8ef0618]](https://github.com/SethCohen/Sencha/commit/8ef0618bf6d62bde094ef1f651a6397a1b126a65)

## v1.5.0 - 2022-02-17
### Added
- `/seek` `/jump` `/pause` `/resume` Music player commands. [[06b0adc]](https://github.com/SethCohen/Sencha/commit/06b0adc128ec6ca02a933426548f664dec06f721)

## v1.4.1 - 2022-01-19
### Added
- `/giveaway reroll | end | delete` Added checks for if the command user is the giveaway author. [[e97aaff]](https://github.com/SethCohen/Sencha/commit/e97aaff9b084419e6181e878dddb3b88efac228a)
- `/giveaway reroll` Added giveaway message id to footer. [[20b0934]](https://github.com/SethCohen/Sencha/commit/20b0934c8c4db27d5dd4ed6ecf5c0f7326bb363d)
## v1.4.0 - 2022-01-15
### Added
- `/giveaway create` Added creating giveaways with persistence in case bot crashes and restarts. [[c954141]](https://github.com/SethCohen/Sencha/commit/c9541413e3dfefa3af20c89f58f469034589eefb)
- `/giveaway end` Added immediately ending active giveaways. [[1f82e02]](https://github.com/SethCohen/Sencha/commit/1f82e02cb5bccd278c48f20348438bba95fb4fb9)
- `/giveaway reroll` Added ability to reroll a giveaway. [[711687e]](https://github.com/SethCohen/Sencha/commit/711687e069c494b96593f62a2341d4089ea85c21)
- `/giveaway delete` Added ability to end a giveaway without pulling winners. [[f2c825f]](https://github.com/SethCohen/Sencha/commit/f2c825f688bb219f6a445bce06b4d5c2066214b1)

## v1.3.4 - 2022-01-14
### Fixed
- `messageUpdate` Fixed error thrown on field value max length limit break. Now truncates messages longer than 1024 characters. [[f2dd994]](https://github.com/SethCohen/Sencha/commit/f2dd994be3c58fbca7b2889218e57e6a837577de)

## v1.3.3 - 2022-01-13
### Fixed
- `messageUpdate` Fixed messageUpdate throwing an error on non-text-type Messages [[dd06e77]](https://github.com/SethCohen/Sencha/commit/dd06e77663a68688636a857336d6873797df1e8e)

## v1.3.2 - 2022-01-12
### Added
- `messageUpdate` Added Jump To link to edited message. [[0a9ff20]](https://github.com/SethCohen/Sencha/commit/0a9ff20c148684cf0fbdbd349d2c261c423f45ed)
- `messageDelete` Added image logging.[[0a9ff20]](https://github.com/SethCohen/Sencha/commit/0a9ff20c148684cf0fbdbd349d2c261c423f45ed)

## v1.3.1 - 2022-01-08
### Fixed
- `messageUpdate` `messageDelete` Fixed crash error on partials. [[083ad11]](https://github.com/SethCohen/Sencha/commit/083ad11c3eae2c789627e1b3fbd228fa02fff7b9)
### Added 
- `messageUpdate` `messageDelete` Added channel name to logger. [[083ad11]](https://github.com/SethCohen/Sencha/commit/083ad11c3eae2c789627e1b3fbd228fa02fff7b9)

## v1.3.0 - 2022-01-07
### Fixed
- Fixed `ban` command perm error being not found. [[64e253b]](https://github.com/SethCohen/Sencha/commit/64e253bffbea9a9b3a15a3ca8cc28f302d3adc88)
### Added
- Added deleted/edited message logging to a specified logging channel as specified in a config.json [[d5131d2]](https://github.com/SethCohen/Sencha/commit/d5131d29fe384906d4fe99bcda32d39c0247040c)

## v1.2.5 - 2021-11-15

### Fixed
- Fixed `/brick` error. Bot would crash on /brick due to being unable to find gif directory. [[d8300a2]](https://github.com/SethCohen/Sencha/commit/d8300a2df664d8c3f6ab3aa0761ab3ad0d6893f6)
- Fixed music player bug where player would suddenly stop or skip over songs due to old codecs. [[ddd1ee2]](https://github.com/SethCohen/Sencha/commit/ddd1ee28c94e677787bc81b69eb21c570685f3e3)

## v1.2.4 - 2021-11-14

### Added
- Added `shame` option to `/ban`, if user selects Yes, sends message to channel saying why they got banned. [[f9871a0]](https://github.com/SethCohen/Sencha/commit/f9871a085f3f745a4b4ab4eab044efef5b6159c5)
- Added more rules to `/rule` [[02cf198]](https://github.com/SethCohen/Sencha/commit/02cf198789933ef960839559376f80b9b3a13df7)

### Changed
- Changed bans to not auto-post to first accessible channel. [[e514934]](https://github.com/SethCohen/Sencha/commit/e5149340eac75f4e4917622cb53e28234053d43a)
- Changed `/ban` output. [[e514934]](https://github.com/SethCohen/Sencha/commit/e5149340eac75f4e4917622cb53e28234053d43a)
- Changed `/noswearing` into `/servercopypasta` [[b9d1c23]](https://github.com/SethCohen/Sencha/commit/b9d1c23578d47c7c53202de49fe2236596aaaee7)

### Removed
- Removed `guildBanAdd` event [[f9871a0]](https://github.com/SethCohen/Sencha/commit/f9871a085f3f745a4b4ab4eab044efef5b6159c5)

## v1.2.3 - 2021-10-06

### Changed
- Changed `/brick` implementation to parse in a directory of files and choose file randomly instead of using switch-case. [[023cd01]](https://github.com/SethCohen/Sencha/commit/023cd0145ee34cc16f93a339db4f11b85d52cddd)

## v1.2.2 - 2021-09-26

### Changed
- Changed bot to leave when channels empty. [[2ebc884]](https://github.com/SethCohen/Sencha/commit/2ebc884ca3c52ce5f3073ecd06c99bce4007237a)

### Fixed
- Fixed bot not disconnecting from voice channel on `/disconnect`. [[2ebc884]](https://github.com/SethCohen/Sencha/commit/2ebc884ca3c52ce5f3073ecd06c99bce4007237a)
- Fixed livestreams suddenly cutting off by changing streaming format to use hsl. [[2ebc884]](https://github.com/SethCohen/Sencha/commit/2ebc884ca3c52ce5f3073ecd06c99bce4007237a)

## v1.2.1 - 2021-09-25

### Changed
- Changed music player to not leave on queue end or empty. [[52bd9fe]](https://github.com/SethCohen/Sencha/commit/52bd9fec8acdb8596a6ebfa353556ee87bdfd15e)

### Fixed
- Fixed music player suddenly stopping and avc1 codec error by adding ffmpeg-static. [[f64fff8]](https://github.com/SethCohen/Sencha/commit/f64fff8afee7b4070d672b8c8f38dd56ff6fc367)

## v1.2.0 - 2021-09-24

### Added
- Added `/brick` [[cf47b07]](https://github.com/SethCohen/Sencha/commit/cf47b07c06bd08432e6c2cc13bd761e068aed5c2)
- Added `/noswearing` [[94fc593]](https://github.com/SethCohen/Sencha/commit/94fc5936ccdd522c34d05789a97b0d2ba4a04aab)
- Added `/rules` [[148241c]](https://github.com/SethCohen/Sencha/commit/148241ce53e212836bc0584d39a287949aa92d0b)

## v1.1.0 - 2021-09-21

### Added
- Added `/ban` command. [[f3af22f]](https://github.com/SethCohen/Sencha/commit/f3af22f6d635ad0a7551dee337ffa4a3e227e61d)
- Added bot response on compliments. [[b118268]](https://github.com/SethCohen/Sencha/commit/b1182681087aa25845524058a85f894fabffcc11)
- Added pagination to `/queue` [[b81023a]](https://github.com/SethCohen/Sencha/commit/b81023a46258e9d4dace6df88c20376ada7df470)
- Added `/clear`, `/loop`, `/np`, `/playnext`, `/remove` ,`/shuffle` [[5b4f547]](https://github.com/SethCohen/Sencha/commit/5b4f547115e65cdad1171a80ce1ed3c779fca0d3) [[2597436]](https://github.com/SethCohen/Sencha/commit/2597436f4725908b70bf787b5fcdf65b48a64a49)

### Changed
- Changed destroy queue in `play.js` to delete queue. [[5b4f547]](https://github.com/SethCohen/Sencha/commit/5b4f547115e65cdad1171a80ce1ed3c779fca0d3)

## v1.0.0 - 2021-09-20

### Added
- Basic music player functionality. [[a34f638]](https://github.com/SethCohen/Sencha/commit/a34f638e706f7e3f7165c99899e16a554b58d52d)