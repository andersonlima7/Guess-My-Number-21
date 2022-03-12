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
let highScore = 0;
let secretNumber;

let difficulty = document.querySelector('.difficulty');
let hints = document.querySelector('.hints');



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

function updateHighScore(newScore) {
    highScore = newScore;
    document.querySelector('.highscore').textContent = newScore;
}

// Atualiza o número exibido no meio da tela.
function updateNumber(newNumber) {
    document.querySelector('.number').textContent = newNumber;
}

// Atualiza a mensagem exibida para o jogador.
function updateMessage(newMessage) {
    document.querySelector('.message').textContent = newMessage;
}

// Atualiza a dica exibida para o jogador.
function updateHint(newHint) {
    document.querySelector('.hint').textContent = newHint;
}

// Altera a cor de fundo da aplicação.
function updateBackgroundColor(newColor) {
    document.body.style.backgroundColor = newColor;
    // document.body.style = 'background-color: #60B347';
}

// Ativa ou desativa as dicas
function enableHint(yes) {
    if (yes)
        document.querySelector('.hint').style.display = 'block';
    else
        document.querySelector('.hint').style.display = 'none';
}


function disableHints() {
    if (hints.checked) //Verifica o checkbox das dicas.
        enableHint(true);
    else
        enableHint(false);

}

// Finaliza o jogo, impedindo novos palpites e revelando o número secreto.
function endgame() {
    document.querySelector('#guess_input').disabled = true;
    difficulty.disabled = true;
    hints.disabled = true;
    enableHint(false);
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
        case 'Very Hard':
            max = 999;
            tip_close_value = 16;
            break;
        case 'Impossible':
            max = 999;
            tip_close_value = 16;
            enableHint(false);
            hints.checked = true;
            hints.disabled = true;
            break;
        default:
            max = 21;
            tip_close_value = 2;
            enableHint(true);
            hints.disabled = false;
            break;
    }
}

// Recomeça o jogo com a dificuldade selecionada.
function playAgain() {
    updateScore(21);
    updateNumber('?');
    selectDifficulty();
    updateMessage('Comece a adivinhar...')
    updateHint('As dicas serão apresentadas aqui!');
    updateBackgroundColor('#222');
    newSecretNumber();
    document.querySelector('#guess_input').disabled = false;
    document.querySelector('#guess_input').value = '';
    difficulty.disabled = false;
    if (difficulty.value != "Impossible") {
        enableHint(true);
        hints.disabled = false;
    }

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
        if (score > highScore) {
            updateHighScore(score);
        }
        endgame();
    }

    else { // Palpites errados
        if (score > 1) {
            if (guess > secretNumber) { // Palpite acima do número correto.
                if (guess - secretNumber > tip_close_value)
                    updateHint('Muito alto!');
                else if (guess - secretNumber <= tip_close_value)
                    updateHint('Você está próximo!');
            }

            else if (guess < secretNumber) { // Palpite abaixo do número correto.
                if (secretNumber - guess > tip_close_value)
                    updateHint('Muito Baixo!');
                else if (secretNumber - guess <= tip_close_value)
                    updateHint('Você está próximo!');
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

newSecretNumber();

// Ao alterar a dificuldade o jogo recomeça.
difficulty.addEventListener('change', function () {
    playAgain();
});

hints.addEventListener('click', function () {
    disableHints();
});

// Ao clicar em Jogar Novamente o jogo recomeça.
document.querySelector('.again').addEventListener('click', function () {
    playAgain();
});

// Ao clicar em verificar, o número digitado é comparado com o sorteazdo.
document.querySelector('.check').addEventListener('click', function () {
    play();
});

