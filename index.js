const Discord = require('discord.js');
const client = new Discord.Client(
    {intents: ["GUILD_MESSAGES", "GUILD_VOICE_STATES", "GUILDS"]}
);

const fs = require("fs");

const config = require('./config.json');
const commands = require(`./bin/commands`);

//in case the bot was not configured properly
if(!config.PREFIX || !config.BOT_TOKEN) {
    console.error("Error: the configuration file was configured properly.");
    console.error("Make sure there are no spelling mistakes.");
    process.exit(1);
}

//create the recordings directory in case people forget to do so
try {
    fs.mkdirSync("./recordings/");
} catch(ignored) {}

client.on('message', msg => {
    if (msg.content.startsWith(config.PREFIX)) {
        const commandBody = msg.content.substring(config.PREFIX.length).split(' ');
        const channelName = commandBody[1];

        if (commandBody[0] === ('enter') && commandBody[1]) commands.enter(msg, channelName);
        if (commandBody[0] === ('exit')) commands.exit(msg);
    }
});

client.login(config.BOT_TOKEN);

client.on('ready', () => {
    console.log(`\nONLINE\n`);
});