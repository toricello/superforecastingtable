const inputQuestion = document.querySelector("#input-question");
const form = document.querySelector(".question-form");
const startDate = document.querySelector("#start-date");
const closingDate = document.querySelector("#closing-date");
const btn = document.querySelector(".submit-btn");
const questionsList = document.querySelector(".questions-list");

form.addEventListener("submit", addQuestion);

function addQuestion(e) {
  e.preventDefault();
  const value = inputQuestion.value;

  if (value && startDate.value && closingDate.value) {
    const question = document.createElement("article");

    question.classList.add("question-item");
    question.innerHTML = `<h4>${value} </h4>
<h6><p>Start Date: ${startDate.value} </p><p>End Date: ${closingDate.value}</p></h6>
<input type="number" placeholder="make a forecast">
<input type="text" placeholder="Notes">
<button class="submit-comment">Submit</button>
<div class="comments-container"></div>
<label for="result">Enter the Result:</label>
<input type="number" id="result">
<button class="calculate-btn">Calculate</button>`;
    questionsList.prepend(question);
    setBackToDefault();
    const submitCommentBtn = question.querySelector(".submit-comment");
    submitCommentBtn.addEventListener("click", makeForecast);

    const calculateBtn = question.querySelector(".calculate-btn");
    calculateBtn.addEventListener("click", (t) => {
      let allScores = [];
      let totalDays = [];
      const commentContainer =
        calculateBtn.previousElementSibling.previousElementSibling
          .previousElementSibling;
      const outcome = parseInt(calculateBtn.previousElementSibling.value);
      [...commentContainer.children].forEach((e) => {
        const forecastValue = e.querySelector(".forecast").innerHTML;
        const commentScore =
          Math.pow(outcome - forecastValue, 2) +
          Math.pow(1 - outcome - (1 - forecastValue), 2);
        const commentDateStr = e.querySelector(".comment-date").innerHTML;
        const commentDateArr = commentDateStr.split("/");
        const commentDate = new Date(
          commentDateArr[2],
          commentDateArr[1],
          commentDateArr[0]
        );
        currentTime = new Date().getTime();
        const differenceInSeconds =
          currentTime - new Date(commentDate).getTime();
        const differenceFromStartInDays = Math.floor(
          differenceInSeconds / (1000 * 3600 * 24)
        );

        allScores.push(commentScore);
        totalDays.push(differenceFromStartInDays);
      });
      let commentDayCount = [];
      commentDayCount.push(totalDays[0]);
      for (let i = 1; i <= totalDays.length - 1; i++) {
        commentDayCount.push(totalDays[i] - totalDays[i - 1]);
      }

      let sumOfProduct = 0;
      for (let i = 0; i < commentDayCount.length; i++) {
        sumOfProduct += commentDayCount[i] * allScores[i];
      }
      const brierScore = sumOfProduct / totalDays.length;
      const showBrierScore = document.createElement("h4");
      showBrierScore.innerHTML = `Your Brier Score is: ${brierScore}`;
      t.currentTarget.parentElement.appendChild(showBrierScore);
      calculateBtn.previousElementSibling.value = "";
    });
  } else {
    alert("please fill the blanks");
  }
}

function setBackToDefault() {
  inputQuestion.value = "";
  startDate.value = "";
  closingDate.value = "";
}

function makeForecast(e) {
  const forecast =
    e.currentTarget.previousElementSibling.previousElementSibling;
  const comment = e.currentTarget.previousElementSibling;
  const commentElement = document.createElement("article");
  commentElement.innerHTML = `<span class="forecast">${
    forecast.value
  }</span> - ${
    comment.value
  } <strong class="comment-date">${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}</strong>`;
  const commentContainer = document.querySelector(".comments-container");
  commentContainer.prepend(commentElement);
  e.currentTarget.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML = `Latest Prediction: ${forecast.value} `;
  forecast.value = "";
  comment.value = "";
}
