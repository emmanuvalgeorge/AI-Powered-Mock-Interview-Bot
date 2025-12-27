from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz
import ollama
from keybert import KeyBERT


app = Flask(__name__)
kw_model = KeyBERT(model="all-MiniLM-L6-v2")
CORS(app)  # allow frontend requests

def chunk_text(text, chunk_size=800):
    return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]


# ---------- PDF text extraction ----------
def extract_text_from_pdf(file):
    doc = fitz.open(stream=file.read(), filetype="pdf")
    text = ""

    for page in doc:
        text += page.get_text("text", sort=True) + "\n"

    print("📄 Extracted text length:", len(text))
    print("📄 Preview (first 1000 chars):")
    print(text[:1000])

    return text



# ---------- LLM refinement ----------
def refine_skills(keywords):
    prompt = f"""
You are an ATS resume skill extractor.

From the list below, return ONLY technical skills.
Include tools, technologies, and technical domains.
Remove locations and company names.
Return a comma-separated list.

Keywords:
{", ".join(keywords)}
"""
    response = ollama.chat(
        model="llama3.2:3b",
        messages=[{"role": "user", "content": prompt}]
    )
    return response["message"]["content"]

def extract_keywords_keybert(chunks, top_n=5):
    keywords = []

    for chunk in chunks:
        if len(chunk.strip()) < 50:
            continue

        keyphrases = kw_model.extract_keywords(
            chunk,
            keyphrase_ngram_range=(1, 3),
            stop_words="english",
            top_n=top_n
        )

        for phrase, _ in keyphrases:
            keywords.append(phrase.lower())

    # remove duplicates
    return list(dict.fromkeys(keywords))

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


# ---------- Simple keyword extraction (local fallback) ----------
def extract_keywords_from_text(text, top_n=10):
    import re
    from collections import Counter

    # very small stopword list for demo
    stopwords = set([
        "the", "and", "for", "with", "that", "this", "your", "you",
        "from", "have", "has", "are", "a", "an", "in", "on", "of",
        "to", "as", "is", "it", "by",
    ])

    tokens = re.findall(r"\b[a-zA-Z0-9+#.+-]{3,}\b", text.lower())
    tokens = [t for t in tokens if t not in stopwords and not t.isdigit()]
    counts = Counter(tokens)
    keywords = [w for w, _ in counts.most_common(top_n)]
    return keywords



@app.route("/api/resume/analyze", methods=["POST"])
def analyze_resume():
    if "resume" not in request.files:
        return jsonify({"error": "No resume uploaded"}), 400

    resume = request.files["resume"]
    text = extract_text_from_pdf(resume)

    chunks = chunk_text(text)
    print("📦 Total chunks:", len(chunks))

    raw_keywords = extract_keywords_keybert(chunks, top_n=5)

    print("🧠 KeyBERT keywords:", raw_keywords)

    print("🧠 Total unique raw keywords:", len(raw_keywords))
    print(raw_keywords)


    # call LLM to refine skills (keeps existing behavior)
    refined_text = refine_skills(raw_keywords)

# clean LLM output
    refined_skills = [
    s.strip().lower()
    for s in refined_text.replace("\n", "").split(",")
    if len(s.strip()) > 2 and "here is" not in s.lower()
    ]

    # also include a short snippet of extracted text for verification
    snippet = text[:1000]

    return jsonify({
        "skills": refined_skills,
        "raw_keywords": raw_keywords,
        "text_snippet": snippet
    })


if __name__ == "__main__":
    app.run(port=5000, debug=True, threaded=True)