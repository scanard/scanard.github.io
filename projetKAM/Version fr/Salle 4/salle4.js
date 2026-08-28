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
  var doorPop = document.getElementById('door_pop');
  var door = document.querySelector('.door');
  var cesarPop = document.getElementById('cesar_pop');
  var cesar = document.querySelector('.cesar');
  var vigenerePop = document.getElementById('vigenere_pop');
  var vigenere = document.querySelector('.vigenere');

  if (doorPop.classList.contains('visible') && !doorPop.contains(event.target) && !door.contains(event.target)) {
      doorPop.classList.remove('visible');
  }
  if (cesarPop.classList.contains('visible') && !cesarPop.contains(event.target) && !cesar.contains(event.target)) {
      cesarPop.classList.remove('visible');
  }

  if (vigenerePop.classList.contains('visible') && !vigenerePop.contains(event.target) && !vigenere.contains(event.target)) {
    vigenerePop.classList.remove('visible');
}
});

///Pause
function pause(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

/// Indice
const indices = [
  "Indice 1 : Cette suite de lettres a l'air de se découper en blocs.",
  "Indice 2 : Chaque bloc doit ensuite être transformé en un nouveau bloc grâce aux équations trouvées dans la boîte.",
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

///Gestion des pages du carnet
// Cesar
function openCesar() {
  document.getElementById('cesar_pop').classList.add('visible');
}

// Vigenère
function openVigenere() {
  document.getElementById('vigenere_pop').classList.add('visible');
}

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
/// Porte
function openDoor() {
  document.getElementById('door_pop').classList.add('visible');
}

/// Validation + dialogue
document.getElementById('verifierButton').addEventListener('click', function() {
  var messageInput = document.getElementById('messageInput').value;
  if (messageInput.toUpperCase() === 'CEST BASTIEN CANARD') {
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
  window.location.href = `../salle 5/salle5.html?playerName=${encodePlayerName}&totalScore=${encodeTotalScore}`;
  });
});

closeBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
      hideDialog(index);
      currentDialog = 0;
  });
});

/// Cliquable 1 : image
document.getElementById('cube').addEventListener('click', function() {
  document.getElementById('cube_pop').classList.add('visible');
});

/// Cliquable 2 : sur le background
document.querySelector('.box').addEventListener('click', function() {
  document.getElementById('box_pop').classList.add('visible');
});

document.addEventListener('click', function(event) {
  var cubePop = document.getElementById('cube_pop');
  var cube = document.getElementById('cube');
  var boxPop = document.getElementById('box_pop');
  var box = document.querySelector('.box');

  if (cubePop.classList.contains('visible') && !cubePop.contains(event.target) && !cube.contains(event.target)) {
      cubePop.classList.remove('visible');
  }

  if (boxPop.classList.contains('visible') && !boxPop.contains(event.target) && !box.contains(event.target)) {
      boxPop.classList.remove('visible');
  }
});