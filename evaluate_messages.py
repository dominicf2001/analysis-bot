import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import classification_report
from nltk.tokenize import word_tokenize

import numpy as np

import process_messages as pm
import train_nb_model as tm

def evaluate_data():
    # Read the preprocessed training data
    train_data = pd.read_csv('sentiment_training_processed.csv')

    # Read the data for evaluation (contains single words in 'evaluated_text' column)
    evaluation_data = pd.read_csv('sentiment_evaluation.csv')

    # Fill missing values in the 'evaluated_text' column with an empty string
    evaluation_data['evaluated_text'] = evaluation_data['evaluated_text'].fillna('')


    # Tokenize the lemmatized words for evaluation
    evaluation_data['evaluated_text'] = evaluation_data['evaluated_text'].apply(word_tokenize)

    # Convert tokens back to string format
    evaluation_data['evaluated_text'] = evaluation_data['evaluated_text'].apply(' '.join)

    # Load trained model and vectorizers (assuming you have already trained and saved them)
    # For simplicity, I'm not including the code for training the model and vectorizers here
    # You should replace these with your own code for loading the trained model and vectorizers

    # Load trained CountVectorizer
    count_vectorizer = CountVectorizer()
    count_vectorizer = count_vectorizer.fit(train_data['selected_text_processed'])

    # Load trained TfidfTransformer
    tfidf_transformer = TfidfTransformer()
    tfidf_transformer = tfidf_transformer.fit(count_vectorizer.transform(train_data['selected_text_processed']))

    # Load trained Naive Bayes classifier
    clf = MultinomialNB()
    clf = tm.clf.fit(tfidf_transformer.transform(count_vectorizer.transform(train_data['selected_text_processed'])), train_data['sentiment'])

    # Predict sentiment for each word in evaluation data
    predictions = []
    for text in evaluation_data['evaluated_text']:
        # Transform single-word data using CountVectorizer and TfidfTransformer
        counts = count_vectorizer.transform([text])
        tfidf = tfidf_transformer.transform(counts)

        # Predict sentiment
        prediction = tm.clf.predict(tfidf)
        predictions.append(prediction[0])

    # Store the predictions in the 'sentiment' column

    print(predictions)
    evaluation_data['sentiment'] = predictions

    # Save the updated evaluation data with sentiment predictions
    evaluation_data.to_csv('sentiment_evaluation_with_predictions.csv', index=False)

    return predictions

report = evaluate_data()

def count_evaluations(report_array):
    positive_count = 0
    neutral_count = 0
    negative_count = 0

    for item in report_array:
        if(item == 'positive'):
            positive_count = positive_count + 1
        elif(item == 'neutral'):
            neutral_count = neutral_count + 1
        elif(item == 'negative'):
            negative_count = negative_count + 1

    count_array = [["positive", positive_count], ["neutral", neutral_count], ["negative", negative_count]]

    return count_array

final_count = count_evaluations(report)

