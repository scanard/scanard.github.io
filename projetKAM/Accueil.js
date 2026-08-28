function startGame() {

  // Formulaire en français
  document.getElementById('Français').addEventListener('click', function() {
    // Redirection vers la salle 1 dans la version fr
    window.location.href = "Version fr/Intro/intro.html";
  });

  // Formulaire en anglais
  document.getElementById('English').addEventListener('click', function() {
    // Redirection vers la salle 1 dans la version ang
    window.location.href = "Version ang/Intro/intro.html";
  });
}
