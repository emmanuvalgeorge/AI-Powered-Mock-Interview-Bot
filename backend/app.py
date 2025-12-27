from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz
import ollama

app = Flask(__name__)
CORS(app)  # allow frontend requests

# ---------- PDF text extraction ----------
def extract_text_from_pdf(file):
    doc = fitz.open(stream=file.read(), filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
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

    # extract simple keywords locally as a quick demo
    raw_keywords = extract_keywords_from_text(text, top_n=12)

    # call LLM to refine skills (keeps existing behavior)
    refined = refine_skills(raw_keywords)

    # also include a short snippet of extracted text for verification
    snippet = text[:1000]

    return jsonify({
        "skills": [s.strip() for s in refined.split(",") if s.strip()],
        "raw_keywords": raw_keywords,
        "text_snippet": snippet
    })


if __name__ == "__main__":
    app.run(port=5000, debug=True)