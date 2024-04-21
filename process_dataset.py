# Processing sentiment dataset for tokenization and easy training

import pandas as pd
import process_messages as pm

read_data = pd.read_csv('sentiment_training_processed.csv')
write_data = pd.read_csv('sentiment_evalution.csv')

def process_text(read_data):
    processed_texts = []
    for row in read_data['selected_text']:
        if row:
            text = str(row)
            text = pm.tokenize_messages(text)
            text = pm.remove_stop_words(text)
            text = pm.tag_tokens(text)
            text = pm.remove_nouns(text)
            text = pm.remove_non_words(pm.lemmatize_words(text))
            processed_texts.append(' '.join(text))
    return processed_texts

def process_sentiment(read_data):   
    processed_sentiments = [] 
    for row in read_data['sentiment']:
        if row:
            sentiment = str(row)
            processed_sentiments.append(''.join(sentiment))
    return processed_sentiments

def remove_failed_rows(read_data):
    cleaned_data = [row for row in read_data if row.get('selected_text_processed') is not None]
    return cleaned_data



processed_texts = process_text(read_data)
processed_sentiments = process_sentiment(read_data)

# Create a DataFrame with both processed text and sentiment
write_data = pd.DataFrame({
    'selected_text_processed': processed_texts,
    'sentiment': processed_sentiments
})

# Remove rows with blank 'selected_text_processed'
write_data = write_data[write_data['selected_text_processed'].notnull()]
write_data.to_csv('sentiment_evaluation.csv', index=False)

remove_failed_rows(write_data)

