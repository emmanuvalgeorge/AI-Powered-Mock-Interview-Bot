import pandas as pd
import re
from keybert import KeyBERT

# ===============================
# Load processed dataset
# ===============================
DATA_PATH = "data/processed/resume_keywords.csv"
df = pd.read_csv(DATA_PATH)

# ===============================
# Initialize KeyBERT
# ===============================
# Lightweight and fast model
kw_model = KeyBERT("all-MiniLM-L6-v2")

print("✅ KeyBERT model loaded")
print("Total resumes:", len(df))

# ===============================
# Run KeyBERT on sample resumes
# ===============================
SAMPLE_SIZE = 5   # only for demo / review

for i, text in enumerate(df["resume_text"].head(SAMPLE_SIZE), start=1):

    # Extract candidate keywords
    keywords = kw_model.extract_keywords(
        text,
        keyphrase_ngram_range=(1, 2),
        stop_words="english",
        top_n=10
    )

    # -------------------------------
    # Lightweight filtering (still unsupervised)
    # -------------------------------
    filtered_keywords = []

    for kw, score in keywords:
        # remove numbers (years, versions, etc.)
        if re.search(r"\d", kw):
            continue

        # remove very long phrases
        if len(kw.split()) > 3:
            continue

        # remove obvious location words
        if kw.lower() in ["bangalore", "hyderabad", "mumbai", "india"]:
            continue

        filtered_keywords.append(kw)

    # -------------------------------
    # Print result
    # -------------------------------
    print(f"\nResume {i} - KeyBERT Keywords:")
    print(filtered_keywords[:5])  # show top 5 only
