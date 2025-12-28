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

/// Sortir des images
document.addEventListener('click', function(event) {
    var doorPop = document.getElementById('door_pop');
    var door = document.querySelector('.door');
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
    var certificationPop = document.getElementById('certification_pop');
    var certification = document.querySelector('.certification');
  
    if (doorPop.classList.contains('visible') && !doorPop.contains(event.target) && !door.contains(event.target)) {
        doorPop.classList.remove('visible');
    }
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
    if (rsaPop.classList.contains('visible') && !rsaPop.contains(event.target) && !rsa.contains(event.target)) {
        rsaPop.classList.remove('visible');
    }
    if (certificationPop.classList.contains('visible') && !certificationPop.contains(event.target) && !certification.contains(event.target)) {
        certificationPop.classList.remove('visible');
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

// RSA
function openRSA() {
    document.getElementById('rsa_pop').classList.add('visible');
  }

// Certification
function openCertification() {
    document.getElementById('certification_pop').classList.add('visible');
  }

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
    startDialogSequence();
}

/// Validation + dialogue
document.getElementById('verifierButton').addEventListener('click', function() {
    var messageInput = document.getElementById('messageInput').value;
    if (messageInput === 'carotte') {
        startDialogSequence()
    } else {
        alert('Mauvais message décrypté. Veuillez réessayer.');
    }
});

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
    window.location.href = "../score/score.html";
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



/// Sortir des images
document.addEventListener('click', function(event) {
    var postitPop = document.getElementById('postit_pop');
    var postit = document.getElementById('postit');
    var shelfPop = document.getElementById('shelf_pop');
    var shelf = document.querySelector('.shelf');

    if (postitPop.classList.contains('visible') && !postitPop.contains(event.target) && !postit.contains(event.target)) {
        postitPop.classList.remove('visible');
    }

    if (shelfPop.classList.contains('visible') && !shelfPop.contains(event.target) && !shelf.contains(event.target)) {
        shelfPop.classList.remove('visible');
    }
});
