'use strict';

function startGame() {
  let fiveMinutes = 60 * 1,
    display = document.querySelector('#time');
  startTimer(fiveMinutes, display);
  console.log(display);

  moveMainSection();
}

function startTimer(duration, display) {
  let timer = duration, minutes, seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}
class FormValidator {
  constructor(form, fields) {
    this.form = form
    this.fields = fields
  }

  initialize() {
    this.validateOnEntry()
    this.validateOnSubmit()
  }

  validateOnSubmit() {
    let self = this;

    this.form.addEventListener('submit', e => {
      e.preventDefault();
      self.fields.forEach(field => {
        const input = document.querySelector(`#${field}`);
        self.validateFields(input);
        user[`${field}`] = input.value;
      });

      startGame()
    });

  }

  validateOnEntry() {
    let self = this;
    this.fields.forEach(field => {
      const input = document.querySelector(`#${field}`);
      input.addEventListener('input', event => {
        self.validateFields(input);
      })
    })
  }

  validateFields(field) {

    // Check maxlength
    if (field.value.length > 20) {
      this.setStatus(field, `${field.previousElementSibling.innerText} cannot have more than 20 characters`, "error")
    } else {
      this.setStatus(field, null, "success")
    }

    // Check minlength
    if (field.value.length < 8) {
      this.setStatus(field, `${field.previousElementSibling.innerText} cannot have less than 8 characters`, "error")
    } else {
      this.setStatus(field, null, "success")
    }
  }

  setStatus(field, message, status) {
    const successIcon = field.parentElement.querySelector('.icon-success')
    const errorIcon = field.parentElement.querySelector('.icon-error')
    const errorMessage = field.parentElement.querySelector('.form__error-message')

    if (status === "success") {
      if (errorIcon) { errorIcon.classList.add('hidden') }
      if (errorMessage) { errorMessage.innerText = "" }
      successIcon.classList.remove('hidden')
      field.classList.remove('input-error')
    }

    if (status === "error") {
      if (successIcon) { successIcon.classList.add('hidden') }
      field.parentElement.querySelector('.form__error-message').innerText = message
      errorIcon.classList.remove('hidden')
      field.classList.add('input-error')
    }
  }
}

const form = document.querySelector('.form')
const fields = ["username"]

const validator = new FormValidator(form, fields)
validator.initialize()


/**
 * Move between sections
 */

function moveMainSection() {
  // var positionMain;
  positionMain -= 100;
  main.style.transform = "translateX(" + positionMain + "%)";

  // Start game
  if (positionMain === -100) {
    headerExtra.innerHTML = "You only have 1 minute";
  }

  // Player ranking
  if (positionMain === -200) {
    headerExtra.innerHTML = "Top Ranking";
  }
}

/**
 *  Time Counter
 */

var seconds = 0; // init variable for time counting, start at 0 
var time;

// The timer() function is invoked on the first card click
function timeCounter() {
  time = setInterval(function () {
    seconds++;
    if (seconds === 60) {
      alert("Time out!");
      return;
    }
  }, 1000);
}

// Stop the timeCounter once the user has matched all 16 cards
function stopTimeCounter() {
  clearInterval(time);
}


/**
 *  Attempt Counter
 */
var attempts = 0;
function attemptCounter() {
  // increase the number of attempts for every pair checked
  attempts++;
}


/**
 *  Ranking
 */

// Everytime a player finishes his game, his info will be save to the list
function addUserList() {

  users.push();
}

function ranking() {
  var userList = users.sort((a, b) => {return a.time - b.time});
  if(userList.length != 0) {
    containerRanking.innerHTML = `
    <table class="table">
      <tr>
        <th>Name</th>
        <th>Time</th>
        <th>Attempts</th>
      </tr>`

    for (var i = 0; i < userList.length; i++) {
      containerRanking.innerHTML +=
      `<tr>
        <td>${userList[i].name}</td>
        <td>${userList[i].time}</td>
        <td>${userList[i].attempts}</td>
      </tr><br>`
    };    
    
    containerRanking.innerHTML += `</table>`
  }


}