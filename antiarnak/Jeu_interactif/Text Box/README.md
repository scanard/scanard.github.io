## Module de boites de dialogues textuelles développées par Rémi Renard

### Fonctionnalités :
- Ecriture de messages sur une boite de dialogue ressemblant à celle vu dans les jeux vidéos
-Possibilité d'ajouter des choix permettant d'executer une fonction au choix (Voire enchainer vers un nouveau dialogue)
- Le texte s'affiche petit à petit, et cliquer sur la page fait s'afficher le texte entier.

### Créer un dialogue

Un dialogue est un objet ayant pour attributs :
- message: une liste de chaines de caractères correspondant aux textes apparraissant à la suite dans la boite de dialogue
- choix: une liste de chaines de caractères correspondant aux choix cliquable à la fin de l'affichage du dernier message
- resultats : une liste de chaines de caractères correspondant au code exécuté lorsqu'on clique sur un choix

Exemple :

var dialogue = {
				message : ["Pierre, Feuille...","Ciseaux"],
				choix : ["Pierre", "Feuille", "Ciseaux", "J'abandonne"],
				resultats : ["textbox.ecrire_dialogue(l1,0)","textbox.ecrire_dialogue(l2,0)","textbox.ecrire_dialogue(l3,0)", "textbox.ecrire_dialogue(l4,0)"]
}

### Commandes de la boite de dialogue

- textbox.ecrire_dialogue(dialogue,i) : Ecrit successivement les messages de l'objet dialogue dans la boite, en commençant par celui à l'indice i jusqu'au dernier

- Clic sur la boite de texte :
- 1) Si un message est en cours d'écriture, affiche l'entièreté du message
- 2) Sinon, si ce n'est pas le dernier message, lance l'écriture du message suivant
- 3) Sinon, si il n'y a aucun choix, ferme la boite de texte
- 4) Sinon, ne fait rien




A faire :
- Modifier le CSS en fonction de l'avancement du projet
