import json
import csv
import re

INPUT_FILE = "data/raw/resume_ner.json"
OUTPUT_FILE = "data/processed/resume_keywords.csv"

def clean_skill_text(text):
    text = text.replace("\n", " ")
    skills = re.split(r",|•|/|\|", text)
    return [s.strip() for s in skills if len(s.strip()) > 1]

rows = []

with open(INPUT_FILE, "r", encoding="utf-8") as f:
    for line in f:
        item = json.loads(line)

        resume_text = item.get("content", "").replace("\n", " ").strip()
        skill_set = set()

        for ann in item.get("annotation", []):
            if "Skills" in ann.get("label", []):
                for point in ann.get("points", []):
                    skills = clean_skill_text(point.get("text", ""))
                    for s in skills:
                        skill_set.add(s)

        if resume_text and skill_set:
            rows.append([
                resume_text,
                ";".join(skill_set)
            ])

with open(OUTPUT_FILE, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["resume_text", "keywords"])
    writer.writerows(rows)

print(f"✅ resume_keywords.csv created with {len(rows)} rows")
