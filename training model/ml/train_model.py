import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.multiclass import OneVsRestClassifier

# load dataset
df = pd.read_csv("data/processed/resume_keywords.csv")

X = df["resume_text"]
y = df["keywords"].str.get_dummies(sep=';')

# 🔧 FIX 2: remove rare labels
label_counts = y.sum(axis=0)
valid_labels = label_counts[label_counts >= 5].index
y = y[valid_labels]

print("Training labels after filtering:", y.shape[1])
#🔧 END FIX 2

# train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# vectorization
vectorizer = TfidfVectorizer(
    stop_words="english",
    max_features=5000
)
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# model
model = OneVsRestClassifier(
    LogisticRegression(max_iter=1000)
)
model.fit(X_train_vec, y_train)

print("✅ ML model trained successfully")
