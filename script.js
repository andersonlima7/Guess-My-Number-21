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


let min = 1;
let max = 21;
let score = 20;
let secretNumber;

/* Esta função retorna um número entre dois valores definidos. O valor retornado será maior ou igual a min, e menor ou igual a max. */
function getRandomNumber(min, max) {
    max += 1;
    return Math.trunc(Math.random() * (max - min) + min);
}


function refreshNumber() {
    secretNumber = getRandomNumber(min, max);
    document.querySelector('.number').textContent = secretNumber;
}

refreshNumber();

function updateScore() {
    score--;
    document.querySelector('.score').textContent = score;
}


// Listener das opções do Between
document.querySelector('#min').addEventListener('change', function () {
    min = Number(document.querySelector('#min').value);
    alert(min, max);
    refreshNumber();
})

document.querySelector('#max').addEventListener('change', function () {
    max = Number(document.querySelector('#max').value);
    alert(max);
    refreshNumber();
})


// Listener do Check!
document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);
    console.log(typeof guess, guess);


    // Condições de adivinhações.

    if (guess < min || guess > max) { // Fora do intervalo.
        document.querySelector('.message').textContent = 'Escolha entre 1 e 20';
    }
    else if (guess === secretNumber) { // Número correto.
        document.querySelector('.message').textContent = '🎉  Número Correto!'
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
            document.querySelector('.message').textContent = '😢 Você perdeu!'
            document.querySelector('.score').textContent = 0;
        }




    }
})

