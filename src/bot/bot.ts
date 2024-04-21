// import discord.js
import { Client, Events, GatewayIntentBits, TextChannel, messageLink } from 'discord.js';
import Database from "bun:sqlite";

// create a new Client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const db = new Database("../db/db.sqlite");

// listen for the client to be ready
client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});



client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'init') {
        //prints text channel id's
        const channels = Array.from(client.channels.cache.values())
        const channelIds = channels.filter(channel => channel.type == 0).map(channel => channel.id);
        await interaction.reply('channel.id');

        //prints server id
        const guildId = interaction.guild.id;
        db.query("insert or replace into servers values(?, ?)").run(obfuscateServerId(guildId), channelIds.toString());
    }
});
// login with the token from .env.local
client.login(process.env.DISCORD_TOKEN);

function obfuscateServerId(id: string){
    // do obsucation logic
    return id;
}
