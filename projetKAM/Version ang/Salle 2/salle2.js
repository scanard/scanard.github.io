// Fonction pour récupérer le paramètre playerName de l'URL
function getParameterByName(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Récupérer le nom du joueur depuis les paramètres d'URL
const playerName = getParameterByName('playerName');

// Récupérer le nom du joueur depuis les paramètres d'URL
let totalScore = 0;

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
            playButton.textContent = 'Play music';
        }
    });
});

// Calcul de score
let currentScore = 10;

///Pause
function pause(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

/// Indice
const indices = [
    "Hint 1 : I is the ninth letter of the alphabet",
    "Hint 2 : On the wheel, there is a gap of 2. A is above C, B above D, etc. I wonder above which letter A stands if there is a gap of 9",
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
        if (last == 'no') {
            currentScore = currentScore - 1;
        }
    } else {
        hintText.textContent = indices[1]
        if (last == 'no') {
            currentScore = currentScore - 1;
        }
    }
    await pause(100);
    document.addEventListener('click', function hideHintGiven() {
        document.getElementById('hint_given').classList.remove('visible');
        if (last == 'yes') {
            alert("No additionnal hint");
        }
        document.removeEventListener('click', hideHintGiven);
    });
}

document.getElementById('useButton').addEventListener('click', function() {
    if (indiceIndex < indices.length) {
        indice_used('no');
        indiceIndex++;
    } else {
        alert("Every hints have been used");
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

/// Porte
function openDoor() {
    document.getElementById('door_pop').classList.add('visible');
}

/// Validation + dialogue
document.getElementById('verifierButton').addEventListener('click', function() {
    var messageInput = document.getElementById('messageInput').value;
    if (messageInput.toUpperCase() === 'CAROTTE') {
        startDialogSequence()
    } else {
        alert('Wrong message decrypted. Please try again.');
    }
});

function startDialogSequence() {
    currentDialog = 0;
    showDialog(currentDialog);
}

const openDialogBtn = document.getElementById('openDialogBtn');
const dialogs = document.querySelectorAll('.dialog');
const nextBtns = document.querySelectorAll('.next-btn');
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
    window.location.href = `../salle 3/salle3.html?playerName=${encodePlayerName}&totalScore=${encodeTotalScore}`;
    });
});

closeBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        hideDialog(index);
        currentDialog = 0;
    });
});

/// Cliquable 1 : image
document.getElementById('postit').addEventListener('click', function() {
    document.getElementById('postit_pop').classList.add('visible');
});

/// Cliquable 2 : sur le background
document.querySelector('.shelf').addEventListener('click', function() {
    document.getElementById('shelf_pop').classList.add('visible');
});

/// Sortir des images
document.addEventListener('click', function(event) {
    var postitPop = document.getElementById('postit_pop');
    var postit = document.getElementById('postit');
    var shelfPop = document.getElementById('shelf_pop');
    var shelf = document.querySelector('.shelf');
    var doorPop = document.getElementById('door_pop');
    var door = document.querySelector('.door');

    if (postitPop.classList.contains('visible') && !postitPop.contains(event.target) && !postit.contains(event.target)) {
        postitPop.classList.remove('visible');
    }

    if (shelfPop.classList.contains('visible') && !shelfPop.contains(event.target) && !shelf.contains(event.target)) {
        shelfPop.classList.remove('visible');
    }

    if (doorPop.classList.contains('visible') && !doorPop.contains(event.target) && !door.contains(event.target)) {
        doorPop.classList.remove('visible');
    }
});