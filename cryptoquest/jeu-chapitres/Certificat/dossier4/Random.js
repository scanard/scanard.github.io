const text1 = "La gymnastique rythmique est un sport très gracieux qui développe la souplesse et la coordination des jeunes enfants. Venez suivre des cours chez nous, le premier cours est gratuit. Cliquez sur le bouton ci-dessous pour obtenir plus d’informations sur le lieu d'entraînement."
const text2 = "Découvrez le meilleur moyen de transport à Paris : le RER ! Jamais en retard, jamais d'imprévus, jamais bondé ! Pour acheter des abonnements deux fois moins chers, cliquez ci-dessous !"
const text3 = "Rien de tel qu'un chaton à la maison ! Ou peut-être que si... Vous pouvez le découvrir en cliquant sur le lien ci-dessous !"
const text4 = "Zzzzzzz zzzzzz zzzzzzz zzzzzzzz zzzzzzzzz. Découvrez la meilleure expérience ASMR de votre vie, réalisée par la mouche Charlotte ! Il suffit de cliquer ci-dessous !"
const text5 = "Voulez-vous apprendre à vous défendre ? Essayez le style de boxe du perroquet ! Nous vous garantissons un niveau similaire à celui de Mike Tyson ! Le premier cours est gratuit, il vous suffit de cliquer sur le bouton ci-dessous !"
const text6 = "Rien de mieux qu'un Artishow ! Oh pardon, petite coquille, nous voulions dire artichaut ! Vente par tonne pour les plus gourmands ! Cliquez sur le bouton ci-dessous !"
const text7 = "Vous trouvez qu'il n'y a pas assez de bruit dans votre maison ? Nous avons la solution pour vous : un perroquet ! Pour en savoir plus, cliquez sur le bouton ci-dessous."



const images = ['image1.png', 'image2.png', 'image3.png', 'image4.png', 'image5.png', 'image6.png', 'image7.png'];
const texts = [text1, text2, text3, text4, text5, text6, text7];
const colors = ['#ffe2c2', '#85d68d', '#ffc2f5', '#ffff00', '#4ecdc4', '#ff6b6b', '#ffe66d'];

let index = 0;

document.getElementById('changeBtn').addEventListener('click', function() {
    index = (index + 1) % images.length;
    base = '/cryptoquest/jeu-chapitres/Certificat/dossier4/';
    document.getElementById('image-to-replace').src = base.concat(images[index]);
    document.getElementById('text-to-replace').textContent = texts[index];
    document.body.style.backgroundColor = colors[index];
});
