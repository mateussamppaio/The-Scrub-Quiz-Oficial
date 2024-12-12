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
    question: 'O que acontece com o diafragma durante a inspiração?',
    answers: [
      { text: "Relaxa e sobe", correct: false },
      { text: "Contrai e desce", correct: true },
      { text: "Relaxa e desce", correct: false },
      { text: "Contrai e sobe", correct: false },
    ],
  },
  {
    question: 'Qual parte do cérebro é responsável pelo equilíbrio e coordenação motora?',
    answers: [
      { text: "Tálamo", correct: false },
      { text: "Hipotálamo", correct: false },
      { text: "Córtex cerebral", correct: false },
      { text: "Cerebelo", correct: true },
    ],
  },
  {
    question: 'Qual é a principal função dos glóbulos vermelhos?',
    answers: [
      { text: "Transporte de oxigênio", correct: true },
      { text: "Defesa contra infecções", correct: false },
      { text: "Coagulação sanguínea", correct: false },
      { text: "Regulação da temperatura corporal", correct: false },
    ],
  },
  {
    question: 'Onde ocorre a troca gasosa no sistema respiratório?',
    answers: [
      { text: "Brônquios", correct: false },
      { text: "Traqueia", correct: false },
      { text: "Alvéolos pulmonares", correct: true },
      { text: "Faringe", correct: false },
    ],
  },
  {
    question: 'Qual hormônio é responsável pelo controle do nível de açúcar no sangue?',
    answers: [
      { text: "Insulina", correct: true },
      { text: "Adrenalina", correct: false },
      { text: "Tiroxina", correct: false },
      { text: "Estrogênio", correct: false },
    ],
  },
  {
    question: 'Qual é a principal função dos rins?',
    answers: [
      { text: "Produção de hormônios", correct: false },
      { text: "Filtração do sangue e formação da urina", correct: true },
      { text: "Produção de glóbulos vermelhos", correct: false },
      { text: "Produção de bile", correct: false },
    ],
  },
  {
    question: 'A célula muscular se contrai em resposta à liberação de qual íon?',
    answers: [
      { text: "Cloro", correct: false },
      { text: "Potássio", correct: false },
      { text: "Cálcio", correct: true },
      { text: "Sódio", correct: false },
    ],
  },
  {
    question: 'O que caracteriza a fase de contração do coração?',
    answers: [
      { text: "Diástole", correct: false },
      { text: "Sistole", correct: true },
      { text: "Relaxamento", correct: false },
      { text: "Contratura", correct: false },
    ],
  },
  {
    question: 'Onde ocorre a maior absorção de nutrientes no sistema digestório?',
    answers: [
      { text: "Estômago", correct: false },
      { text: "Faringe", correct: false },
      { text: "Intestino delgado", correct: true },
      { text: "Cólon", correct: false },
    ],
  },
  {
    question: 'O que é o volume corrente?',
    answers: [
      { text: "A quantidade de ar inspirado e expirado a cada respiração", correct: true },
      { text: "O volume de ar nos alvéolos", correct: false },
      { text: "A quantidade de ar que entra nos pulmões por minuto", correct: false },
      { text: "O volume de sangue que circula nas artérias", correct: false },
    ],
  },
  {
    question: 'Qual é o principal componente do plasma sanguíneo?',
    answers: [
      { text: "Hemoglobina", correct: false },
      { text: "Glóbulos vermelhos", correct: false },
      { text: "Plaquetas", correct: false },
      { text: "Água", correct: true },
    ],
  },
  {
    question: 'O sistema endócrino regula funções do corpo por meio de:',
    answers: [
      { text: "Sinais elétricos", correct: false },
      { text: "Hormônios", correct: true },
      { text: "Reflexos", correct: false },
      { text: "Impulsos nervosos", correct: false },
    ],
  },
  {
    question: 'Estrutura é responsável pela condução do impulso nervoso:',
    answers: [
      { text: "Axônio", correct: true },
      { text: "Dendrito", correct: false },
      { text: "Corpo celular", correct: false },
      { text: "Sinapse", correct: false },
    ],
  },
  {
    question: 'Hormônio que é responsável pelo aumento da frequência cardíaca em situações de estresse:',
    answers: [
      { text: "Insulina", correct: false },
      { text: "Adrenalina", correct: true },
      { text: "Tiroxina", correct: false },
      { text: "Progesterona", correct: false },
    ],
  },
  {
    question: 'Qual a função do sistema linfático?',
    answers: [
      { text: "Regular a temperatura corporal", correct: false },
      { text: "Transportar hormônios", correct: false },
      { text: "Auxiliar na defesa imunológica e drenagem de líquidos", correct: true },
      { text: "Armazenar energia", correct: false },
    ],
  },
];