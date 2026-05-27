document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // ELEMENTS
    // =========================================

    const fileInput =
        document.getElementById(
            "resumeFile"
        );

    const selectResumeBtn =
        document.getElementById(
            "selectResumeBtn"
        );

    const selectedFileName =
        document.getElementById(
            "selectedFileName"
        );

    const analyzeBtn =
        document.getElementById(
            "analyzeBtn"
        );

    const nextResumeBtn =
        document.getElementById(
            "nextResumeBtn"
        );

    const jobDescription =
        document.getElementById(
            "jobDescription"
        );

    const resultSection =
        document.getElementById(
            "resultSection"
        );

    const loadingSection =
        document.getElementById(
            "loadingSection"
        );

    // =========================================
    // GLOBAL FILE VARIABLE
    // =========================================

    let selectedResumeFile = null;

    // =========================================
    // OPEN FILE PICKER
    // =========================================

    selectResumeBtn.addEventListener(
        "click",
        () => {

            fileInput.click();

        }
    );

    // =========================================
    // FILE SELECT EVENT
    // =========================================

    fileInput.addEventListener(
        "change",
        (event) => {

            const file =
                event.target.files[0];

            if (!file) {

                selectedResumeFile = null;

                selectedFileName.innerText =
                    "No file selected";

                return;
            }

            // =========================================
            // VALIDATION
            // =========================================

            const allowedExtensions = [
                "pdf",
                "docx"
            ];

            const extension =
                file.name
                .split(".")
                .pop()
                .toLowerCase();

            if (
                !allowedExtensions.includes(
                    extension
                )
            ) {

                alert(
                    "Only PDF and DOCX files are allowed"
                );

                fileInput.value = "";

                selectedResumeFile = null;

                selectedFileName.innerText =
                    "No file selected";

                return;
            }

            // =========================================
            // SAVE FILE
            // =========================================

            selectedResumeFile = file;

            // =========================================
            // UPDATE UI
            // =========================================

            selectedFileName.innerText =
                file.name;

            console.log(
                "Selected File:",
                selectedResumeFile
            );

        }
    );

    // =========================================
    // ANALYZE RESUME
    // =========================================

    analyzeBtn.addEventListener(
        "click",
        async () => {

            try {

                // =========================================
                // CHECK FILE
                // =========================================

                if (!selectedResumeFile) {

                    alert(
                        "Please select a resume"
                    );

                    return;
                }

                // =========================================
                // SHOW LOADING
                // =========================================

                loadingSection.style.display =
                    "flex";

                resultSection.innerHTML = "";

                // =========================================
                // FORMDATA
                // =========================================

                const formData =
                    new FormData();

                formData.append(
                    "resume",
                    selectedResumeFile
                );

                formData.append(
                    "job_description",
                    jobDescription.value
                );

                // =========================================
                // FETCH API
                // =========================================

                const response =
                    await fetch(
                        "http://127.0.0.1:5000/analyze",
                        {
                            method: "POST",
                            body: formData
                        }
                    );

                const data =
                    await response.json();

                console.log(data);

                loadingSection.style.display =
                    "none";

                // =========================================
                // ERROR
                // =========================================

                if (!data.success) {

                    alert(
                        data.error ||
                        "Analysis failed"
                    );

                    return;
                }

                // =========================================
                // AI RECOMMENDATION
                // =========================================

                let recommendation = "";

                if (data.resume_score >= 85) {

                    recommendation =
                        "✔ Excellent candidate for internship opportunities.<br><br>" +
                        "✔ Strong technical skill alignment detected.<br><br>" +
                        "✔ Recommended for Data Science and AI roles.<br><br>" +
                        "✔ Resume quality is professional and well-structured.";

                } else if (data.resume_score >= 70) {

                    recommendation =
                        "✔ Good candidate for beginner-level internships.<br><br>" +
                        "✔ Strong foundational technical skills detected.<br><br>" +
                        "✔ Improve advanced projects and deployment skills.<br><br>" +
                        "✔ Recommended for junior technical roles.";

                } else {

                    recommendation =
                        "✔ Candidate needs improvement before hiring.<br><br>" +
                        "✔ Improve technical skillset and resume structure.<br><br>" +
                        "✔ Add more practical projects and certifications.<br><br>" +
                        "✔ Improve industry readiness.";
                }

                // =========================================
                // SAVE DATA
                // =========================================

                const analysisData = {

                    filename:
                        data.filename,

                    score:
                        data.resume_score,

                    role:
                        data.predicted_role,

                    skills:
                        data.skills,

                    summary:
                        data.summary,

                    recommendation:
                        recommendation,

                    matchPercentage:
                        data.match_percentage
                };

                sessionStorage.setItem(
                    "latestResumeAnalysis",
                    JSON.stringify(
                        analysisData
                    )
                );

                // =========================================
                // HISTORY
                // =========================================

                let history =
                    JSON.parse(
                        localStorage.getItem(
                            "resumeHistory"
                        )
                    ) || [];

                history.unshift(
                    analysisData
                );

                localStorage.setItem(
                    "resumeHistory",
                    JSON.stringify(
                        history
                    )
                );

                // =========================================
                // RESULT UI
                // =========================================

                resultSection.innerHTML = `

                    <div class="result-card">
                        <h3>Resume Score</h3>
                        <p>${data.resume_score}%</p>
                    </div>

                    <div class="result-card">
                        <h3>Predicted Role</h3>
                        <p>${data.predicted_role}</p>
                    </div>

                    <div class="result-card">
                        <h3>Uploaded File</h3>
                        <p>${data.filename}</p>
                    </div>

                    <div class="result-card">
                        <h3>Extracted Skills</h3>
                        <p>${data.skills.join(", ")}</p>
                    </div>

                    <div class="result-card">
                        <h3>Resume Summary</h3>
                        <p>${data.summary}</p>
                    </div>

                    <div class="result-card">
                        <h3>AI Recommendation</h3>
                        <p>${recommendation}</p>
                    </div>

                `;

            } catch (error) {

                console.log(error);

                loadingSection.style.display =
                    "none";

                alert(
                    "Backend connection failed"
                );

            }

        }
    );

    // =========================================
    // NEXT RESUME BUTTON
    // =========================================

    nextResumeBtn.addEventListener(
        "click",
        () => {

            // CLEAR FILE

            selectedResumeFile = null;

            fileInput.value = "";

            // CLEAR UI

            selectedFileName.innerText =
                "No file selected";

            jobDescription.value = "";

            resultSection.innerHTML = "";

            // CLEAR TEMP STORAGE

            sessionStorage.removeItem(
                "latestResumeAnalysis"
            );

            console.log(
                "Ready for next upload"
            );

        }
    );

});