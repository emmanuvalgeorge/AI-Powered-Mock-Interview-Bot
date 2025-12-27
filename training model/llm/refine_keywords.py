import ollama

def refine_keywords(raw_keywords):
    """
    raw_keywords: list of strings (from KeyBERT or ML)
    returns: cleaned list of skill keywords
    """

    prompt = f"""
You are an ATS resume skill extractor.

From the following list, return ONLY technical skills.
Technical skills include:
- programming languages
- tools and technologies
- databases
- frameworks
- **technical domains or concepts (e.g., Database Administration, Machine Learning)**

Rules:
- Remove locations, organizations, degrees, soft skills
- Normalize skill names (e.g., sql servers -> SQL Server)
- Return output as a comma-separated list
- Do NOT add new skills

Keywords:
{", ".join(raw_keywords)}
"""

    response = ollama.chat(
        model="llama3.2:3b",
        messages=[{"role": "user", "content": prompt}]
    )

    return response["message"]["content"]


# ===========================
# DEMO
# ===========================
if __name__ == "__main__":

    noisy_keywords = [
        "bangalore karnataka",
        "sql servers",
        "oracle tutorials",
        "engineer infosys",
        "database administration"
    ]

    print("Raw keywords:")
    print(noisy_keywords)

    refined = refine_keywords(noisy_keywords)

    print("\nLLM Refined Skills:")
    print(refined)
