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
    question: 'Qual classe de medicamentos é usada para reduzir a pressão arterial e pode causar tosse seca como efeito adverso?',
    answers: [
      { text: "Beta-bloqueadores", correct: false },
      { text: "IECA", correct: true },
      { text: "Diuréticos", correct: false },
      { text: "Estatinas", correct: false },
    ],
  },
  {
    question: 'Por que os medicamentos lipossolúveis, como vitaminas A, D, E e K, não devem ser administrados diretamente na veia?',
    answers: [
      { text: "Causam irritação severa nas veias", correct: false },
      { text: "Podem formar embolias gordurosas", correct: true },
      { text: "Não têm efeito terapêutico pela via IV", correct: false },
      { text: "São rapidamente eliminados antes de serem absorvidos", correct: false },
    ],
  },
  {
    question: 'Qual é o antídoto para intoxicação por varfarina, um anticoagulante oral?',
    answers: [
      { text: "Protamina", correct: false },
      { text: "Flumazenil", correct: false },
      { text: "Vitamina K", correct: true },
      { text: "Naloxona", correct: false },
    ],
  },
  {
    question: 'Qual é o antídoto para intoxicação por opioides, como a morfina?',
    answers: [
      { text: "N-acetilcisteína", correct: false },
      { text: "Flumazenil", correct: false },
      { text: "Naloxona", correct: true },
      { text: "Vitamina K", correct: false },
    ],
  },
  {
    question: 'Os medicamentos da classe dos AINEs, como o ibuprofeno, são usados para dor e febre. Qual é um efeito adverso comum?',
    answers: [
      { text: "Insônia", correct: false },
      { text: "Hipertensão arterial", correct: false },
      { text: "Úlcera gástrica", correct: true },
      { text: "Cãimbras musculares", correct: false },
      
    ],
  },
  {
    question: 'Principal efeito colateral associado ao uso prolongado de corticosteroides:',
    answers: [
      { text: "Hipoglicemia", correct: false },
      { text: "Osteoporose", correct: true },
      { text: "Insuficiência renal", correct: false },
      { text: "Anemia", correct: false },
    ],
  },
  {
    question: 'Efeito adverso que é comum ao uso de beta-bloqueadores, como o atenolol?',
    answers: [
      { text: "Bradicardia", correct: true },
      { text: "Hiperglicemia", correct: false },
      { text: "Visão turva", correct: false },
      { text: "Hipotermia", correct: false },
    ],
  },
  {
    question: 'Antídoto utilizado para intoxicação por benzodiazepínicos, como o diazepam?',
    answers: [
      { text: "Flumazenil", correct: true },
      { text: "Naloxona", correct: false },
      { text: "Protamina", correct: false },
      { text: "Atropina", correct: false },
    ],
  },
  {
    question: 'Quais desses medicamentos é um anti-inflamatório não esteroidal:',
    answers: [
      { text: "Metilprednisolona", correct: false },
      { text: "Naproxeno", correct: true },
      { text: "Digoxina", correct: false },
      { text: "Sinvastatina", correct: false },
    ],
  },
  {
    question: 'Efeito adverso pode ocorrer com a administração de paracetamol em doses altas ou quando mal diluído:',
    answers: [
      { text: "Reação alérgica grave", correct: false },
      { text: "Hepatotoxicidade", correct: true },
      { text: "Hipoglicemia", correct: false },
      { text: "Hipotensão severa", correct: false },
    ],
  },
  {
    question: 'Qual a alternativa que apresenta apenas anti-inflamatórios não esteroides?',
    answers: [
      { text: "Diclofenaco, ibuprofeno e cetoprofeno", correct: true },
      { text: "Hidrocortisona, dexametasona e prednisona", correct: false },
      { text: "Cefalexina, ceftriaxona e amoxicilina", correct: false },
      { text: "Espiramicina, pirimetamina e clindamicina", correct: false },
    ],
  },
  {
    question: 'Solução indicada para promover a diurese osmótica:',
    answers: [
      { text: "Ringer simples", correct: false },
      { text: "Dextrano", correct: false },
      { text: "Ringer lactato", correct: false },
      { text: "Manitol", correct: true },
    ],
  },
  {
    question: 'Entre as classes de medicamentos mais amplamente utilizadas para controle da hipertensão arterial sistêmica está a dos:',
    answers: [
      { text: "Betabloqueadores", correct: false },
      { text: "Digitálicos", correct: false },
      { text: "IECA", correct: true },
      { text: "Antiarrítmicos", correct: false },
    ],
  },
];