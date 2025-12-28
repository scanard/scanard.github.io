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
    ///var doorPop = document.getElementById('door_pop');
    ///var door = document.querySelector('.door');
    var cesarPop = document.getElementById('cesar_pop');
    var cesar = document.querySelector('.cesar');
    var vigenerePop = document.getElementById('vigenere_pop');
    var vigenere = document.querySelector('.vigenere');
    var hillPop = document.getElementById('hill_pop');
    var hill = document.querySelector('.hill');
    var chasePop = document.getElementById('chase_pop');
    var chase = document.querySelector('.chase');

    ///if (doorPop.classList.contains('visible') && !doorPop.contains(event.target) && !door.contains(event.target)) {
        ///doorPop.classList.remove('visible');
    ///}
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
});

/// Indice
const indices = [
    "Il n'y a pas d'indice disponible pour cette énigme.",
];


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

/// Porte
function openDoor() {
    startDialogSequence();
}

/// Génération 
document.getElementById('generateButton1').addEventListener('click', function() {
    document.getElementById('publicKey_pop').classList.add('visible');
    });
    
document.getElementById('generateButton2').addEventListener('click', function() {
    document.getElementById('sharedKey_pop').classList.add('visible');
    showDialog(4);
});

/// Validation + dialogue
function startDialogSequence() {
    currentDialog = 0;
    showDialog(currentDialog);
}

const openDialogBtn = document.getElementById('openDialogBtn');
const dialogs = document.querySelectorAll('.dialog');
const nextBtns = document.querySelectorAll('.next-btn');
const finishBtns = document.querySelectorAll('.finish-btn');
const closeAllBtns = document.querySelectorAll('.close-all-btn');
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
        hideDialog(index);
        currentDialog = index + 1;
        showDialog(currentDialog);
    });
});

closeAllBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
    hideDialog(currentDialog);
    currentDialog = 0;

    totalScore = parseInt(totalScore) + currentScore;
    encodeTotalScore = encodeURIComponent(totalScore);
    window.location.href = `../salle 8/salle8.html?playerName=${encodePlayerName}&totalScore=${encodeTotalScore}`;
    });
});

finishBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
    hideDialog(currentDialog);
    });
});

closeBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        hideDialog(index);
        currentDialog = 0;
    });
});
