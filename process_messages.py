import json
import string
import re
from urllib.parse import urlparse

import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

import pandas as pd
import process_messages as pm

import csv


nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
nltk.download('stopwords')
nltk.download('wordnet')

# Load English stopwords
stop_words = set(stopwords.words('english'))

lemmatizer = WordNetLemmatizer()

def is_url(message):
    try:
        result = urlparse(message)
        return all([result.scheme, result.netloc])
    except ValueError:
        return False

def user_messages(user_id, messages):
    user_messages = []
    for message in messages:
        if message["user_id"] == user_id:
                user_messages.append(message["message"])            
    return user_messages


def tokenize_messages(user_messages):
    user_tokenized_messages = []
    
    for tokens in user_messages:
        tokens = nltk.word_tokenize(tokens)
        user_tokenized_messages.append(tokens)

    return user_tokenized_messages

def remove_stop_words(user_messages):
    # Remove stopwords, punctuation, whitespace, commas, and apostrophes
    filtered_tokens = []
    for tokens in user_messages:
        token_group = []

        for token in tokens:
            if "/" not in token and "\\" not in token and "-" not in token and "'" not in token and "http" not in token and "." not in token and not "="  in token and not "_" in token and not "(" in token and  ")" not in token and "{" not in token and "}" not in token and "@" not in token and "’" not in token and "?" not in token and "," not in token and "``" not in token and "<" not in token and ">" not in token and ":" not in token and "&" not in token and "#" not in token:
                token_group.append(token.lower())

        filtered_tokens.append(token_group)

    return filtered_tokens

def lemmatize_words(tagged_token_messages):
    lemmatized_tokens = []
    for tokens_with_pos in tagged_token_messages:
        lemmatized_words = []

        for token, pos_tag in tokens_with_pos:
            # Convert the POS tag to a format recognized by the lemmatizer
            pos_tag = pos_tag[0].lower() if pos_tag[0].lower() in ['a', 'n', 'v'] else 'n'  # Default to noun if not in [a, n, v]

            # Lemmatize the token based on its POS tag
            lemmatized_word = lemmatizer.lemmatize(token, pos=pos_tag)
            lemmatized_words.append(lemmatized_word)

        lemmatized_tokens.append(lemmatized_words)

    return lemmatized_words

def tag_tokens(user_tokenized_messages):
    tagged_token_messages = []
    for tokens in user_tokenized_messages:
        tagged_tokens = []
        tagged_tokens.append(nltk.pos_tag(tokens))

        tagged_token_messages.append(tagged_tokens)

    return tagged_token_messages


def remove_nouns(tagged_token_messages):
    # Define a list to store non-noun tokens
    non_noun_tokens = []
    # Iterate over each token in the list
    for tokens in tagged_token_messages:
        non_nouns = []
        # Check if the second element of the tuple (the tag) starts with 'N' (Nouns start with 'NN', 'NNS', 'NNP', 'NNPS')
        for token in tokens:
            for word in token:
                if not word[1].startswith('NN'):
                    # If it's not a noun, add it to the non_noun_tokens list
                    non_nouns.append(word)
        non_noun_tokens.append(non_nouns)
    
    return non_noun_tokens


def tokens_to_csv(lemmatized_token_messages):
    non_tag_tokens = []
    for token in lemmatized_token_messages:
        token_group = []
        token_group.append(token[0])
        non_tag_tokens.append(token_group)

    return non_tag_tokens

def remove_tags(tagged_tokens):
    non_tagged_tokens = []

    for tokens in tagged_tokens:
        token_groups = []
        if tokens != []:
            for token in tokens:
                token_groups.append(token[0])
            non_tagged_tokens.append(token_groups)

    return non_tagged_tokens

def remove_non_words(token_messages):
    word_tokens = []
    for tokens in token_messages:
        token_groups = []
        for token in tokens:
            if token.strip() and not re.search(r'\d', token):
                token_groups.append(token)
            
        word_tokens.append(token_groups)

    return word_tokens


def tokens_to_csv(token_messages, write_data):
    with open(write_data, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        
        writer.writerow(["evaluated_text", "sentiment"])

        for tokens in token_messages:
            # Concatenate tokens into a single string
            concatenated_string = ' '.join(tokens)
            # Write the concatenated string in the first column and leave the second column empty
            writer.writerow([concatenated_string, None])
            

def process_user_messages(user_id, sample_data):
    return remove_non_words(remove_tags(remove_nouns(tag_tokens(remove_stop_words(tokenize_messages(user_messages(user_id, sample_data)))))))


def load_json_file():
    with open("parsed_messages.json", "r") as file:
        sample_data = json.load(file)
    return sample_data


#####

load_json_file()

#user_message_array = user_messages(user_id, sample_data)
#
#user_tokenized_messages = tokenize_messages(user_message_array)
#
#user_tokenized_messages = remove_stop_words(user_tokenized_messages)
#
#
#tagged_token_messages = tag_tokens(user_tokenized_messages)
#
#
#tagged_token_messages = remove_nouns(tagged_token_messages)
#
#token_messages = remove_tags(tagged_token_messages)
#
#token_messages = remove_non_words(token_messages)


#tokens_to_csv(process_user_messages(user_id, load_json_file()), 'sentiment_evaluation.csv')



