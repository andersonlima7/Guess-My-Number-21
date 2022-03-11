'use strict';

// #72 - Selecting and Manipulating Elements

/*console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = 'Correct NUMBER!!!'

document.querySelector('.number').textContent = '??';
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 7;
console.log(document.querySelector('.guess').value);

*/
// 73# - Handling Click Events

// Elemento -> Evento que acontece com esse elemento -> Reação a esse evento.


const min = 1;
let max = 21;
let tip_close_value = 2; //Diferença entre o número palpitado e o número sorteado para receber a dica que o valor está próximo.
let score = 21;
let secretNumber;

let difficulty = document.querySelector('.difficulty');



/* Esta função retorna um número entre dois valores definidos. O valor retornado será maior ou igual a min, e menor ou igual a max. */
function getRandomNumber(min, max) {
    max += 1;
    return Math.trunc(Math.random() * (max - min) + min);
}


// Gera um novo número secreto.
function newSecretNumber() {
    secretNumber = getRandomNumber(min, max);
    document.querySelector('#max').textContent = max;
}


// Atualiza a pontuação.
function updateScore(newScore) {
    score = newScore;
    document.querySelector('.score').textContent = newScore;
}

// Atualiza o número exibido no meio da tela.
function updateNumber(newNumber) {
    document.querySelector('.number').textContent = newNumber;
}

// Atualiza a mensagem exibida para o jogador.
function updateMessage(newMessage) {
    document.querySelector('.message').textContent = newMessage;
}

// Altera a cor de fundo da aplicação.
function updateBackgroundColor(newColor) {
    document.body.style.backgroundColor = newColor;
    // document.body.style = 'background-color: #60B347';
}

// Finaliza o jogo, impedindo novos palpites e revelando o número secreto.
function endgame() {
    document.querySelector('#guess_input').disabled = true;
    difficulty.disabled = true;
    updateNumber(secretNumber);
}


/* Determina a dificuldade da aplicação, alterando o intervalo de números possíveis a serem sorteados!*/
function selectDifficulty() {
    const difficulty_value = difficulty.value;
    switch (difficulty_value) {
        case 'Easy':
            max = 21;
            tip_close_value = 2;
            break;
        case 'Normal':
            max = 63;
            tip_close_value = 4;
            break;
        case 'Hard':
            max = 105;
            tip_close_value = 8;
            break;
        case 'Impossible':
            max = 999;
            tip_close_value = 16;
            break;
        default:
            max = 21;
            tip_close_value = 2;
            break;
    }
}

// Recomeça o jogo com a dificuldade selecionada.
function playAgain() {
    updateScore(21);
    updateNumber('?');
    updateMessage('Comece a adivinhar...')
    updateBackgroundColor('#222');
    selectDifficulty();
    newSecretNumber();
    document.querySelector('#guess_input').disabled = false;
    document.querySelector('#guess_input').value = '';
    difficulty.disabled = false;
}

// Lógica do jogo. O número palpitado é comparado com o número secreto, a pontuação e a mensagem para orientação do jogador são atualizadas.

function play() {
    const guess = Number(document.querySelector('.guess').value);
    // Condições de adivinhações.

    if (guess < min || guess > max) { // Fora do intervalo.
        updateMessage(`Escolha entre ${min} e ${max}`);
    }
    else if (guess === secretNumber) { // Número correto - Jogador venceu.
        updateMessage('Número Correto!');
        updateBackgroundColor('#60B347');
        endgame();
    }

    else { // Palpites errados
        if (score > 1) {
            if (guess > secretNumber) { // Palpite acima do número correto.
                if (guess - secretNumber > tip_close_value)
                    updateMessage('Muito alto!');
                else if (guess - secretNumber <= tip_close_value)
                    updateMessage('Você está próximo!');
            }

            else if (guess < secretNumber) { // Palpite abaixo do número correto.
                if (secretNumber - guess > tip_close_value)
                    updateMessage('Muito Baixo!');
                else if (secretNumber - guess <= tip_close_value)
                    updateMessage('Você está próximo!');
            }
            updateScore(score - 1); //Diminui a pontuação do jogador.
        }
        else { // Jogador perdeu.
            updateMessage('Você perdeu!');
            updateScore(0);
            updateBackgroundColor('#DB400B');
            endgame();
        }
    }
}

// Ao alterar a dificuldade o jogo recomeça.
difficulty.addEventListener('change', function () {
    playAgain();
});

// Ao clicar em Jogar Novamente o jogo recomeça.
document.querySelector('.again').addEventListener('click', function () {
    playAgain();
});

// Ao clicar em verificar, o número digitado é comparado com o sorteado.
document.querySelector('.check').addEventListener('click', function () {
    play();
});

