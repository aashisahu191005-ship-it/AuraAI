from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

import os
import PyPDF2

from docx import Document
from werkzeug.utils import secure_filename






# =========================================
# FLASK APP
# =========================================

app = Flask(__name__)

CORS(app)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# =========================================
# PDF TEXT EXTRACT
# =========================================

def extract_pdf_text(pdf_path):

    text = ""

    with open(pdf_path, "rb") as file:

        reader = PyPDF2.PdfReader(file)

        for page in reader.pages:

            extracted = page.extract_text()

            if extracted:

                text += extracted

    return text

# =========================================
# DOCX TEXT EXTRACT
# =========================================

def extract_docx_text(docx_path):

    doc = Document(docx_path)

    text = ""

    for para in doc.paragraphs:

        text += para.text + "\n"

    return text

# =========================================
# SKILLS EXTRACTION
# =========================================

def extract_skills(text):

    skills_list = [

        "python",
        "java",
        "javascript",
        "html",
        "css",
        "react",
        "mysql",
        "flask",
        "machine learning",
        "data analysis",
        "pandas",
        "numpy",
        "c++",
        "sql",
        "ai"

    ]

    found_skills = []

    text = text.lower()

    for skill in skills_list:

        if skill in text:

            found_skills.append(skill)

    return found_skills

# =========================================
# ROLE PREDICTION
# =========================================

def predict_role(skills):

    skills_text = " ".join(skills).lower()

    if "machine learning" in skills_text or "ai" in skills_text:

        return "AI Engineer"

    elif "python" in skills_text and "pandas" in skills_text:

        return "Data Scientist"

    elif "react" in skills_text or "javascript" in skills_text:

        return "Frontend Developer"

    elif "mysql" in skills_text or "sql" in skills_text:

        return "Database Developer"

    else:

        return "Software Developer"

# =========================================
# SCORE CALCULATION
# =========================================

def calculate_score(skills):

    score = len(skills) * 10

    if score > 100:

        score = 100

    return score

# =========================================
# ANALYZE RESUME API
# =========================================

@app.route("/analyze", methods=["POST"])
def analyze_resume():

    try:

        print("ANALYZE API CALLED")

        if "resume" not in request.files:

            return jsonify({
                "success": False,
                "error": "No resume uploaded"
            })

        file = request.files["resume"]

        if file.filename == "":

            return jsonify({
                "success": False,
                "error": "No file selected"
            })

        # =========================================
        # FORM DATA
        # =========================================

        name = request.form.get("name", "")
        email = request.form.get("email", "")
        password = request.form.get("password", "")
        college = request.form.get("college", "")
        degree = request.form.get("degree", "")
        settings_data = request.form.get("settings_data", "")

        filename = secure_filename(file.filename)

        file_path = os.path.join(
            UPLOAD_FOLDER,
            filename
        )

        file.save(file_path)

        print("FILE SAVED:", filename)

        # =========================================
        # EXTRACT TEXT
        # =========================================

        resume_text = ""

        if filename.endswith(".pdf"):

            resume_text = extract_pdf_text(file_path)

        elif filename.endswith(".docx"):

            resume_text = extract_docx_text(file_path)

        else:

            return jsonify({
                "success": False,
                "error": "Only PDF and DOCX supported"
            })

        print("TEXT EXTRACTED")

        # =========================================
        # ANALYSIS
        # =========================================

        skills = extract_skills(resume_text)

        predicted_role = predict_role(skills)

        score = calculate_score(skills)

        summary = resume_text[:500]

        recommendation = "Improve resume formatting and add more projects."

        # =========================================
        # SAVE TO DATABASE
        # =========================================

        insert_query = """

        INSERT INTO users (

            name,
            email,
            password,
            college,
            degree,
            resume_file,
            predicted_role,
            resume_score,
            skills,
            summary,
            recommendation,
            settings_data

        )

        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)

        """

        values = (

            name,
            email,
            password,
            college,
            degree,
            filename,
            predicted_role,
            score,
            ", ".join(skills),
            summary,
            recommendation,
            settings_data

        )

        

        

        # =========================================
        # RESPONSE
        # =========================================

        return jsonify({

            "success": True,

            "filename": filename,

            "resume_score": score,

            "predicted_role": predicted_role,

            "skills": skills,

            "summary": summary,

            "recommendation": recommendation

        })

    except Exception as e:

        print("SERVER ERROR:", str(e))

        return jsonify({
            "success": False,
            "error": str(e)
        })

# =========================================
# HTML ROUTES
# =========================================

@app.route("/")
def home():
    return send_from_directory("", "index.html")

@app.route("/<path:filename>.html")
def html_pages(filename):
    return send_from_directory("", f"{filename}.html")

@app.route("/<path:filename>.css")
def css_files(filename):
    return send_from_directory("", f"{filename}.css")

@app.route("/<path:filename>.js")
def js_files(filename):
    return send_from_directory("", f"{filename}.js")

# =========================================
# RUN FLASK
# =========================================

if __name__ == "__main__":
    import os

    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )