document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // ELEMENTS
    // =========================================

    const resumeScore =
        document.getElementById(
            "resumeScore"
        );

    const predictedRole =
        document.getElementById(
            "predictedRole"
        );

    const matchPercentage =
        document.getElementById(
            "matchPercentage"
        );

    const uploadedFile =
        document.getElementById(
            "uploadedFile"
        );

    const candidateName =
        document.getElementById(
            "candidateName"
        );

    const candidateRole =
        document.getElementById(
            "candidateRole"
        );

    const skillsContainer =
        document.getElementById(
            "skillsContainer"
        );

    const summaryText =
        document.getElementById(
            "summaryText"
        );

    const historyContainer =
        document.getElementById(
            "historyContainer"
        );

    // =========================================
    // DEFAULT DASHBOARD
    // =========================================

    function showDefaultState() {

        resumeScore.innerText = "0%";

        predictedRole.innerText =
            "Not Analyzed Yet";

        matchPercentage.innerText =
            "0%";

        uploadedFile.innerText =
            "No File Uploaded";

        candidateName.innerText =
            "Candidate";

        candidateRole.innerText =
            "No role available";

        summaryText.innerText =
            "No analysis available yet.";

        skillsContainer.innerHTML = `
            <div class="empty-skill">
                No skills available
            </div>
        `;
    }

    // =========================================
    // UPDATE DASHBOARD
    // =========================================

    function updateDashboard(data) {

        // SCORE

        resumeScore.innerText =
            (data.score || 0) + "%";

        // ROLE

        predictedRole.innerText =
            data.role ||
            "Not Analyzed Yet";

        // MATCH %

        matchPercentage.innerText =
            (data.matchPercentage || data.score || 0) + "%";

        // FILE

        uploadedFile.innerText =
            data.filename ||
            "No File Uploaded";

        // PROFILE

        candidateName.innerText =
            data.filename
            ? data.filename.replace(
                /\.[^/.]+$/,
                ""
              )
            : "Candidate";

        candidateRole.innerText =
            data.role ||
            "No role available";

        // SUMMARY / AI RECOMMENDATION

        summaryText.innerHTML =
            data.recommendation ||
            "No recommendation available";

        // SKILLS

        skillsContainer.innerHTML = "";

        if (
            data.skills &&
            data.skills.length > 0
        ) {

            data.skills.forEach(skill => {

                const skillTag =
                    document.createElement(
                        "div"
                    );

                skillTag.classList.add(
                    "skill-tag"
                );

                skillTag.innerText =
                    skill;

                skillsContainer.appendChild(
                    skillTag
                );

            });

        } else {

            skillsContainer.innerHTML = `
                <div class="empty-skill">
                    No skills available
                </div>
            `;
        }
    }

    // =========================================
    // LOAD LATEST ANALYSIS
    // =========================================

    const latestAnalysis =
        JSON.parse(
            sessionStorage.getItem(
                "latestResumeAnalysis"
            )
        );

    if (latestAnalysis) {

        updateDashboard(
            latestAnalysis
        );

    } else {

        showDefaultState();

    }

    // =========================================
    // HISTORY
    // =========================================

    const history =
        JSON.parse(
            localStorage.getItem(
                "resumeHistory"
            )
        ) || [];

    historyContainer.innerHTML = "";

    if (history.length === 0) {

        historyContainer.innerHTML = `
            <p class="empty-history">
                No previous analyses available
            </p>
        `;

    } else {

        history.forEach(item => {

            const historyItem =
                document.createElement(
                    "div"
                );

            historyItem.classList.add(
                "history-item"
            );

            historyItem.innerHTML = `

                <div class="history-content">

                    <p class="history-file">

                        ${item.filename || "Resume"}

                    </p>

                    <span class="history-score">

                        ${item.score || 0}%

                    </span>

                </div>

            `;

            // =========================================
            // CLICK HISTORY ITEM
            // =========================================

            historyItem.addEventListener(
                "click",
                () => {

                    updateDashboard(item);

                }
            );

            historyContainer.appendChild(
                historyItem
            );

        });

    }

});