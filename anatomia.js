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
    question: 'Qual desses ossos que não faz parte dos membros superiores?',
    answers: [
      { text: "Úmero", correct: false },
      { text: "Escápula", correct: false },
      { text: "Rádio", correct: false },
      { text: "Fíbula", correct: true },
    ],
  },
  {
    question: 'Onde o osso parietal fica localizado:',
    answers: [
      { text: "no crânio", correct: true },
      { text: "no tórax", correct: false },
      { text: "no quadril", correct: false },
      { text: "nos membros inferiores", correct: false },
    ],
  },
  {
    question: 'Fossa do olecrano, colo cirúrgico, colo anatômico e corpo são acidentes anatômicos de qual dos ossos apresentados a seguir:',
    answers: [
      { text: "Rádio", correct: false },
      { text: "Ulna", correct: false },
      { text: "Úmero", correct: true },
      { text: "Clavícula", correct: false },
    ],
  },
  {
    question: 'Identifique dentre as opções seguintes a que corresponde apenas a ossos longos no ser humano',
    answers: [
      { text: "Parietal, fêmur e Patela", correct: false },
      { text: "Esfenoide, tíbia e vértebra", correct: false },
      { text: "Vértebra, perônio e tíbia", correct: false },
      { text: "Ulna, úmero e tíbia", correct: true },
    ],
  },
  {
    question: 'Qual dos termos técnicos abaixo refere-se ao aumento anormal de células em um tecido?',
    answers: [
      { text: "Hipertrofia", correct: false },
      { text: "Hiperplasia", correct: true },
      { text: "Atrofia", correct: false },
      { text: "Necrose", correct: false },
    ],
  },
  {
    question: 'Qual das alternativas a seguir NÃO é considerada uma descrição dos tipos de tecido muscular?',
    answers: [
      { text: "Tecido muscular estriado esquelético", correct: false },
      { text: "Tecido muscular estriado cardíaco", correct: false },
      { text: "Tecido muscular estriado gorduroso", correct: true },
      { text: "Tecido muscular liso", correct: false },
    ],
  },
  {
    question: 'No corpo humano, temos 10 pododáctilos, sendo 5 em cada pé. Qual o nome que é dado ao primeiro pododáctilo de cada pé?',
    answers: [
      { text: "Hióide", correct: false },
      { text: "Patela", correct: false },
      { text: "Hálux", correct: true },
      { text: "Sesamóide", correct: false },
    ],
  },
  {
    question: 'Qual a opção que NÃO corresponde à função do sistema esquelético:',
    answers: [
      { text: "Proteger contra fungos e bactérias", correct: true },
      { text: "Produzir células sanguíneas", correct: false },
      { text: "Promover a sustentação do corpo", correct: false },
      { text: "Proteger órgãos", correct: false },
    ],
  },
  {
    question: 'As suturas são articulações fibrosas que conectam os ossos. São comumente encontradas nos ossos do:',
    answers: [
      { text: "Crânio", correct: true },
      { text: "Quadril", correct: false },
      { text: "Punho", correct: false },
      { text: "Tornozelo", correct: false },
    ],
  },
  {
    question: 'O(a) ___________ é considerada(o) o maior órgão do corpo humano',
    answers: [
      { text: "Fígado", correct: false },
      { text: "Intestino", correct: false },
      { text: "Fêmur", correct: false },
      { text: "Pele", correct: true },
    ],
  },
  {
    question: 'O intestino delgado é dividido em três partes. Quais são?',
    answers: [
      { text: "Ceco, cólon e reto", correct: false },
      { text: "Cervical, torácica e abdominal", correct: false },
      { text: "Duodeno, jejuno e íleo", correct: true },
      { text: "Fundo, corpo e antro", correct: false },
    ],
  },
  {
    question: 'O estômago é dividido em cinco regiões, sendo elas:',
    answers: [
      { text: "Cárdia, lobo, frente, limbo e piloro", correct: false },
      { text: "Cárdia, fundo, corpo, antro e piloro", correct: true },
      { text: "Superficial, fundo, corpo, antro e piloro", correct: false },
      { text: "Mitral, fundo, superficial, antro e piloro ", correct: false },
    ],
  },
  {
    question: 'Os doze pares de costelas são divididos em três grupos, sendo o par 11° e 12° classificado como?',
    answers: [
      { text: "Costelas Falsas", correct: false },
      { text: "Costelas Verdadeiras", correct: false },
      { text: "Costelas Flutuantes", correct: true },
      { text: " Costelas Típicas", correct: false },
    ],
  },
  {
    question: 'O esqueleto humano é dividido em duas porções:',
    answers: [
      { text: "Esqueleto sagital e esqueleto coronal", correct: false },
      { text: "Esqueleto axial e esqueleto apendicular", correct: true },
      { text: "Esqueleto sagital e esqueleto longitudina", correct: false },
      { text: "Esqueleto axial e esqueleto sagital", correct: false },
    ],
  },
  {
    question: 'Quantas vértebras torácicas um indivíduo possui?',
    answers: [
      { text: "12", correct: true },
      { text: "7", correct: false },
      { text: "15", correct: false },
      { text: "10 ", correct: false },
    ],
  },
];
