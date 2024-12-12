const $startGameButton = document.querySelector(".start-quiz"); 
const $nextQuestionButton = document.querySelector(".next-question");
const $questionsContainer = document.querySelector(".questions-container");
const $questionText = document.querySelector(".question");
const $answersContainer = document.querySelector(".answers-container");
const $confirmedMessage = document.querySelector(".confirmed-message");
const correctSound = document.getElementById("correct-sound");
const incorrectSound = document.getElementById("incorrect-sound");

let currentQuestionIndex = 0;
let totalCorrect = 0;
let selectedQuestions = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

$startGameButton.addEventListener("click", startGame);
$nextQuestionButton.addEventListener("click", displayNextQuestion);

function startGame() {
  shuffle(questions);
  selectedQuestions = questions.slice(0, 7);

  selectedQuestions.forEach(question => shuffle(question.answers));

  $startGameButton.classList.add("hide");
  $confirmedMessage.classList.add("hide");
  $questionsContainer.classList.remove("hide");
  displayNextQuestion();
}

function displayNextQuestion() {
  resetState();

  if (selectedQuestions.length === currentQuestionIndex) {
    return finishGame();
  }

  const currentQuestion = selectedQuestions[currentQuestionIndex];
  $questionText.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const newAnswer = document.createElement("button");
    newAnswer.classList.add("button", "answer");
    newAnswer.textContent = answer.text;
    if (answer.correct) {
      newAnswer.dataset.correct = answer.correct;
    }
    $answersContainer.appendChild(newAnswer);

    newAnswer.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  while ($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild);
  }

  $nextQuestionButton.classList.add("hide");
}

function selectAnswer(event) {
  const answerClicked = event.target;

  if (answerClicked.dataset.correct) {
    totalCorrect++;

    correctSound.currentTime = 0;
    correctSound.play();
  } else {
    
    incorrectSound.currentTime = 0;
    incorrectSound.play();
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true;

    if (button.dataset.correct) {
      button.classList.add("correct");
    } else {
      button.classList.add("incorrect");
    }
  });

  $nextQuestionButton.classList.remove("hide");
  currentQuestionIndex++;
}

function finishGame() {
  const totalQuestions = selectedQuestions.length;
  const performance = Math.floor((totalCorrect * 100) / totalQuestions);

  let message = "";

  switch (true) {
    case performance >= 90:
      message = "Excelente :)";
      break;
    case performance >= 70:
      message = "Muito bom :)";
      break;
    case performance >= 50:
      message = "Bom";
      break;
    default:
      message = "Pode melhorar :(";
  }

  $questionsContainer.innerHTML = `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button onclick="window.location.href = 'index.html'" class="button">
      Refazer teste
    </button>
  `;
}

const questions = [
  {
    question: 'Qual é o objetivo principal da semiologia médica?',
    answers: [
      { text: "Curar o paciente imediatamente", correct: false },
      { text: "Identificar os sinais e sintomas das doenças", correct: true },
      { text: "Prescrever medicamentos", correct: false },
      { text: "Realizar procedimentos cirúrgicos", correct: false },
      
    ],
  },
  {
    question: 'O que significa o termo "sinal" em semiologia?',
    answers: [
      { text: "Algo subjetivo relatado pelo paciente", correct: false },
      { text: "Um achado objetivo detectado pelo examinador", correct: true },
      { text: "Uma impressão diagnóstica inicial", correct: false },
      { text: "Um fator de risco de uma doença", correct: false },
    ],
  },
  {
    question: 'Qual dos métodos faz parte do exame físico na semiologia?',
    answers: [
      { text: "Análise laboratorial", correct: false },
      { text: "Percussão", correct: true },
      { text: "Tomografia computadorizada", correct: false },
      { text: "Ressonância magnética", correct: false },
    ],
  },
  {
    question: 'O que é considerado um "sintoma"?',
    answers: [
      { text: "Um achado clínico visível", correct: false },
      { text: "Algo subjetivo relatado pelo paciente", correct: true },
      { text: "Um diagnóstico confirmado", correct: false },
      { text: "Uma alteração laboratorial", correct: false },
    ],
  },
  {
    question: 'A ausculta é usada principalmente para avaliar qual sistema do corpo?',
    answers: [
      { text: "Sistema digestório e nervoso", correct: false },
      { text: "Sistema respiratório e cardiovascular", correct: true },
      { text: "Sistema nervoso e cardiovascular", correct: false },
      { text: "Sistema musculoesquelético e respiratório", correct: false },
    ],
  },
  {
    question: 'O que significa a "inspeção" no exame clínico?',
    answers: [
      { text: "Observar o paciente atentamente", correct: true },
      { text: "Palpar áreas específicas do corpo", correct: false },
      { text: "Bater suavemente para identificar sons", correct: false },
      { text: "Ouvir sons internos do corpo", correct: false },
    ],
  },
  {
    question: 'O termo "anamnese" refere-se a:',
    answers: [
      { text: "Exame físico detalhado", correct: false },
      { text: "Levantamento da história clínica do paciente", correct: true },
      { text: "Avaliação laboratorial", correct: false },
      { text: "Diagnóstico por imagem", correct: false },
    ],
  },
  {
    question: 'Quais dessas vias de administração são mais utilizadas para a administração de vacinas?',
    answers: [
      { text: "Via intradérmica e intravenosa", correct: false },
      { text: "Via subcutânea e intramuscular", correct: true },
      { text: "Via transdérmica e sublingual", correct: false },
      { text: "Via oral e intranasal", correct: false },
    ],
  },
  {
    question: 'Ruído adventício frequentemente associado a asma e broncoconstrição:',
    answers: [
      { text: "Sibilos", correct: true },
      { text: "Atrito pleural", correct: false },
      { text: "Ronco", correct: false },
      { text: "Estertores crepitantes", correct: false },
    ],
  },
  {
    question: 'Como é chamada a eliminação de sangue pela boca, proveniente das vias respiratórias?',
    answers: [
      { text: "Hematúria", correct: false },
      { text: "Hemoptise", correct: true },
      { text: "Epistaxe", correct: false },
      { text: "Hematemese", correct: false },
    ],
  },
  {
    question: 'Achado semiológico característico da percussão torácica em pacientes com pneumotórax:',
    answers: [
      { text: "Som maciço", correct: false },
      { text: "Som timpânico", correct: true },
      { text: "Som submaciço", correct: false },
      { text: "Som crepitante", correct: false },
    ],
  },
  {
    question: 'Na palpação abdominal, o sinal de Blumberg positivo é indicativo de:',
    answers: [
      { text: "Inflamação pleural", correct: false },
      { text: "Hérnia inguinal", correct: false },
      { text: "DRGE", correct: false },
      { text: "Apendicite", correct: true },
    ],
  },
  {
    question: 'O que caracteriza a bradipneia?',
    answers: [
      { text: "Frequência respiratória abaixo do normal", correct: true },
      { text: "Respiração irregular e superficial", correct: false },
      { text: "Movimentos respiratórios dolorosos", correct: false },
      { text: "Respiração rápida e profunda", correct: false },
    ],
  },
  {
    question: 'Qual é a principal característica da respiração de Cheyne-Stokes?',
    answers: [
      { text: "Respiração rápida e superficial", correct: false },
      { text: "Ciclos de apneia seguidos por respiração crescente e decrescente", correct: true },
      { text: "Respiração profunda e rápida, sem pausas", correct: false },
      { text: "Respiração irregular com sibilos constantes", correct: false },
    ],
  },
];