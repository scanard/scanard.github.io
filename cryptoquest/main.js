function updateHorloge() {
    var maintenant = new Date();
    var heures = maintenant.getHours();
    var minutes = maintenant.getMinutes();

    // Ajoute des 0 dans l'affichage
    heures = heures < 10 ? "0" + heures : heures;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    var timeString =  heures + "h" + minutes;
    document.getElementById("clock").innerHTML = timeString;
}

// Update l'horloge une fois par seconde
setInterval(updateHorloge, 1000);