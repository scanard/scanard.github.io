
// Fonction pour récupérer le paramètre playerName de l'URL
function getParameterByName(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Récupérer le nom du joueur depuis les paramètres d'URL
let totalScore = getParameterByName('totalScore');

// Fonction pour insérer les variables dans le HTML
function insertVariables() {
  // Sélectionnez les éléments et remplacez le contenu
  document.querySelectorAll('[data-variable="score"]').forEach(function(element) {
    element.textContent = totalScore;
});
}

// Appeler la fonction pour insérer les variables lorsque le DOM est prêt
document.addEventListener('DOMContentLoaded', insertVariables);

const nextBtn = document.getElementById('nextBtn');

nextBtn.addEventListener('click', () => {
  window.location.href = "../Credits/credits.html";
});