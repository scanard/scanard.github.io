// Fonction pour récupérer le paramètre playerName de l'URL
function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Récupérer le nom du joueur depuis les paramètres d'URL
const playerName = getParameterByName('playerName');

// Encodage du nom du joueur pour l'URL
let encodePlayerName = encodeURIComponent(playerName);

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
    var livrePop = document.getElementById('postit_pop');
    var livre = document.getElementById('livre');
    var doorPop = document.getElementById('door_pop');
    var door = document.querySelector('.door');

    if (livrePop.classList.contains('visible') && !livrePop.contains(event.target) && !livre.contains(event.target)) {
        livrePop.classList.remove('visible');
    }
    if (doorPop.classList.contains('visible') && !doorPop.contains(event.target) && !door.contains(event.target)) {
        doorPop.classList.remove('visible');
    }
});

/// Indice
const indices = [];

let indiceIndex = 0;

document.getElementById('indice').addEventListener('click', function() {
    if (indiceIndex < indices.length) {
        alert(indices[indiceIndex]);
        indiceIndex++;
    } else {
        alert("Pas d'indice disponible pour cette salle.");
    }
});

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

    if (timeLeft <= 0) {
        timerDisplay.textContent = '00:00';
        localStorage.removeItem('timerEndTime');
        clearInterval(intervalId);
    } else {
        const minutes = Math.floor(timeLeft / 1000 / 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
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

/// Porte
function openDoor() {
    document.getElementById('door_pop').classList.add('visible');
    currentDialog = 5;
    startDialogSequence();
}

/// Validation + dialogue

document.getElementById('verifierButton').addEventListener('click', function() {
    var messageInput = document.getElementById('messageInput').value;
    if (messageInput.toUpperCase() === 'DECHIFFREZ CELA POUR OUVRIR LA PORTE') {
        currentDialog = 8;
        startDialogSequence()
    } else {
        alert('Mauvais message décrypté. Veuillez réessayer.');
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
    window.location.href = "../salle 2/salle2.html?playerName="+ encodePlayerName;
    });
});

closeBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        hideDialog(index);
        currentDialog = 0;
    });
});

/// Cliquable 1 : image
document.getElementById('livre').addEventListener('click', function() {
    document.getElementById('postit_pop').classList.add('visible');
    currentDialog = 7;
    startDialogSequence();
});

/// Initialiser les dialogues
currentDialog = 0;
startDialogSequence();

