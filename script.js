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
let tip_close_value = 4; //Diferença entre o número palpitado e o número sorteado para receber a dica que o valor está próximo.
let score = 21;
let secretNumber;

let difficulty = document.querySelector('.difficulty');



/* Esta função retorna um número entre dois valores definidos. O valor retornado será maior ou igual a min, e menor ou igual a max. */
function getRandomNumber(min, max) {
    max += 1;
    return Math.trunc(Math.random() * (max - min) + min);
}


function refreshNumber() {
    secretNumber = getRandomNumber(min, max);
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('#max').textContent = max;

}

refreshNumber();

function updateScore() {
    score--;
    document.querySelector('.score').textContent = score;
}

function endgame() {
    document.querySelector('#guess_input').disabled = true;
    document.querySelector('.difficulty').disabled = true;
}

/* Determina a dificuldade da aplicação! */
difficulty.addEventListener('change', function () {
    const difficulty_value = difficulty.value;
    switch (difficulty_value) {
        case 'Easy':
            max = 21;
            break;
        case 'Normal':
            max = 63;
            break;
        case 'Hard':
            max = 105;
            break;
        case 'Impossible':
            max = 999
            break;
        default:
            max = 21;
            break;
    }

    refreshNumber();
});

// Listener do Check!
document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);
    console.log(typeof guess, guess);


    // Condições de adivinhações.

    if (guess < min || guess > max) { // Fora do intervalo.
        document.querySelector('.message').textContent = `Escolha entre ${min} e ${max}`;
    }
    else if (guess === secretNumber) { // Número correto.
        document.querySelector('.message').textContent = 'Número Correto!';
        document.body.style = 'background-color: green';
        endgame();
    }

    else { // Palpites errados
        if (score > 1) {
            if (guess > secretNumber) { // Palpite acima do número correto.
                if (guess - secretNumber > 4)
                    document.querySelector('.message').textContent = 'Muito alto!'
                else if (guess - secretNumber <= 4)
                    document.querySelector('.message').textContent = 'Você está próximo!'
            }

            else if (guess < secretNumber) { // Palpite abaixo do número correto.
                if (secretNumber - guess > 4)
                    document.querySelector('.message').textContent = 'Muito baixo!'
                else if (secretNumber - guess <= 4)
                    document.querySelector('.message').textContent = 'Você está próximo!'
            }
            updateScore();
        }
        else {
            document.querySelector('.message').textContent = ' Você perdeu!'
            document.querySelector('.score').textContent = 0;
            document.querySelector('#guess_input').disabled = true;
        }




    }
})

