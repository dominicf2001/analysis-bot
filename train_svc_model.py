import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer
from sklearn.svm import SVC
from sklearn.metrics import classification_report
from nltk.tokenize import word_tokenize

# Step 1: Data Preprocessing
df = pd.read_csv('sentiment_training_processed.csv')

# Step 2: Feature Extraction
# Tokenization
df['tokens'] = df['selected_text_processed'].apply(word_tokenize)

# Convert tokens to string
df['text'] = df['tokens'].apply(' '.join)

# Step 3: Model Training
x = df['text']
y = df['sentiment']

# Splitting the dataset
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.3, random_state=None)

# Feature extraction using CountVectorizer and TfidfTransformer with n-grams
count_vectorizer = CountVectorizer(ngram_range=(1, 2))
x_train_counts = count_vectorizer.fit_transform(x_train)
tfidf_transformer = TfidfTransformer()
x_train_tfidf = tfidf_transformer.fit_transform(x_train_counts)

# Train the model (Support Vector Machine)
clf = SVC(kernel='linear').fit(x_train_tfidf, y_train)

# Step 4: Model Evaluation
x_test_counts = count_vectorizer.transform(x_test)
x_test_tfidf = tfidf_transformer.transform(x_test_counts)
y_pred = clf.predict(x_test_tfidf)

print(classification_report(y_test, y_pred))
