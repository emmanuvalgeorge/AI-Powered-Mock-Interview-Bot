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



@app.route("/api/resume/analyze", methods=["POST"])
def analyze_resume():
    if "resume" not in request.files:
        return jsonify({"error": "No resume uploaded"}), 400

    resume = request.files["resume"]
    text = extract_text_from_pdf(resume)

    # TEMP: demo keywords (later replace with ML + KeyBERT)
    raw_keywords = ["sql servers", "oracle tutorials", "database administration"]

    refined = refine_skills(raw_keywords)

    return jsonify({
        "skills": refined.split(",")
    })


if __name__ == "__main__":
    app.run(port=5000, debug=True)