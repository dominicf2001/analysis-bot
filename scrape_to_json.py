from bs4 import BeautifulSoup
import json
import subprocess

user_token = input("User token: ")
channel_id = "1225227051032645694"
html_file_name = "scraped_messages.html"

command = "sudo docker run --rm -v /home/gert/Projects/analysis-bot/output:/out tyrrrz/discordchatexporter:latest export -t " + user_token + " -c " + channel_id + " -o " + html_file_name


output = subprocess.run(command, shell=True, capture_output=True, text=True)
print(output.stdout)

# Read HTML data from file
with open("output/" + html_file_name, 'r') as file:
    html_data = file.read()


# Parse HTML
soup = BeautifulSoup(html_data, 'html.parser')

# Find all message containers
message_containers = soup.find_all('div', class_='chatlog__message-container')

# Initialize list to store messages
messages = []

# Iterate over message containers
for container in message_containers:
    # Extract data from each container
    author_element = container.find('span', class_='chatlog__author')
    author = author_element.text.strip() if author_element else previous_author

    # Doubled messages do not have an author
    previous_author = author_element.text.strip() if author_element else "None"

    
    timestamp_element = container.find('span', class_='chatlog__timestamp')
    timestamp = timestamp_element.text.strip() if timestamp_element else previous_timestamp

    # Doubled messages do not have a timestamp
    previous_timestamp = timestamp_element.text.strip() if timestamp_element else "None"

    
    message_element = container.find('span', class_='chatlog__markdown-preserve')
    message = message_element.text.strip() if message_element else "No message"
    
    # Construct message dictionary
    message_data = {
        "author": author,
        "timestamp": timestamp,
        "message": message
    }
    
    # Append message dictionary to list
    messages.append(message_data)

# Write messages to JSON file
with open('parsed_messages.json', 'w') as json_file:
    json.dump(messages, json_file, indent=4)

print("Messages have been parsed and saved to 'parsed_messages.json'")