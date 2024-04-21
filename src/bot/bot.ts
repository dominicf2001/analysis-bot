// import discord.js
import { Client, Events, GatewayIntentBits, TextChannel, messageLink } from 'discord.js';
import Database from "bun:sqlite";

// create a new Client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
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
        await interaction.reply('Initializing...');

        const userIds: String[] = [];
        for (const guild of Array.from(client.guilds.cache.values())){
            console.log(`Fetching members for guild: ${guild.name}`);

            try {
                const members = await guild.members.fetch();

                members.forEach(member => {
                    console.log(`Member ID: ${member.user.username}`);
                    userIds.push(member.user.username);
                });
            } catch (error) {
                console.error('Failed to fetch members:', error);
            }
        }

        //prints server id
        const guildId = interaction.guild.id;
        db.query("insert or replace into servers values(?, ?)").run(obfuscateServerId(guildId), JSON.stringify(channelIds));
        let users = await fetch("http://127.0.0.1:5000/users", {
          method: "POST",
          body: JSON.stringify({ channelIds: channelIds, userIds: userIds }),
          headers: { "Content-Type": "application/json" },
        });
        users = await users.json();
        console.log(users);

        for (const user of users){
            db.query("insert or replace into users values(?, ?, ?, ?)").run(user.userId, user.positivity, user.neutral, user.negativity);
            db.query("insert or replace into server_users values(?, ?)").run(user.userId, guildId);
        }
    }
});
// login with the token from .env.local
client.login(process.env.DISCORD_TOKEN);

function obfuscateServerId(id: string){
    // do obsucation logic
    return id;
}
