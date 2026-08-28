function startGame() {
  let playerName = document.getElementById("name").value;

  // Encodage du nom du joueur pour l'URL
  let encodePlayerName = encodeURIComponent(playerName);

  // Afficher le message de bienvenue
  const bvn = "[Kaya] \"Réveillez-vous Agent [agent] !\""
  const updatedbvn = bvn.replace("[agent]", playerName);
  showMessage(updatedbvn);
  // créer un bouton continuer
  var newButton = document.createElement('button');
  newButton.innerText = "Continuer";
  newButton.addEventListener('click', function() {
    window.location.href = "../Salle 1/salle1.html?playerName="+ encodePlayerName;
  });
  var form = document.getElementById('nameForm'); // Assurez-vous que le formulaire a un ID
  form.parentNode.insertBefore(newButton, form.nextSibling);
}

function showMessage(message) {
  // Créer un élément de message
  var messageElement = document.createElement('div');
  messageElement.className = 'message';
  messageElement.innerHTML = '<p>' + message + '</p>';
  // Ajouter le message à l'écran
  document.querySelector('.screen').appendChild(messageElement);
}
