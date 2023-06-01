# Changelog

## Upcoming

- Emote role assigning
- Socials feed (Send posts from specific Instagram or Twitter accounts to a specific channel)

## [1.7.1](https://github.com/SethCohen/Sencha/compare/v1.7.0...v1.7.1) (2023-06-01)


### Bug Fixes

* **snipe:** fixed error on no message reference ([4da2622](https://github.com/SethCohen/Sencha/commit/4da262236310e57817993f0264aa318758a84f7c))

## [1.7.0](https://github.com/SethCohen/Sencha/compare/v1.6.0...v1.7.0) (2023-05-17)


### Features

* added audit log tracking ([821a584](https://github.com/SethCohen/Sencha/commit/821a584aa500b1de2671b4d38a8b0f0d82122357))

## [1.6.0](https://github.com/SethCohen/Sencha/compare/v1.5.0...v1.6.0) (2023-04-25)


### Features

* autoposting wholesome memes now autopulls from subreddit ([c292509](https://github.com/SethCohen/Sencha/commit/c292509ab8684a2b4faddfcd564ff418f2fb4e27))
* **snipe:** added show replied message ([e4fc0c3](https://github.com/SethCohen/Sencha/commit/e4fc0c3c4958863feb9a926667c6b551f1a01bf9)), closes [#23](https://github.com/SethCohen/Sencha/issues/23)


### Bug Fixes

* fixed error bot crash on no repliedMessage found. ([36532dc](https://github.com/SethCohen/Sencha/commit/36532dc90a080981290192cb422496f175b3abd5))
* **starboard:** fixed starboard replied author styling ([5480322](https://github.com/SethCohen/Sencha/commit/5480322dac91f487d68d65932148752f4eb4dda9))

## [1.5.0](https://github.com/SethCohen/Sencha/compare/v1.4.0...v1.5.0) (2022-12-01)


### Features

* added message pruning to `/ban` ([5c20f67](https://github.com/SethCohen/Sencha/commit/5c20f670728f9a186d27281ed2575f22bbcba686)), closes [#20](https://github.com/SethCohen/Sencha/issues/20)

## [1.4.0](https://github.com/SethCohen/Sencha/compare/v1.3.0...v1.4.0) (2022-12-01)


### Features

* added replied content to starboard ([5f2003d](https://github.com/SethCohen/Sencha/commit/5f2003d287d77929268f56cda19703bd4b066efa)), closes [#19](https://github.com/SethCohen/Sencha/issues/19)
* **rules:** added new rules easter eggs ([f8ccf24](https://github.com/SethCohen/Sencha/commit/f8ccf242e67d857e3b232fca93dfab156ae68c6b)), closes [#17](https://github.com/SethCohen/Sencha/issues/17)


### Bug Fixes

* **rules:** fixed typo ([4d6344b](https://github.com/SethCohen/Sencha/commit/4d6344b578c7dbe1fb1b01f646234e4b5c10f1ac)), closes [#18](https://github.com/SethCohen/Sencha/issues/18)
* **starstats:** fixed user stats received values display. ([d9ba206](https://github.com/SethCohen/Sencha/commit/d9ba2064a1f26aef6da59e2b9643f86f8698582f))

## [1.3.0](https://github.com/SethCohen/Sencha/compare/v1.2.4...v1.3.0) (2022-10-16)


### Features

* **starstats:** added `/starstats <user>` ([ee6885b](https://github.com/SethCohen/Sencha/commit/ee6885b567e8a596af5aa184134baa21119dd7ec))

## [1.2.4](https://github.com/SethCohen/Sencha/compare/v1.2.3...v1.2.4) (2022-10-13)


### Bug Fixes

* **starboard:** reverted starboard reaction threshold ([a7f008c](https://github.com/SethCohen/Sencha/commit/a7f008ce5017c025b75e8dd067a79331fdc3780e))

## [1.2.3](https://github.com/SethCohen/Sencha/compare/v1.2.2...v1.2.3) (2022-10-13)


### Bug Fixes

* **ban|kick|timeout|warn:** added catch for no modChannelId specified ([d1f8691](https://github.com/SethCohen/Sencha/commit/d1f869190aab03c10c9a05aedd54a166a6582e98))
* **dbModel:** fixed create statements to include starboard tables ([1bb4081](https://github.com/SethCohen/Sencha/commit/1bb40819e9da68f685f886cedd9221c8b96a80e8))
* fixed error on no `wholesome-memes` folder ([cc968dd](https://github.com/SethCohen/Sencha/commit/cc968dd6482d76f75eb90684f866e6881dcd5ba1))
* **messageDelete:** added catch for no logChannelId specified ([c48c2a7](https://github.com/SethCohen/Sencha/commit/c48c2a74a80cd1158de01be2a595b5dabf37b767))
* **messageReactionAdd|messageReactionRemove:** added catch for no starboardChannelId specified ([ddd5bbd](https://github.com/SethCohen/Sencha/commit/ddd5bbdf955bb2f605d0a0542f6087ccc9dc9353))
* **ready:** added catch for no meme files in wholesome-memes folder ([e6e5ebb](https://github.com/SethCohen/Sencha/commit/e6e5ebb3fd88967b439032da13fcb4a479255ec8))
* **ready:** added catch for no memeChannelId specified ([4280684](https://github.com/SethCohen/Sencha/commit/42806842d70b6c15be299667ec330261f4622fad))

## [1.2.2](https://github.com/SethCohen/Sencha/compare/v1.2.1...v1.2.2) (2022-10-10)


### Bug Fixes

* snipe is now per-channel instead of global ([#10](https://github.com/SethCohen/Sencha/issues/10)) ([5b7c4f8](https://github.com/SethCohen/Sencha/commit/5b7c4f80ae82977764f6e7709c82946e7bda8b45))

## [1.2.1](https://github.com/SethCohen/Sencha/compare/v1.2.0...v1.2.1) (2022-08-13)


### Bug Fixes

* added catch for interaction edits ([4160f34](https://github.com/SethCohen/Sencha/commit/4160f34324604c888e2371b04db69fe3329cc7dd))
* added catch for null giveaways ([fe850eb](https://github.com/SethCohen/Sencha/commit/fe850eb486eefb8d3610867b9c4dec306b50bb83))

## [1.2.0](https://github.com/SethCohen/Sencha/compare/v1.1.0...v1.2.0) (2022-08-08)


### Features

* added docker support ([d0ddae0](https://github.com/SethCohen/Sencha/commit/d0ddae0a7ff710d622349f4e5c0ab5c1f0f82c97))
* changed pin threshold ([4d68e5c](https://github.com/SethCohen/Sencha/commit/4d68e5caa373cecaa404fff080381969c2de9b41))


### Bug Fixes

* fixed starboard msg being delete on all reaction removes ([d552da6](https://github.com/SethCohen/Sencha/commit/d552da6b8a9d59ffebb9b1db8a2e2a8b4b6f8c62))

## [1.1.0](https://github.com/SethCohen/Sencha/compare/v1.0.0...v1.1.0) (2022-07-22)


### Features

* added `/starstats` ([bcb24ad](https://github.com/SethCohen/Sencha/commit/bcb24add49519b3849977525619f1f7e6c29f932))
* added starboard support ([c893b01](https://github.com/SethCohen/Sencha/commit/c893b01bfc7510ffeff4abca840b7c7685ffb0ae))

## 1.0.0 (2022-07-20)


### Features

* added `/snipe` ([a10dbdb](https://github.com/SethCohen/Sencha/commit/a10dbdb229275a04d9a94547a4dc1d9202b29fa5))
* added brick tracking support ([95984c4](https://github.com/SethCohen/Sencha/commit/95984c485234b439fb5db3e44634c3453153f66a))
* added new brick gif ([4e0ae14](https://github.com/SethCohen/Sencha/commit/4e0ae1467709768ee7bb0050e83157f78a7de7df))
* Added `/kick` [[4eade79]](https://github.com/SethCohen/Sencha/commit/4eade79ecffcff99cd00244aea90b7a1239f4209)
* Added `/timeout` [[0c9fdad]](https://github.com/SethCohen/Sencha/commit/0c9fdadb6e63d7bf93006d8320cab2940a065ad3)
* Added `/warn` [[0e8d792]](https://github.com/SethCohen/Sencha/commit/0e8d792352abf7496ffbdd99648c3bafa6c238a0)
* Added `/userinfo` [[d6f7552]](https://github.com/SethCohen/Sencha/commit/d6f7552a1885c7efc6aa711c11e6fbfc0eb2c4c5)
* Added punishment logging to `#moderator` channel as well as to a database. [[6cfcba9]](https://github.com/SethCohen/Sencha/commit/6cfcba9ab3d3f47f7171099e39bb22f41fa17d95) [[cd11390]](https://github.com/SethCohen/Sencha/commit/cd11390ba767a45365fd607488e38bf07017d1ab) [[d231616]](https://github.com/SethCohen/Sencha/commit/d2316164b5bdc53cf8a66d15b771d175e9fd5067)
* Added auto posting wholesome memes every 24 hours to #memes channel. [[8ef0618]](https://github.com/SethCohen/Sencha/commit/8ef0618bf6d62bde094ef1f651a6397a1b126a65
* `/seek` `/jump` `/pause` `/resume` Music player commands. [[06b0adc]](https://github.com/SethCohen/Sencha/commit/06b0adc128ec6ca02a933426548f664dec06f721)
* `/giveaway reroll | end | delete` Added checks for if the command user is the giveaway author. [[e97aaff]](https://github.com/SethCohen/Sencha/commit/e97aaff9b084419e6181e878dddb3b88efac228a)
* `/giveaway reroll` Added giveaway message id to footer. [[20b0934]](https://github.com/SethCohen/Sencha/commit/20b0934c8c4db27d5dd4ed6ecf5c0f7326bb363d)
* `/giveaway create` Added creating giveaways with persistence in case bot crashes and restarts. [[c954141]](https://github.com/SethCohen/Sencha/commit/c9541413e3dfefa3af20c89f58f469034589eefb)
* `/giveaway end` Added immediately ending active giveaways. [[1f82e02]](https://github.com/SethCohen/Sencha/commit/1f82e02cb5bccd278c48f20348438bba95fb4fb9)
* `/giveaway reroll` Added ability to reroll a giveaway. [[711687e]](https://github.com/SethCohen/Sencha/commit/711687e069c494b96593f62a2341d4089ea85c21)
* `/giveaway delete` Added ability to end a giveaway without pulling winners. [[f2c825f]](https://github.com/SethCohen/Sencha/commit/f2c825f688bb219f6a445bce06b4d5c2066214b1)
* `messageUpdate` Added Jump To link to edited message. [[0a9ff20]](https://github.com/SethCohen/Sencha/commit/0a9ff20c148684cf0fbdbd349d2c261c423f45ed)
* `messageDelete` Added image logging.[[0a9ff20]](https://github.com/SethCohen/Sencha/commit/0a9ff20c148684cf0fbdbd349d2c261c423f45ed)
* `messageUpdate` `messageDelete` Added channel name to logger. [[083ad11]](https://github.com/SethCohen/Sencha/commit/083ad11c3eae2c789627e1b3fbd228fa02fff7b9)
* Added deleted/edited message logging to a specified logging channel as specified in a config.json [[d5131d2]](https://github.com/SethCohen/Sencha/commit/d5131d29fe384906d4fe99bcda32d39c0247040c)
* Added `shame` option to `/ban`, if user selects Yes, sends message to channel saying why they got banned. [[f9871a0]](https://github.com/SethCohen/Sencha/commit/f9871a085f3f745a4b4ab4eab044efef5b6159c5)
* Added more rules to `/rule` [[02cf198]](https://github.com/SethCohen/Sencha/commit/02cf198789933ef960839559376f80b9b3a13df7)
* Removed `discord-player` and all music functionality in favour of [standalone music player bot](https://github.com/SethCohen/Loudred). [[d97cce1]](https://github.com/SethCohen/Sencha/commit/d97cce14e1513850fc6dac89035685020b3fcb12)
* Changed `/ban` and other related moderator commands to use Role Checking rather than Permission Checking.[[8cbe8cd]](https://github.com/SethCohen/Sencha/commit/8cbe8cdb221b68136cc087d5400a6d0adb8bf253)
* Changed wholesomeme autoposting schedule to every 12:00pm EST. [[e9b3589]](https://github.com/SethCohen/Sencha/commit/e9b358909b3dd975e6daa091fce3119e91410f36)
* Changed bans to not auto-post to first accessible channel. [[e514934]](https://github.com/SethCohen/Sencha/commit/e5149340eac75f4e4917622cb53e28234053d43a)
* Changed `/ban` output. [[e514934]](https://github.com/SethCohen/Sencha/commit/e5149340eac75f4e4917622cb53e28234053d43a)
* Changed `/noswearing` into `/servercopypasta` [[b9d1c23]](https://github.com/SethCohen/Sencha/commit/b9d1c23578d47c7c53202de49fe2236596aaaee7)
* Changed `/brick` implementation to parse in a directory of files and choose file randomly instead of using switch-case. [[023cd01]](https://github.com/SethCohen/Sencha/commit/023cd0145ee34cc16f93a339db4f11b85d52cddd)
* Changed bot to leave when channels empty. [[2ebc884]](https://github.com/SethCohen/Sencha/commit/2ebc884ca3c52ce5f3073ecd06c99bce4007237a)
* Changed music player to not leave on queue end or empty. [[52bd9fe]](https://github.com/SethCohen/Sencha/commit/52bd9fec8acdb8596a6ebfa353556ee87bdfd15e)
* Added `/brick` [[cf47b07]](https://github.com/SethCohen/Sencha/commit/cf47b07c06bd08432e6c2cc13bd761e068aed5c2)
* Added `/noswearing` [[94fc593]](https://github.com/SethCohen/Sencha/commit/94fc5936ccdd522c34d05789a97b0d2ba4a04aab)
* Added `/rules` [[148241c]](https://github.com/SethCohen/Sencha/commit/148241ce53e212836bc0584d39a287949aa92d0b)
* Added `/ban` command. [[f3af22f]](https://github.com/SethCohen/Sencha/commit/f3af22f6d635ad0a7551dee337ffa4a3e227e61d)
* Added bot response on compliments. [[b118268]](https://github.com/SethCohen/Sencha/commit/b1182681087aa25845524058a85f894fabffcc11)
* Added pagination to `/queue` [[b81023a]](https://github.com/SethCohen/Sencha/commit/b81023a46258e9d4dace6df88c20376ada7df470)
* Added `/clear`, `/loop`, `/np`, `/playnext`, `/remove` ,`/shuffle` [[5b4f547]](https://github.com/SethCohen/Sencha/commit/5b4f547115e65cdad1171a80ce1ed3c779fca0d3) [[2597436]](https://github.com/SethCohen/Sencha/commit/2597436f4725908b70bf787b5fcdf65b48a64a49)
* Changed destroy queue in `play.js` to delete queue. [[5b4f547]](https://github.com/SethCohen/Sencha/commit/5b4f547115e65cdad1171a80ce1ed3c779fca0d3)


### Bug Fixes

* fix undefined user info ([8b3a1ea](https://github.com/SethCohen/Sencha/commit/8b3a1ea14a372e09b91131870baaa29bed51f1ff))
* fixed deprecation changes from discord.js v13 to v14 ([e1fc44f](https://github.com/SethCohen/Sencha/commit/e1fc44f95d38f852b4b4dcd287836f384733cfad))
* `messageUpdate` Fixed error thrown on field value max length limit break. Now truncates messages longer than 1024 characters. [[f2dd994]](https://github.com/SethCohen/Sencha/commit/f2dd994be3c58fbca7b2889218e57e6a837577de)
* `messageUpdate` Fixed messageUpdate throwing an error on non-text-type Messages [[dd06e77]](https://github.com/SethCohen/Sencha/commit/dd06e77663a68688636a857336d6873797df1e8e)
* `messageUpdate` `messageDelete` Fixed crash error on partials. [[083ad11]](https://github.com/SethCohen/Sencha/commit/083ad11c3eae2c789627e1b3fbd228fa02fff7b9)
* Fixed `ban` command perm error being not found. [[64e253b]](https://github.com/SethCohen/Sencha/commit/64e253bffbea9a9b3a15a3ca8cc28f302d3adc88)
* Fixed `/brick` error. Bot would crash on /brick due to being unable to find gif directory. [[d8300a2]](https://github.com/SethCohen/Sencha/commit/d8300a2df664d8c3f6ab3aa0761ab3ad0d6893f6)
* Fixed music player bug where player would suddenly stop or skip over songs due to old codecs. [[ddd1ee2]](https://github.com/SethCohen/Sencha/commit/ddd1ee28c94e677787bc81b69eb21c570685f3e3)
* Fixed bot not disconnecting from voice channel on `/disconnect`. [[2ebc884]](https://github.com/SethCohen/Sencha/commit/2ebc884ca3c52ce5f3073ecd06c99bce4007237a)
* Fixed livestreams suddenly cutting off by changing streaming format to use hsl. [[2ebc884]](https://github.com/SethCohen/Sencha/commit/2ebc884ca3c52ce5f3073ecd06c99bce4007237a)
* Fixed music player suddenly stopping and avc1 codec error by adding ffmpeg-static. [[f64fff8]](https://github.com/SethCohen/Sencha/commit/f64fff8afee7b4070d672b8c8f38dd56ff6fc367)


### Performance Improvements

* updated dependencies ([25047c3](https://github.com/SethCohen/Sencha/commit/25047c3558922bc452ae22944044c0c99c47f615))
