document.addEventListener("DOMContentLoaded", function () {


    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const stateContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".circle.easy-progress");
    const mediumProgressCircle = document.querySelector(".circle.medium-progress");
    const hardProgressCircle = document.querySelector(".circle.hard-progress");

    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardstatscontainer = document.querySelector(".stats-cards");



    function validateUsername(username) {
        if (username.trim() == "") {
            alert("username should not be empty");
            return false;
        }
        const regx = /^[a-zA-Z0-9_]{3,20}$/;
        const isMatching = regx.test(username);
        if (!isMatching) {
            alert("Invalid Username");
        }
        return isMatching;
    }


    async function fetchUsernameDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try {

            searchButton.textContent = "searching...";
            searchButton.disabled = true;

            // const response =await fetch(url);
            const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
            const targetUrl = "https://leetcode.com/graphql/";

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const graphqlQuery = JSON.stringify({
                query: `
      query userSessionProgress($username: String!) {
        allQuestionsCount {
          difficulty
          count
        }
        matchedUser(username: $username) {
          submitStats {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
        }
      }
    `,
                variables: {
                    username: username
                }
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphqlQuery,
                redirect: "follow"
            };

            const response = await fetch(CORS_PROXY + targetUrl, requestOptions);
            if (!response.ok) {
                throw new Error("Unable to fetch the user details");
            }
            const parseddata = await response.json();
            console.log("logging data :", parseddata);
            displayUserData(parseddata);
        }
        catch (error) {
            stateContainer.innerHTML = `<p>No data found</p>`
        }
        finally {
            searchButton.textContent = "search";
            searchButton.disabled = false;
        }
    }

    function updateProgress(solved, total, label, circle) {
        if (total === 0) return;

        const progressDegree = Math.round((solved / total) * 100);
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    function displayUserData(parseddata) {
        const allQues = parseddata.data.allQuestionsCount;
        const solvedQues = parseddata.data.matchedUser.submitStats.acSubmissionNum;

        const totalEasyQues = allQues.find(q => q.difficulty === "Easy").count;
        const totalMediumQues = allQues.find(q => q.difficulty === "Medium").count;
        const totalHardQues = allQues.find(q => q.difficulty === "Hard").count;

        const easyObj = solvedQues.find(q => q.difficulty === "Easy");
        const mediumObj = solvedQues.find(q => q.difficulty === "Medium");
        const hardObj = solvedQues.find(q => q.difficulty === "Hard");

        updateProgress(easyObj.count, totalEasyQues, easyLabel, easyProgressCircle);
        updateProgress(mediumObj.count, totalMediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(hardObj.count, totalHardQues, hardLabel, hardProgressCircle);

        const cardData = [
            { label: "Overall Easy Submissions", value: easyObj.submissions },
            { label: "Overall Medium Submissions", value: mediumObj.submissions },
            { label: "Overall Hard Submissions", value: hardObj.submissions }
        ];

        renderStatsCards(cardData);
    }


    function renderStatsCards(cardData) {
        cardstatscontainer.innerHTML = "";

        cardData.forEach(card => {
            const div = document.createElement("div");
            div.className = "stat-card";
            div.innerHTML = `
            <h3>${card.label}</h3>
            <p>${card.value}</p>
        `;
            cardstatscontainer.appendChild(div);
        });
    }

    searchButton.addEventListener('click', function () {
        const username = usernameInput.value;
        console.log("logging username:", username);
        if (validateUsername(username)) {
            fetchUsernameDetails(username);
        }
    })

})