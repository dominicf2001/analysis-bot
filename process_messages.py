import json
import string
import re
from urllib.parse import urlparse

import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer


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

def concatenate_messages(user_id, messages):
    concatenated_messages = ""
    for message in messages:
        if message["user_id"] == user_id:
                concatenated_messages += message["message"] + " "            
    return concatenated_messages.strip()


def tokenize_messages(concatenated_messages):
    tokens = nltk.word_tokenize(concatenated_messages)
 
    return tokens

def remove_stop_words(tokens):
    # Remove stopwords, punctuation, whitespace, commas, and apostrophes
    non_stop_words = [word.strip(string.punctuation + string.whitespace).strip("’") for word in tokens if word.lower().strip(string.punctuation + string.whitespace) not in stop_words and word.strip(string.punctuation + string.whitespace) != '']

    filtered_words = []

    for word in non_stop_words:
        if "/" not in word and "\\" not in word and "-" not in word and "'" not in word and "http" not in word and "." not in word and not "="  in word and not "_" in word:
            filtered_words.append(word)

    return filtered_words

def lemmatize_words(tokens_with_pos):
    lemmatized_words = []
    for token, pos_tag in tokens_with_pos:
        # Convert the POS tag to a format recognized by the lemmatizer
        pos_tag = pos_tag[0].lower() if pos_tag[0].lower() in ['a', 'n', 'v'] else 'n'  # Default to noun if not in [a, n, v]

        # Lemmatize the token based on its POS tag
        lemmatized_word = lemmatizer.lemmatize(token, pos=pos_tag)
        lemmatized_words.append(lemmatized_word)

    return lemmatized_words

def tag_tokens(tokens):
    tagged_tokens = nltk.pos_tag(tokens)

    return tagged_tokens

def remove_non_words(tokens):
    word_tokens = [token for token in tokens if token.strip() and not re.search(r'\d', token)]  # Filter out blank tokens
    
    return word_tokens

def remove_nouns(tokens):
    # Define a list to store non-noun tokens
    non_noun_tokens = []
    
    # Iterate over each token in the list
    for token in tokens:
        # Check if the second element of the tuple (the tag) starts with 'N' (Nouns start with 'NN', 'NNS', 'NNP', 'NNPS')
        if not token[1].startswith('NN'):
            # If it's not a noun, add it to the non_noun_tokens list
            non_noun_tokens.append(token)
    
    return non_noun_tokens


def sanitize_lemmas(lemmas):
    return None

#####

with open("parsed_messages.json", "r") as file:
    sample_data = json.load(file)


user_id = input("\nUser id: ")
concatenated_messages = concatenate_messages(user_id, sample_data)

print("\nConcatenated Messages for user: ", user_id, "\n")

print(concatenated_messages)

tokenized_messages = tokenize_messages(concatenated_messages)

tokenized_messages = remove_stop_words(tokenized_messages)


print("\nStop words removed:\n", tokenized_messages)

tagged_tokens = tag_tokens(tokenized_messages)
tagged_tokens = remove_nouns(tagged_tokens)

print("\nTagged:\n", tagged_tokens)


lemmatized_words = remove_non_words(lemmatize_words(tagged_tokens))


print("\nLemmatized words:\n", lemmatized_words)


