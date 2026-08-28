// Fonction pour récupérer le paramètre playerName de l'URL
function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
  
  // Récupérer le nom du joueur depuis les paramètres d'URL
  const playerName = getParameterByName('playerName');
  let totalScore = getParameterByName('totalScore');

  // Encodage du nom du joueur pour l'URL
  let encodePlayerName = encodeURIComponent(playerName);
  let encodeTotalScore = encodeURIComponent(totalScore);

  // Fonction pour insérer les variables dans le HTML
  function insertVariables() {
    // Sélectionnez les éléments et remplacez le contenu
    document.querySelectorAll('[data-variable="agent"]').forEach(function(element) {
        element.textContent = playerName;
    });
  }

// Appeler la fonction pour insérer les variables lorsque le DOM est prêt
  document.addEventListener('DOMContentLoaded', insertVariables);

function showMessage(message) {
    var messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.innerHTML = '<p>' + message + '</p>';
    document.querySelector('.screen').appendChild(messageElement);
}

// Calcul de score
let currentScore = 10;

///Musique
document.addEventListener('DOMContentLoaded', (event) => {
    const audioPlayer = document.getElementById('audioPlayer');
    const playButton = document.getElementById('playButton');

    playButton.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playButton.textContent = 'Pause';
        } else {
            audioPlayer.pause();
            playButton.textContent = 'Lire la musique';
        }
    });
});

/// Sortir des images
document.addEventListener('click', function(event) {
    var cardPop = document.getElementById('card_pop');
    var card = document.querySelector('.card');
    var screenPop = document.getElementById('screen_pop');
    var screen = document.querySelector('.screen');
    var screenPop2 = document.getElementById('screen_pop2');

    if (cardPop.classList.contains('visible') && !cardPop.contains(event.target) && !card.contains(event.target)) {
        cardPop.classList.remove('visible');
    }

    if (screenPop.classList.contains('visible') && !screenPop.contains(event.target) && !screen.contains(event.target)) {
        screenPop.classList.remove('visible');
    }

    if (screenPop2.classList.contains('visible') && !screenPop2.contains(event.target) && !screen.contains(event.target)) {
        screenPop2.classList.remove('visible');
    }

    var cesarPop = document.getElementById('cesar_pop');
    var cesar = document.querySelector('.cesar');
    var vigenerePop = document.getElementById('vigenere_pop');
    var vigenere = document.querySelector('.vigenere');
    var hillPop = document.getElementById('hill_pop');
    var hill = document.querySelector('.hill');
    var chasePop = document.getElementById('chase_pop');
    var chase = document.querySelector('.chase');
    var diffiehellmanPop = document.getElementById('diffiehellman_pop');
    var diffiehellman = document.querySelector('.diffiehellman');
    var rsaPop = document.getElementById('rsa_pop');
    var rsa = document.querySelector('.rsa');

    if (cesarPop.classList.contains('visible') && !cesarPop.contains(event.target) && !cesar.contains(event.target)) {
        cesarPop.classList.remove('visible');
    }
    if (vigenerePop.classList.contains('visible') && !vigenerePop.contains(event.target) && !vigenere.contains(event.target)) {
        vigenerePop.classList.remove('visible');
    }
    if (hillPop.classList.contains('visible') && !hillPop.contains(event.target) && !hill.contains(event.target)) {
        hillPop.classList.remove('visible');
    }
    if (chasePop.classList.contains('visible') && !chasePop.contains(event.target) && !chase.contains(event.target)) {
        chasePop.classList.remove('visible');
    }
    if (diffiehellmanPop.classList.contains('visible') && !diffiehellmanPop.contains(event.target) && !diffiehellman.contains(event.target)) {
        diffiehellmanPop.classList.remove('visible');
    }


});

///Gestion des pages du carnet
// Cesar
function openCesar() {
    document.getElementById('cesar_pop').classList.add('visible');
  }
  
// Vigenère
function openVigenere() {
    document.getElementById('vigenere_pop').classList.add('visible');
  }

// Hill
function openHill() {
    document.getElementById('hill_pop').classList.add('visible');
  }

// Chase
function openChase() {
    document.getElementById('chase_pop').classList.add('visible');
  }

