
const levels = [
  {
    words: [
      {word: "c_t", answer: "a"},
      {word: "d_g", answer: "o"},
      {word: "b_rd", answer: "i"}
    ]
  },
  {
    words: [
      {word: "eleph_nt", answer: "a"},
      {word: "mon_ey", answer: "k"},
      {word: "gir_ff_", answer: "a"}
    ]
  }
];

let currentLevel = 0;
let currentWordIndex = 0;
let hearts = 3;

const levelDisplay = document.getElementById('level');
const heartsDisplay = document.getElementById('hearts');
const wordContainer = document.getElementById('word-container');
const answerInput = document.getElementById('answer-input');
const submitBtn = document.getElementById('submit-btn');
const messageDisplay = document.getElementById('message');

function updateStatus() {
  levelDisplay.textContent = `المستوى: ${currentLevel + 1}`;
  heartsDisplay.textContent = `قلوب: ${"❤️".repeat(hearts)}`;
}

function loadWord() {
  messageDisplay.textContent = "";
  answerInput.value = "";
  const wordObj = levels[currentLevel].words[currentWordIndex];
  wordContainer.textContent = wordObj.word;
  answerInput.focus();
}

function gameOver() {
  alert("انتهت القلوب! اللعبة انتهت.");
  currentLevel = 0;
  currentWordIndex = 0;
  hearts = 3;
  updateStatus();
  loadWord();
}

function nextWord() {
  currentWordIndex++;
  if(currentWordIndex >= levels[currentLevel].words.length){
    currentLevel++;
    currentWordIndex = 0;
    if(currentLevel >= levels.length){
      alert("مبروك! لقد انهيت كل المستويات.");
      currentLevel = 0;
    }
  }
  updateStatus();
  loadWord();
}

submitBtn.addEventListener('click', () => {
  const answer = answerInput.value.trim().toLowerCase();
  if(answer.length !== 1){
    messageDisplay.textContent = "يرجى إدخال حرف واحد فقط.";
    return;
  }
  const wordObj = levels[currentLevel].words[currentWordIndex];
  if(answer === wordObj.answer){
    messageDisplay.style.color = "#4CAF50";
    messageDisplay.textContent = "إجابة صحيحة!";
    setTimeout(() => {
      messageDisplay.textContent = "";
      nextWord();
    }, 1000);
  } else {
    hearts--;
    updateStatus();
    if(hearts <= 0){
      gameOver();
      return;
    }
    messageDisplay.style.color = "#ff5252";
    messageDisplay.textContent = "إجابة خاطئة، حاول مرة أخرى.";
  }
});

updateStatus();
loadWord();
