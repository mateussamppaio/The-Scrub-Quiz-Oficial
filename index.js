const $themesContainer = document.querySelector(".themes");
const $exibirNome = document.querySelector('.displayName');
const $initialMessage = document.querySelector('.initial-message');
const $userNameInput = document.querySelector('.userName');
const $playerName = document.querySelector("#playerName"); // Elemento para exibir o nome do jogador
const $startGameButton = document.querySelector(".set-themes");
const $initialTheme = document.querySelector(".initialTheme");

document.querySelectorAll(".set-themes").forEach(button => {
  button.disabled = true
},
);


// Função para salvar o nome e exibir na página
function saveName() {
  const $userName = $userNameInput.value;

  // Exibe o nome do jogador no parágrafo .displayName
  if ($userName.trim() !== "") {
    $exibirNome.textContent = "Nome do jogador: " + $userName;
    $exibirNome.classList.remove("hide"); // Exibe o nome

    // Após salvar o nome, esconde a mensagem inicial
    $initialMessage.classList.add("hide");

    // Salva o nome do jogador para exibir depois
    $playerName.textContent = $userName; // Exibe o nome na nova tela
    document.querySelectorAll(".set-themes").forEach(button => {
      button.disabled = false
    },
    );
  } else {
    alert("Por favor, insira o nome!");
  }
}

// Função para mostrar os temas e esconder a tela inicial
function setTheme() {
  $startGameButton.classList.add("hide")
  $initialTheme.classList.remove("hide");
  $themesContainer.classList.remove("hide"); // Mostra os temas
}

