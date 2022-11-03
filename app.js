const question = document.querySelector("#input-question");
const form = document.querySelector(".question-form");
const startDate = document.querySelector("#start-date");
const closingDate = document.querySelector("#closing-date");
const inputs = document.querySelectorAll(".question-form input");
const btn = document.querySelector(".submit-btn");
const questionsList = document.querySelector(".questions-list");
// submit form

form.addEventListener("submit", addQuestion);
// display questions on load

// functions

function addQuestion(e) {
  e.preventDefault();
  const value = question.value;

  if (value !== "" && startDate.value !== "" && closingDate.value !== "") {
    const questionSample = document.createElement("article");

    questionSample.classList.add("question-item");
    questionSample.innerHTML = `<h4>${value}</h4> <h6><p>Start Date: ${startDate.value}</p><p>End Date: ${closingDate.value}</p></h6>
         
         <p> </p>
          <input type="number" placeholder="make a forecast">
          <input type="text" placeholder="Notes">
          <button class="submit-comment">submit</button>
          <article class="comments-container"></article>
         
         <label for="result">Enter the Result:</label>
          <input type="number" id="result" min="0" max="1" step="1">
          <button class="calculate-btn">Calculate</button>`;
    questionsList.prepend(questionSample);
    const submitComment = questionSample.querySelector(".submit-comment");

    //   addToLocalStorage(id, value);
    // set back to default
    submitComment.addEventListener("click", makeForecast);
    const calculateBtn = questionSample.querySelector(".calculate-btn");
    calculateBtn.addEventListener("click", (t) => {
      let results = [];
      let average = [];
      const commentContainer =
        calculateBtn.previousElementSibling.previousElementSibling
          .previousElementSibling;
      const sonuc = calculateBtn.previousElementSibling.value;

      [...commentContainer.children].forEach((e) => {
        const tahmin = e.querySelector(".forecast").innerHTML;
        const result =
          Math.pow(sonuc - tahmin, 2) + Math.pow(1 - sonuc - (1 - tahmin), 2);
        const dute = e.querySelector(".dute").innerHTML;
        currentTime = new Date().getTime();

        let difference = currentTime - new Date(dute).getTime();
        let totalDays = Math.floor(difference / (1000 * 3600 * 24));

        results.push(result);
        average.push(totalDays);
      });
      for (let i = 1; i < average.length; i++) {
        average[i] = average[i] - average[i - 1];
      }
      console.log(average);
      let finale = 0;
      for (let i = 0; i < average.length; i++) {
        finale += average[i] * results[i];
      }

      const summ = average.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);
      console.log(summ);
      console.log(finale / summ);
      const showsonuc = document.createElement("h4");
      showsonuc.innerHTML = `Your Brier Score is: ${finale / summ}`;
      t.currentTarget.parentElement.appendChild(showsonuc);
    });
  } else {
    alert("please fill the blanks");
  }
}

function setBackToDefault() {
  question.value = "";
  startDate.value = "";
  closingDate.value = "";
}
function goDefault() {
  forecast.value = "";
  fcomment = "";
}

function makeForecast(e) {
  const forecast =
    e.currentTarget.previousElementSibling.previousElementSibling.value;
  const fcomment = e.currentTarget.previousElementSibling.value;
  const comments = document.createElement("article");
  comments.innerHTML = `<p> <span class="forecast">${forecast}</span> - ${fcomment} <strong class="dute">${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}</strong>
 </p>`;
  e.currentTarget.nextElementSibling.prepend(comments);
  e.currentTarget.previousElementSibling.previousElementSibling.value = "";
  e.currentTarget.previousElementSibling.value = "";
  e.currentTarget.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML = `Latest Prediction: ${forecast} `;
}