// Diffie-Hellman
function openDiffieHellman() {
    document.getElementById('diffiehellman_pop').classList.add('visible');
  }

///Pause
function pause(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

/// Indice
const indices = [
    "Indice 1 : I est la neuvième lettre de l'alphabet",
    "Indice 2 : Sur la roue, il y a un décalage de 2. A est au dessus de C, B au dessus de D, etc. Je me demande au dessus de quelle lettre A se trouve si il y a un décalage de 9",
];

let indiceIndex = 0;

async function fct_indice() {
    if (indiceIndex == 0) {
        document.getElementById('hint').classList.add('visible');
    }
    if (indiceIndex == 1) {
        document.getElementById('hint_given').classList.add('visible');
        hintText.textContent = indices[0];
        await pause(100);
        document.addEventListener('click', function hideHintGiven() {
            document.getElementById('hint_given').classList.remove('visible');
            document.getElementById('hint').classList.add('visible');
            document.removeEventListener('click', hideHintGiven);
        });
    }
    if (indiceIndex == 2) {
        document.getElementById('hint_given').classList.add('visible');
        hintText.textContent = indices[0];
        await pause(100);
        document.addEventListener('click', function hideHintGiven() {
            document.getElementById('hint_given').classList.remove('visible');
            document.removeEventListener('click', hideHintGiven);
            indice_used('yes');
        });
    }
}
document.getElementById('indice').addEventListener('click', function() {
    fct_indice();
});

///Utiliser l'indice
async function indice_used(last) {
    document.getElementById('hint_given').classList.add('visible');
    if (indiceIndex == 0) {
        hintText.textContent = indices[indiceIndex];
    } else {
        hintText.textContent = indices[1]
    }
    await pause(100);
    document.addEventListener('click', function hideHintGiven() {
        document.getElementById('hint_given').classList.remove('visible');
        if (last == 'yes') {
            alert("Pas d'indices supplémentaires");
        }
        document.removeEventListener('click', hideHintGiven);
    });
}

document.getElementById('useButton').addEventListener('click', function() {
    if (indiceIndex < indices.length) {
        indice_used('no');
        indiceIndex++;
    } else {
        alert("Tous les indices ont été utilisés");
    }
    hint.classList.remove('visible');
})

///Ne pas utiliser l'indice
document.getElementById('dontuseButton').addEventListener('click', function() {
    hint.classList.remove('visible');
})

/// Journal
document.getElementById('journal').addEventListener('click', function() {
    document.getElementById('notebook').style.display = 'block';
});

document.getElementById('closeNotebookButton').addEventListener('click', function() {
    document.getElementById('notebook').style.display = 'none';
});

/// Timer
const timerDisplay = document.getElementById('timer-display');
const pauseButton = document.getElementById('pause-button');
const overlay = document.getElementById('overlay');
const TIMER_DURATION = 25 * 60 * 1000; // 25 minutes in milliseconds

let intervalId;
let paused = false;
let remainingTime = TIMER_DURATION;
let elapsedTime = 0;

function startTimer() {
    const endTime = Date.now() + remainingTime;
    localStorage.setItem('timerEndTime', endTime);
    updateTimer();
}

function updateTimer() {
    const endTime = localStorage.getItem('timerEndTime');
    if (!endTime) return;

    const now = Date.now();
    const timeLeft = endTime - now;
    elapsedTime = TIMER_DURATION - timeLeft;

    if (timeLeft <= 0) {
        timerDisplay.textContent = '00:00';
        localStorage.removeItem('timerEndTime');
        clearInterval(intervalId);
    } else {
        const minutes = Math.floor(timeLeft / 1000 / 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        // Décrémenter le score toutes les cinq minutes
        if (elapsedTime % (5 * 60 * 1000) < 1000) { // Vérifie si 2 minutes se sont écoulées
            currentScore = Math.max(currentScore - 1, 0); // Décrémente le score sans descendre en dessous de 0
        }

        if (!paused) {
            requestAnimationFrame(updateTimer);
        }
    }
}

function pauseTimer() {
    if (!paused) {
        paused = true;
        clearInterval(intervalId);
        const endTime = localStorage.getItem('timerEndTime');
        remainingTime = endTime - Date.now();
        overlay.style.display = 'block';
        pauseButton.textContent = 'Resume Timer';
    } else {
        paused = false;
        localStorage.setItem('timerEndTime', Date.now() + remainingTime);
        overlay.style.display = 'none';
        pauseButton.textContent = 'Pause Timer';
        updateTimer();
    }
}

pauseButton.addEventListener('click', pauseTimer);

document.addEventListener('DOMContentLoaded', () => {
    const endTime = localStorage.getItem('timerEndTime');
    if (endTime) {
        remainingTime = endTime - Date.now();
        if (remainingTime > 0) {
            updateTimer();
        } else {
            timerDisplay.textContent = '00:00';
            localStorage.removeItem('timerEndTime');
        }
    } else {
        startTimer();
    }
});

/// Ecran
function openScreen() {
    if (lock == "True") {
        document.getElementById('screen_pop').classList.add('visible');
    }
    else {
        document.getElementById('screen_pop2').classList.add('visible');
    }
}

/// Déverouillage
lock = "True"

document.getElementById('unlockButton').addEventListener('click', function() {
    var password = document.getElementById('password').value;
    if (password == '07032003') {
        lock = "False";
        currentDialog = 2;
        startDialogSequence();
    } else {    
        document.getElementById('screen_pop').classList.remove('visible');
        alert("Mauvais mot de passe");
    }
});

/// Chiffrement à partir de clé publique
chiffrage = "0";

document.getElementById('sendButton').addEventListener('click', function() {
    var key = document.getElementById('key').value;
    if (key == '84269317') {
        if (chiffrage == "0" ) {
            chiffrage = "1";
            document.getElementById('screen_pop2').classList.remove('visible');
            alert("message chiffré : 9175321725");
        } else {
            document.getElementById('screen_pop2').classList.remove('visible');
            alert("message chiffré : 4738194811747");
        }
    } else {    
        document.getElementById('screen_pop2').classList.remove('visible');
        alert("Attention ! Vous n'utilisez pas la bonne clé publique");
    }
});

function startDialogSequence() {
    showDialog(currentDialog);
}

const openDialogBtn = document.getElementById('openDialogBtn');
const dialogs = document.querySelectorAll('.dialog');
const nextBtns = document.querySelectorAll('.next-btn');
const nextSalleBtns = document.querySelectorAll('.next-salle-btn');
const closeBtns = document.querySelectorAll('.close-btn');

function showDialog(index) {
    if (index >= 0 && index < dialogs.length) {
        dialogs[index].style.display = 'flex';
    }
}

function hideDialog(index) {
    if (index >= 0 && index < dialogs.length) {
        dialogs[index].style.display = 'none';
    }
}

nextBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const show = btn.getAttribute('show');
        hideDialog(index);
        currentDialog = index + 1;
        if (show == 'True') {
            showDialog(currentDialog);
        }
    });
});

nextSalleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
    hideDialog(currentDialog);
    currentDialog = 0;
    totalScore = parseInt(totalScore) + currentScore;
    encodeTotalScore = encodeURIComponent(totalScore);
    window.location.href = `../salle 9/salle9.html?playerName=${encodePlayerName}&totalScore=${encodeTotalScore}`;
    });
});

closeBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        hideDialog(index);
        currentDialog = 0;
    });
});

/// Génération de clé
document.getElementById('genererButton').addEventListener('click', function() {
    document.getElementById('notebook').style.display = 'none';
    currentDialog = 3;
    startDialogSequence();
});

/// Encryptage
document.getElementById('crypterButton').addEventListener('click', function() {
    var messageEncode = document.getElementById('messageEncode').value;
    document.getElementById('notebook').style.display = 'none';
    if (messageEncode === '9175321725') {
        currentDialog = 4;
        startDialogSequence()
    } else {
        if (messageEncode === '4738194811747') {
            currentDialog = 5;
            startDialogSequence()
        } else {alert("Etes-vous sur que vous envoyez le bon message ?")}
    }
});

/// Cliquable 2 : sur le background
document.querySelector('.card').addEventListener('click', function() {
    document.getElementById('card_pop').classList.add('visible');
});

/// Initialiser les dialogues
currentDialog = 0;
startDialogSequence();