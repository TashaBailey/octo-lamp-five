/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */
let submitButtonPressed = false;

window.addEventListener('DOMContentLoaded', () => {
  const start = document.querySelector('#start');
  start.addEventListener('click', function (e) {
    if (!submitButtonPressed) {
      countdownTimer();
    }
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';
  });
  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  
  

  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
    {
      q: 'What does HTML stand for?',
      o: ['Hyper Text Markup Language', 'Hype Text Language Markup', 'Hydro Text Make Language', 'Hyper Text Made Language'],
      a: 0,
    },
    {
      q: 'What does CSS stand for?',
      o: ['Cascading Sheet Style', 'Create Style Sheet', 'Create Sheet Style', 'Cascading Style Sheet'],
      a: 3,
    },
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
  };

let score = 0;
let quizTotal = 0;
submitButtonPressed = false;

  // Calculate the score
  const calculateScore = () => {
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector('#' + li);
        radioElement = document.querySelector('#' + r);

        if (quizItem.a == i) {
          //change background color of li element here
          liElement.style.color = 'white';
          liElement.style.backgroundColor = 'lightseagreen';
        }
        
          if (radioElement.checked) {
            // code for task 1 goes here
            if (quizItem.a == i) {
              score++;
            }
          }
      }
    });
  }
  // call the displayQuiz function
  displayQuiz();

// if reset button is submitted then reload page
const resetButton = document.querySelector('#btnReset');
resetButton.onclick = () => {
  window.location.reload();
}

const submitButton = document.querySelector('#btnSubmit');

// when the time is up, end the quiz, display the score and highlight the answer.
function countdownTimer(){
  // set the date we are counting to
  const deadline = new Date().getTime() + 60000;
  // Update the count down every 1 second
  var x = setInterval(function() {
    console.log(submitButtonPressed);
  // set todays date and time to start
  const todaysDate = new Date().getTime();
  // find the distance between now and count down date
  const distance = deadline - todaysDate;
  // time calculations
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  // output the result
  document.getElementById('time').innerHTML = `${minutes} m ${seconds} s`;
  // if countdown is over
  if (distance < 0) {
    clearInterval(x);
    document.getElementById('time').innerHTML = "You are done!";
    calculateScore();
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.innerHTML = `<h2>You answered ${score} questions right</h2>`;
  }
  else if (submitButtonPressed === true) {
    clearInterval(x);
    document.getElementById('time').innerHTML = "You are done!";
  }
  
}, 1000)
};

submitButton.addEventListener ('click', () => {
  calculateScore();
  submitButtonPressed = true;
  const scoreDisplay = document.getElementById('score');
  scoreDisplay.innerHTML = `<h2>You answered ${score} questions right</h2>`;
});
});

