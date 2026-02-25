const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');
const chalk = require('chalk');
// const path = require('path');
require("dotenv").config();

const { match } = require('assert/strict');

const client = new Client();
// Prefix for commands
const prefix = '!';
const OWNER_ID = process.env.OWNER_ID;

client.commands = new Map();

// ==================================================
// Load all commands in the /commands/* directory
// ==================================================
fs.readdirSync("./commands").forEach(file => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
});

// ==================================================
// Listen for messages and execute commands
// ==================================================
client.on('messageCreate', async message => {

    // Normalize the message
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    // check if the command exists and if the message starts with the prefix and is from the owner
    if (!command) return;
    if (!message.content.startsWith(prefix) || message.author.id !== OWNER_ID) return;

    try {
        await command.execute(message, args);
    } catch (err) {
        console.error(err);
    }
})

// ==================================================
// log a message in the console when the selfbot is ready
// ==================================================
client.on('ready', () => {
    console.log(`Selfbot connected as ${client.user.tag}`);
});

client.login(process.env.TOKEN);