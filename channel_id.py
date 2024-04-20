import discord

intents = discord.Intents.default()

# Initialize the bot client

user_token = input("User token: ")
channel_id = "1225227051032645694"

client = discord.Client(intents=intents)


# Bot event for when the bot is ready

# Fetch the guild (server) by ID
guild = client.get_guild(channel_id)  # Replace GUILD_ID with your server ID

# Fetch and print all channel IDs
for channel in guild.channels:
    print(channel.id)

# Run the bot with your token
client.run(user_token)  # Replace YOUR_BOT_TOKEN with your bot token
