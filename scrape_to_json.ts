import { exec } from "bun";
import { readFileSync, writeFileSync } from "fs";
import { parse } from "node-html-parser";

async function exportDiscordChat() {
    const userToken: string = prompt("User token: ") ?? "";
    const channelId: string = "1225227051032645694";
    const htmlFileName: string = "scraped_messages.html";

    const command: string = `sudo docker run --rm -v /home/gert/Projects/analysis-bot/output:/out tyrrrz/discordchatexporter:latest export -t ${userToken} -c ${channelId} -o ${htmlFileName}`;

    // Execute command using subprocess
    const output = await exec(command);

    // Output the result of the command
    console.log(output.stdout);

    // Read HTML data from file
    const htmlData: string = readFileSync(`output/${htmlFileName}`, 'utf-8');

    // Parse HTML
    const root = parse(htmlData);

    // Find all message containers
    const messageContainers = root.querySelectorAll('div.chatlog__message-container');

    // Initialize list to store messages
    let messages: any[] = [];
    let previousAuthor = "None";
    let previousTimestamp = "None";

    // Iterate over message containers
    for (const container of messageContainers) {
        const authorElement = container.querySelector('span.chatlog__author');
        const author = authorElement ? authorElement.text.trim() : previousAuthor;

        const timestampElement = container.querySelector('span.chatlog__timestamp');
        const timestamp = timestampElement ? timestampElement.text.trim() : previousTimestamp;

        const messageElement = container.querySelector('span.chatlog__markdown-preserve');
        const message = messageElement ? messageElement.text.trim() : "No message";

        // Construct message dictionary
        const messageData = {
            author,
            timestamp,
            message
        };

        // Append message dictionary to list
        messages.push(messageData);

        // Update previous author and timestamp if needed
        if (authorElement) previousAuthor = author;
        if (timestampElement) previousTimestamp = timestamp;
    }

    // Write messages to JSON file
    writeFileSync('parsed_messages.json', JSON.stringify(messages, null, 4));

    console.log("Messages have been parsed and saved to 'parsed_messages.json'");
}
