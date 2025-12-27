import pandas as pd
from sklearn.metrics import f1_score
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.multiclass import OneVsRestClassifier

df = pd.read_csv("data/processed/resume_keywords.csv")

X = df["resume_text"]
y = df["keywords"].str.get_dummies(sep=';')

# 🔧 FIX 2: remove rare labels (skills appearing very few times)
label_counts = y.sum(axis=0)
valid_labels = label_counts[label_counts >= 5].index
y = y[valid_labels]

print("Remaining labels after filtering:", y.shape[1])
#🔧 END FIX 2

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

vectorizer = TfidfVectorizer(stop_words="english", max_features=5000)
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

model = OneVsRestClassifier(LogisticRegression(max_iter=1000))
model.fit(X_train_vec, y_train)

import numpy as np

y_prob = model.predict_proba(X_test_vec)
y_pred = np.zeros_like(y_prob)

TOP_K = 2   # because avg skills ≈ 1

for i in range(y_prob.shape[0]):
    top_k_idx = np.argsort(y_prob[i])[-TOP_K:]
    y_pred[i, top_k_idx] = 1


print("Total labels:", y.shape[1])
print("Average skills per resume:", y.sum(axis=1).mean())
print("Predicted positives:", y_pred.sum())


score = f1_score(y_test, y_pred, average="micro")
print("🎯 F1 Score:", score)
