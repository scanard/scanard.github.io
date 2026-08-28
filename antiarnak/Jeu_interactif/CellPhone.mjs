

import { Mail } from "./Mail2.mjs";
import { Contact } from "./Contact.mjs";
import { Message } from "./Message2.mjs";
import { Conversation } from "./Conversation2.mjs";
import { Quest } from "./Quest.mjs";
import { AudioConv } from "./AudioConv.mjs";

import { TextBox } from "./Text Box/TextBox.mjs";
var twoDaysAgo = "19 février 2026";
export var current_app_name = "home";
var notification_string = "_";
export function update_notification_str(new_str) {notification_string = new_str;}
var today = "21 février 2026";
var yesterday = "20 février 2026";
var caller_name="Rémi";
var contactHelene = new Contact("00000000","Hélène");
var convHelene= new Conversation(contactHelene,0,[],"tinder",true);

var audioConvBanque = new AudioConv("+33569283714","call");
var banqueClick = false;

var now = new Date();


var contactTom = new Contact("+33785236587","Tom");
var convTom;
var convRAS = {
    message: ["Rien à signaler"],
    choix : ["Ok"],
    resultats : [()=>{}]
}
var skip_intro = false;

//Messages liés à l'arnaque de l'avion
var menace = false;
var victoire = false;
var defaite = false;
var details_demandes = false;
var atteint_lien_douteux = false;

var queteHelene = new Quest("Helene","normal",[])// 

var queteTom = new Quest("colis_fils", "normal", []) 
/* 0 : Initial
   4 : Mail Amazon Naruto vu
   5 : Message envoyé au fils
   3 : Message de phishing vu avant de voir le mail Amazon
   49 : Réception du code, mais Mail Amazon non vu
   50 : Quête réussie : Réception du code
   102 : Arnaqué par un message de phishing et récupération du code
   100 : Arnaqué par un message de phishing avant d'avoir vu le mail d'Amazon
   101 : Arnaqué par un message de phishing après avoir vu le mail d'Amazon
   200 : Arnaqué par deux messages de phishing */
var queteArnaqueBancaire = new Quest("arnaqueBancaire","normal",[])
/*
0 : Initial OK
1 : Vu SNCF OK
2 : Appel lancé OK
3 : Raccroché au nez une première fois OK
50 : Pas décroché une fois OK
60 : Pas décroché 2 fois OK
4 : Mail vu OK
5 : Lien cliqué et refus OK
6 : Lien cliqué et acceptation OK
7 : Banque vue : Pas de prélèvement OK
8 : Banque vue + Lien cliqué et refus OK
9 : Banque vue + Lien cliqué et acceptation OK
10(+2 à 8) : Appel repris en état 1 à 8 OK
19(+2 à 8) : Appel racroché après la reprise (Envoyé boulé) OK
28 : Appel fini avec prélévement OK

29(+2 à 8) : Deuxième appel lancé OK
39 : Appel 2 fini avec prélévement OK
40 Appel 2 envoyé boulé/racroché OK
*/
var queteArgent = new Quest("Gagner un peu d'argent", "normal", []);
/*
0: quête non abordée
1 : Navigo vu
2 : Cheque vu
3 : Cheque refusé
4 : Navigo refusé
5 : Cheque accepté
6 : Navigo accepté
*/
var quests = [new Quest("Visite appli", "checklist", ["a","b","c","d"]), queteHelene, queteTom, queteArnaqueBancaire, queteArgent]
export var started = false;


 
//"textbox.ecrire_dialogue(l1,0)"

export function cellPhone_change_app(name)
{
    document.getElementById("cellPhone-"+current_app_name+"-page").style.display = "none";
    if(current_app_name=="tinder" || current_app_name=="SMS" || current_app_name=="whatsapp")
        document.getElementById("cellPhone-"+current_app_name+"2-conv").innerHTML = "";
    current_app_name = name;
    document.getElementById("cellPhone-"+name+"-page").style.display = "flex";
    textbox.close();

    if(quests[0].getState()==0)
    {
        quests[0].change_state(1);
        quests[0].update("Inspectez les 4 premières applications");
        queteArgent.update("Gagner un peu d'argent");
    }
}

function menu_setup()
{
    document.getElementById("cellPhone-home").addEventListener("click",()=>{if(audioConvBanque.allowed_home)
                                                                                 cellPhone_change_app('home')});
}

function AI_setup()
{
    document.getElementById("cellPhone-AI").addEventListener("click", ()=>{

        var situation = {

            message: ["Aucune IA n'a été utilisée lors de la réalisation de ce jeu"],
            choix : ["Hein, un jeu ? Bizarre cette IA.."],
            resultats : [()=>{}]
        }

        textbox.ecrire_dialogue(situation,0)

    })
}

function home_setup()
{
    var situation_firefox = {
        message : ["Firefox refuse de démarrer... Vous pouvez toujours faire des recherches sur votre ordinateur personnel."],
        choix : ["Dommage..."],
        resultats : [()=>{}]
    }
    document.getElementById("cellPhone-app-icon-firefox").addEventListener("click",()=>{textbox.ecrire_dialogue(situation_firefox,0)});
    document.getElementById("cellPhone-app-icon-SMS").addEventListener("click",()=>{cellPhone_change_app('SMS1'); quests[0].add_check("a");});
    document.getElementById("cellPhone-app-icon-tinder").addEventListener("click",()=>{cellPhone_change_app('tinder1'); quests[0].add_check("b");});
    document.getElementById("cellPhone-app-icon-mails").addEventListener("click",()=>{cellPhone_change_app('mails1'); quests[0].add_check("c");});
    document.getElementById("cellPhone-app-icon-fichier").addEventListener("click",()=>{textbox.ecrire_dialogue(convRAS,0)});

    var situation_lemonde = {
        message : ["Vous lisez des articles inspirants qui vous remotivent après votre journée de travail intense"],
        choix : ["Merci la LH !"],
        resultats : [()=>{}]
    }

    document.getElementById("cellPhone-app-icon-lemonde").addEventListener("click",()=>{textbox.ecrire_dialogue(situation_lemonde,0)});
    
    var situation_prime = {
        message : ["Gaspard Guillemaut ne possède pas de compte Prime Video"],
        choix : ["Zut..."],
        resultats : [()=>{}]
    }
    document.getElementById("cellPhone-app-icon-primevideo").addEventListener("click",()=>{textbox.ecrire_dialogue(situation_prime,0)});
    document.getElementById("cellPhone-app-icon-appel").addEventListener("click",()=>{cellPhone_change_app('appel1')});
    document.getElementById("cellPhone-app-icon-BNPparibas").addEventListener("click",()=>{show_bank(); if (!banqueClick){audioConvBanque.addChoiceSituation("situation2","J'ai regardé mes comptes et aucune trace d'un quelconque prélèvement ou d'une quelconque demande. C'est étrange...",3,"situation3"); banqueClick = true}});
    document.getElementById("cellPhone-app-icon-whatsapp").addEventListener("click",()=>{cellPhone_change_app('whatsapp1')});
    document.getElementById("cellPhone-app-icon-infos").addEventListener("click",()=>{cellPhone_change_app('infos1'); quests[0].add_check("d");});

    // listener for notifications
    document.getElementById("cellPhone-notification").addEventListener("click",()=>{
        if(notification_string != "_") {
            cellPhone_change_app(notification_string);
        } else {
            console.log("cannot click on that !");
        }
    });

}

function back_arrow_setup()
{
    document.getElementById("cellPhone-SMS2-back").addEventListener("click",()=>{cellPhone_change_app("SMS1");
        document.getElementById("cellPhone-SMS2-conv").innerHTML = "";
    });
    document.getElementById("cellPhone-whatsapp2-back").addEventListener("click",()=>{cellPhone_change_app("whatsapp1");
        document.getElementById("cellPhone-whatsapp2-conv").innerHTML = "";
    });
    document.getElementById("cellPhone-tinder2-back").addEventListener("click",()=>{cellPhone_change_app("tinder1");
        document.getElementById("cellPhone-tinder2-conv").innerHTML = "";
    });
    document.getElementById("cellPhone-mails-arrow").addEventListener("click",()=>{cellPhone_change_app("mails1")});

    document.getElementById("cellPhone-back").addEventListener("click", () =>{
        if(current_app_name[current_app_name.length-1]=='2' && audioConvBanque.allowed_home)
        {
            cellPhone_change_app(current_app_name.replace("2","1"));
        }
    })
}

function quests_setup()
{
    for(var i=0; i< quests.length;i++)
    {
        quests[i].setup();
    }
}


function show_bank()
{
    var texte = "Votre solde actuel est de 867€. Dernier prélèvement : 347.31€ par CROUS VERSAILLE";

    if(queteArnaqueBancaire.getState()==28 || queteArnaqueBancaire.getState()==39)
    {
        texte = "Votre solte actuel est de 67€. Dernier prélèvement : 800€ par +33569283714";
    }
    var situation = {
        message: [texte],
        choix: ["Ok"],
        resultats : [() => {}]
    }

    textbox.ecrire_dialogue(situation,0);
}







function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms))
}

async function initialisation()
{
    var mail9 = new Mail("Amazon France","confirmation-commmande@amazon.fr","10:23","Confirmation de commande pour 1 item","Cher client,\nMerci pour votre commande. Nous vous tiendrons informé par SMS lorsque les articles de votre commande seront expédiés. Vous pouvez suivre l'état de votre commande ou modifier celle-ci sur l'application Amazon.\nDétails de la commande\nNaruto Shipudden - Action Figure EUR 31\n\nSous total des articles : EUR 31\nFrais d'envoi : EUR 0\nTotal HT : EUR 27\nTVA : EUR 4\nMontant total de la commande: EUR 31","mail-amazon-naruto")
    var mail2 = new Mail("BNP Paribas", "notification-client.bnp@notificationsclients.bnpparibas.com",twoDaysAgo,"Un paiement mérite votre attention","Monsieur Gaspard Guillemaut\nXX.XX.XX.0.66\nXX XXXXXXXXX - 91477 - PALAISEAU\nBonjour,\n\nUn paiement d'un montant de 347,31EUR a été effectué chez CROUS VERSAILLES CEDEX 78005.\nSi vous n'êtes pas à l'origine de l'opération, mettez votre carte en opposition depuis votre Espace Client.\n\nSi vous êtes à l'origine de cette opération, merci de ne pas tenir compte de ce message.\nBNP Paribas"); 
    var mailBankScam =  new Mail("SNCF", "no-reply@sncf-comm.fr","9:47","Incident de sécurité","Bonjour,\n Cette nuit, la SNCF a été victime d'une attaque numérique.\n Cet incident a entraîné une fuite de données personnelles des comptes de nos abonnés : \n -informations relatives à votre identité \n -identifiants de connexion (compte,mail...) \n -coordonnées bancaires \n Des enquêtes sont en cours pour essayer de déterminer l'auteur des faits et la gravité des informations compromises.\n Nous vous recommandons de rester attentif à toute activité suspecte sur votre compte SNCF et bancaire.\n Nous vous assurons faire de notre mieux pour qu'un tel incident ne se reproduise pas à l'avenir, \n Cordialement, \n la SCNF. ","mailArnaqueBancaire"); //Envoie d'un mail avec une entreprise connue qui s'est fait hacker

    mailBankScam.send();
    mail2.send();
    

    menu_setup();
    home_setup();
    back_arrow_setup();
    quests_setup();
    other_message_setup();
    end_game_setup();
    AI_setup();



    

    //initialisation textbox
    textbox = new TextBox();
    textbox.init();
    

    romance_setup();
    dialogue_Tom_setup();
    colis_setup();
    info_setup();
    voicemail_setup();
    if(!skip_intro)
    {
        intro_setup();
    }


    started = true;

}

initialisation();



/*
function dialogue_setup_template()
{
    //Liste des messages initiaux : Le deuxième argument vaut 1 si le message provient du contact, et 2 si il provient de l'utilisateur
    var message_list = [new Message(contact,1,"21 février 2026","13:12","Coucouuuuu"),
                        new Message(contact,1,"21 février 2026","13:13","Je rentre bientôt...")
    ];
    
    var conv = new Conversation(contact,0,message_list,app);
    conv.send();

    //Liste des choix de l'étape 1
    var choix11 = new Message(contact,2,"21 février 2026", "13:15","Ooooooh trop cool j'ai trop hâte de te voir !");
    var choixReduit11 = "Oooooh trop cool" // Envoie sur étape 2
    var resultat11 = new Message(contact,1,"21 février 2026","13:15","Par contre j'ai un soucis : Ma carte est bloquée à cause de ___, donc je ne peux pas payer le billet d'avion...");
    var choix12 = new Message(contact,2,"21 février 2026", "13:15","Tu rentres quand ?");
    var choixReduit12 = "Tu rentres quand ?" // Envoie sur étape 3
    var resultat12 = new Message(contact,1,"21 février 2026","13:15","_____");

    //Etape 2
    var choix21 = new Message(contact,2,"21 février 2026", "13:15","Oh non... Si tu veux je peux payer pour toi !");
    var choixReduit21 = "Je peux payer pour toi !"
    var resultat21 = new Message(contact,1,"21 février 2026","13:15","Ohhh merci tu es adorable ! Voici le lien pour le paiement : https//arnaque.fr");
    var choix22 = new Message(contact,2,"21 février 2026", "13:15","Mince, tu as pensé à contacter ta banque ??");
    var choixReduit22 = "Tu as contacté ta banque ?"
    var resultat22 = new Message(contact,1,"21 février 2026","13:15","Oui, et ils disent que mon compte ne pourra pas être débloqué avant un mois... Tu pourrais payer pour moi ?");
    var choix23 = new Message(contact,2,"21 février 2026", "13:15","Il fallait faire attention aussi...");
    var choixReduit23 = "Fallait faire gaffe !"
    var resultat23 = new Message(contact,1,"21 février 2026","13:15","Bah c'est vraiment pas ma faute pour le coup... Est ce que tu pourais payer le billet pour moi s'il te plait ?");

    //Incorporation dans le code : Attention, déclarer les étapes dans l'ordre inverse
    var reponses2 = {
        message: ["Répondre..."],
        choix: [choixReduit21, choixReduit22, choixReduit23],
        resultats: [()=>{
            conv.addNewMessage(choix21);
            conv.addNewMessage(resultat21);
            conv.changeAnswerChoices(reponses1);}, 
            ()=>{
            conv.addNewMessage(choix22);
            conv.addNewMessage(resultat22);
            conv.changeAnswerChoices(reponses1);},
            ()=>{
                conv.addNewMessage(choix23);
                conv.addNewMessage(resultat23);
                conv.changeAnswerChoices(reponses1);}
        ]
    }

    var reponses1 = {
        message: ["Répondre..."],
        choix: [choixReduit11, choixReduit12],
        resultats: [()=>{
            conv.addNewMessage(choix11);
            conv.addNewMessage(resultat11);
            conv.changeAnswerChoices(reponses2);
            intro_setup();
            }, 
            ()=>{
            conv.addNewMessage(choix12);
            conv.addNewMessage(resultat12);
            conv.changeAnswerChoices(reponses3);}]
    }
    //Etape initiale
    conv.changeAnswerChoices(reponses1);
    
}*/



function romance_setup() {
    var contact = new Contact("00000000","Hélène");
    var app = "tinder";
    //Liste des messages initiaux : Le deuxième argument vaut 1 si le message provient du contact, et 2 si il provient de l'utilisateur
    var message_list = [new Message(contact,1,"14 février 2026","11:12","Tu as reçu les roses que je t'ai fait livrer à ton appartement ?"),
                        new Message(contact,2,"14 février 2026","11:12","Oui merci Hélène c'est adorable ça me touche vraiment."),
                        new Message(contact,1,"20 février 2026","11:13","Au fait ma mission humanitaire en Afrique du Sud va bientôt s'achever je vais revenir en France on va enfin pouvoir se rencontrer !"),
                        new Message(contact,2,"20 février 2026","11:13","Trop bien j'ai tellement hâte !"),
                        new Message(contact,1,"21 février 2026", "13:07","Tu as vu le mail de la SNCF ? Elle s'est fait hacker !")
    ];

    
    for(var i=0; i<message_list.length; i++)
        convHelene.addNewMessage(message_list[i]);
    convHelene.send();



    //quête liée à l'arnaque bancaire
    queteArnaqueBancaire.setup()
    document.getElementById("mailArnaqueBancaire").addEventListener("click", ()=>{ queteArnaqueBancaire.change_state(1); queteArnaqueBancaire.update(""); convHelene.removeChoicesSituation("situation0");
        convHelene.addChoiceSituation("situation0",chred111,[choixBank111,resul1],"situation1");
    })

    

    //Messages liés à l'arnaque bancaire
    var choixBank11 = new Message(contact,2,"21 février 2026", "13:09","Euh non j'ai pas encore checké mes mails, je vais voir et je te redis." );
    var chred11 = "Aller vérifier ses mails" 
    var choixBank111 = new Message(contact,2,"21 février 2026", "13:13","Oui effectivement, j'ai bien reçu le mail..." ); //ACTIVATION QUE QUAND QUETE AVANCEE
    var chred111 =  "Oui effectivement"
    var resul1 = new Message(contact,1,"21 février 2026","13:13","J'ai un peu peur..." );

    var situation0 = {
        message : ["Répondre..."],
        choix : [chred11],
        resultats: [
            ()=>{ 
                convHelene.addNewMessage(choixBank11)
                convHelene.removeChoicesSituation("situation0")
                queteArnaqueBancaire.update("Vérifier vos mails et voyez si vous aussi vous avez reçu un mail vous informant de l'arnaque")
                convHelene.changeAnswerChoicesTab("situation0")
            }
        ]
    }
    convHelene.addChoice(situation0)


    var choixBank2 = new Message(contact,2,"21 février 2026", "13:14","Ne t'inquiète pas il faut juste rester vigilant les prochains jours !" );
    var chred2 = "La rassurer";
    var situation1 = {
        message : ["Répondre..."],
        choix : [chred2],
        resultats : [
            ()=>{
                convHelene.addNewMessage(choixBank2);
                convHelene.changeAnswerChoicesTab("situation2")
                bank_scam();
            }
        ]
    }
    convHelene.addChoice(situation1);
    

    //Les situations seront modifiées avec l'appel
    var situation2 = {
        message : ["Répondre..."],
        choix : [],
        resultats : []
    }
    convHelene.addChoice(situation2)

    var situation3 = {
        message : ["Répondre..."],
        choix : [], //chred41 si 40 && 42 si 28/39
        resultats : [] //41 + resul41 si 40  
        // 42+resul42 si 28/39 + situation 4 pour chred421/chred422 si 421 -> resul41 et 412 ou 413 => resul4
    }
    convHelene.addChoice(situation3)

    var situation4 = {
        message : ["Répondre..."],
        choix : [], //chred411/chred 412 si 40 
        resultats : [] //
    }
    convHelene.addChoice(situation4);

     var situation5 = {
        message : ["Répondre..."],
        choix : [],
        resultats : [] 
    }
    convHelene.addChoice(situation5);
    
    var choixA = new Message(contact,2,"21 février 2026", "13:25", "Si tu veux, je peux payer pour toi");
    var chredA = "Pas de problème"
    var resulA = new Message(contact,1,"21 février 2026", "13:25", "Super, merci beaucoup !!");

    var choixAA = new Message(contact,2,"21 février 2026", "13:32", "T'inquiète, aucun problème à ce que je t'avance");
    var chredAA = "Pas de soucis"
    var resulAA = new Message(contact,1,"21 février 2026", "13:32", "Tu me sauves merci beaucoup <3");

    var choixAAA = new Message(contact,2,"21 février 2026", "13:37", "Voyons c'est normal ;)");
    var chredAAA = "Voyons c'est normal";
    var resulAAA = new Message(contact,1,"21 février 2026", "13:37", "(Lien vers un site de paiement)");

    var choixAAAA = new Message(contact,2,"21 février 2026", "13:38", "*Clique sur le lien*");
    var chredAAAA = "Cliquer";
    var resulAAAA = new Message(contact,1,"21 avril 2026", "13:38", "Voilà, plus qu'à remplir les informations demandées et valider la transaction, tu es vraiment un amour!");
    
    var chredAAAAA = "Finaliser la transaction"
    var choixAAAAA = new Message(contact,2,"21 avril 2026", "13:41", "*Envoie l'argent*");
    var resulAAAAA = new Message(contact,1,"21 avril 2026", "13:41", "Merci mon ange!");

    var chredAAAAB = "Sortir du site et refuser de payer"
    var choixAAAAB = new Message(contact,2,"21 avril 2026", "13:41", "Ca me parait trop louche je ne paye pas là dessus");

    var choixAAAB = new Message(contact,2,"21 février 2026", "13:38", "Quel est ce site ?");
    var chredAAAB = "C'est quoi ?";
    var resulAAAB = new Message(contact,1,"21 février 2026", "13:38", "C'est un site pour transférer directement de l'argent à ses proches");
    
    var choixAAABA = new Message(contact,2,"21 février 2026", "13:39", "*Clique sur le lien*");
    var chredAAABA = "Cliquer";
    //var resulAAABA = resulAAAA;
    
    var choixAAABB = new Message(contact,2,"21 février 2026", "13:39", "Tu veux pas utiliser PayPal ?");
    var chredAAABB = "Paypal ?";
    var resulAAABB = new Message(contact,1,"21 février 2026", "13:39", "Je n'ai pas de compte Paypal");
    
    var choixAAABBA = new Message(contact,2,"21 février 2026", "13:40", "*Clique sur le lien*");
    var chredAAABBA = "Cliquer";
    //var resulAAABBA = resulAAAA;
    
    var choixAAABBB = new Message(contact,2,"21 février 2026", "13:40", "Je clique pas sur un lien comme celui-là ça me parait trop louche");
    var chredAAABBB = "Refuser";
    //var resulAAABBB = resulD;
    
    var choixAB = new Message(contact,2,"21 février 2026", "13:32", "C'est bien parce que c'est toi...");
    var chredAB = "Bien parce que c'est toi";
    var resulAB = new Message(contact,1,"21 février 2026", "13:32", "Qu'est ce que tu sous-entends par là ??");
    
    var choixABA = new Message(contact,2,"21 février 2026", "13:33", "Tu aurais du faire gaffe");
    var chredABA = "Tu aurais du faire gaffe";
    var resulABA = new Message(contact,1,"21 février 2026", "13:33", "Je sais... mais là c'est un peu urgent");
    
    var choixABAA = new Message(contact,2,"21 février 2026", "13:34", "On en reparelra.");
    var chredABAA = "On en reparlera";
    var resulABAA = new Message(contact,1,"21 février 2026", "13:34", "Donc tu voudrais bien m'avancer ?");

    var choixABAAA = new Message(contact,2,"21 février 2026", "13:35", "Oui.");
    var chredABAAA = "Oui";
    //var resulABAAA = resulA;

    var choixABAAB = new Message(contact,2,"21 février 2026", "13:35", "Non");
    var chredABAAB = "Non";
    //var resulABAAB = resulD;
    
    var choixABAB = new Message(contact,2,"21 février 2026", "13:34", "Soit");
    var chredABAB = "Soit";
    //var resulABAB = resulABAA;
    
    var choixABB = new Message(contact,2,"21 février 2026", "13:33", "Non, rien");
    var chredABB = "Rien";
    var resulABB = new Message(contact,1,"21 février 2026", "13:33", "Du coup tu voudrais bien m'avancer ?");
    
    var choixABBA = new Message(contact,2,"21 février 2026", "13:34", "Oui");
    var chredABBA = "Oui";
    //var resulABBA = resulA;
    
    var choixABBB = new Message(contact,2,"21 février 2026", "13:34", "Non");
    var chredABBB = "Non";
    var resulABBB = new Message(contact,1,"21 février 2026", "13:34", "Allez, s'il te plaît...");
    
    var choixABBBA = new Message(contact,2,"21 février 2026", "13:35", "Allez");
    var chredABBBA = "D'accord";
    //var resulABBBA = resulA;
    
    var choixABBBB = new Message(contact,2,"21 février 2026", "13:35", "Non");
    var chredABBBB = "Non";
    //var resulABBBB = resulD;
    
    var choixB = new Message(contact,2,"21 février 2026", "13:25", "Tu as essayé de contacter ta banque ?");
    var chredB = "Tu as contacté la banque ?";
    var resulB = new Message(contact,1,"21 février 2026", "13:25", "Oui mais ils ne veulent pas me débloquer mon compte par téléphone");
    
    var choixBA = new Message(contact,2,"21 février 2026", "13:27", "Et tu ne peux pas aller les voir physiquement?");
    var chredBA = "Tu ne peux pas aller les voir?";
    var resulBA = new Message(contact,1,"21 février 2026", "13:27", "Malheureusement la banque n'a pas d'agence en Afrique du Sud.\nJe serais ravie si tu m'avançais pour cette fois");
    
    var choixBAA= new Message(contact,2,"21 février 2026", "13:28", "Bon, d'accord");
    var chredBAA = "OK";
    //var resulBAA = resulA;
    
    var choixBAB = new Message(contact,2,"21 février 2026", "13:28", "Je peux contacter la banque si tu veux");
    var chredBAB = "Je peux contacter la banque";
    var resulBAB = new Message(contact,1,"21 février 2026", "13:28", "Les démarches prennent trop de temps, et j'ai besoin de rentrer au plus vite");
    
    var choixBAC = new Message(contact,2,"21 février 2026", "13:28", "Non");
    var chredBAC = "Non";
    //var resulBAC = resulD;
    
    var choixBABA = new Message(contact,2,"21 février 2026", "13:29", "Bon, d'accord");
    var chredBABA = "OK";
    //var resulBABA = resulA;
    
    var choixBABB = new Message(contact,2,"21 février 2026", "13:29", "Je ne sais pas si t'envoyer directement de l'argent est faisable...");
    var chredBABB = "Je ne sais pas...";
    var resulBABB = new Message(contact,1,"21 février 2026", "13:29", "Allez... J'ai vraiment besoin de rentrer");
    
    var choixBABC = new Message(contact,2,"21 février 2026", "13:29", "Tant pis.");
    var chredBABC = "Tant pis";
    //var resulBABC = resulD;
    
    var choixBABBA = new Message(contact,2,"21 février 2026", "13:30", "Bon, d'accord");
    var chredBABBA = "OK";
    //var resulBABBA = resulA;
    
    var choixBABBB = new Message(contact,2,"21 février 2026", "13:30", "Je verrai avec la banque. Je ne peux pas faire autrement");
    var chredBABBB = "Je verrai avec la banque";
    var resulBABBB = new Message(contact,1,"21 février 2026", "13:30", "Ca me stresse trop j'ai pas envie de rester bloqué ici, allez !!");
    
    var choixBABBC = new Message(contact,2,"21 février 2026", "13:30", "Débrouille-toi.");
    var chredBABBC = "Débrouille-toi";
    var resulBABBC = new Message(contact,1,"21 février 2026", "13:30", "T'es sérieux ?!?");
    
    var choixBABBBA = new Message(contact,2,"21 février 2026", "13:31", "Bon, OK.");
    var chredBABBBA = "Bon, OK.";
    //var resulBABBBA = resulA;
    
    var choixBABBBB = new Message(contact,2,"21 février 2026", "13:31", "T'es insistante.");
    var chredBABBBB = "Non";
    //var resulBABBBB = resulD;
    
    var choixBABBCA = new Message(contact,2,"21 février 2026", "13:31", "Oui");
    var chredBABBCA = "Oui";
    //var resulBABBCA = resulD;
    
    var choixBABBCB = new Message(contact,2,"21 février 2026", "13:31", "Non, je plaisante !");
    var chredBABBCB = "Non c'est une blague";
    //var resulBABBCA = resulBABB;
    
    var choixC = new Message(contact,2,"21 février 2026", "13:25", "Fallait faire gaffe");
    var chredC = "Fallait faire gaffe";
    var resulC = new Message(contact,1,"21 février 2026", "13:25", "La mission humanitaire est tellemement prenante, c'est incroyable et très enrichissant humainement mais épuisant, ça me fait faire des erreurs comme là. Mais c'est pour ça que je pense qu'il est temps pour moi d'arrêter et de revenir en France, j'ai vraiment envie de te rencontrer en vrai!");
    // pointe vers A B D
    
    var choixD = new Message(contact,2,"21 février 2026", "13:25", "Quel dommage");
    var chredD = "Non";
    var resulD = new Message(contact,1,"21 février 2026", "13:25", "Haha très drôle. Non en vrai ça me pèse vraiment je sais que tu vas m'aider sur ce coup là.");
    
    var choixDA = new Message(contact,2,"21 février 2026", "13:36", "Bon... ok pour cette fois");
    var chredDA = "Ok pour cette fois";
    //var resulDA = resulA;
    
    var choixDB = new Message(contact,2,"21 février 2026", "13:36", "...");
    var chredDB = "...";
    var resulDB = new Message(contact,1,"21 février 2026", "13:36", "Je pensais vraiment que tout ces moments passés ensemble à s'envoyer des messages comptaient pour quelque chose, je traverse une période difficile et tu es la dernière personne sur qui je peux compter... Voir tout ça gâché pour des questions de transport me fait tant de peine... Tu es sûr que tu ne veux pas m'avancer pour cette fois? Il suffit que tu cliques sur ce lien et que tu payes là dessus ce qu'il faut pour mon retour.");

    var choixDBA = new Message(contact,2,"21 février 2026", "13:42", "Désolé j'ai été bête je ne me suis pas rendu compte que ça te pesais autant je vais t'aider bien sûr!");
    var chredDBA = "Cliquer sur le lien et payer";
    //var resulDBA = resulA;

    var choixDBB = new Message(contact,2,"21 février 2026", "13:42", "Ca me parait trop louche je ne paierais pas");
    var chredDBB = "Je ne donnerai rien";
    var resulDBB = new Message(contact,1,"21 février 2026", "13:42", "Je ne voulais pas en arriver là mais tu ne me laisses pas le choix, j'ai beaucoup d'informations compromettantes sur toi je connais ton adresse. Tu as jusqu'à demain midi pour payer par ce lien sinon j'envoie tout à tes proches on verra comment ils vont réagir en découvrant tes sombres secrets. Ton fils voudra t-il même revenir te voir après ça?");

    var chredDBBA = "Envoyer l'argent"
    var choixDBBA = new Message(contact,2,"21 février 2026", "13:44", "Je vais envoyer l'argent")
    var resulDBBA = new Message(contact,1,"21 février 2026", "13:44","Et voilà c'était pas compliqué :)");

    var chredDBBB = "Ne pas répondre et appeler la police"
    var resulDBBB = new Message(contact,1,"22 février 2026", "12:44","Tu l'auras voulu")

    var situation6 = {
        message : ["Répondre..."],
        choix : [chredA, chredB, chredC, chredD],
        resultats: [
            ()=>{
                convHelene.addNewMessage(choixA);
                convHelene.addNewMessage(resulA);
                convHelene.changeAnswerChoicesTab("situation7");
            },()=>{
                convHelene.addNewMessage(choixB);
                convHelene.addNewMessage(resulB);
                convHelene.changeAnswerChoicesTab("situation18");
            },()=>{
                convHelene.addNewMessage(choixC);
                convHelene.addNewMessage(resulC);
                convHelene.changeAnswerChoicesTab("situation24");
            },()=>{
                convHelene.addNewMessage(choixD);
                convHelene.addNewMessage(resulD);
                convHelene.changeAnswerChoicesTab("situation25");
            }
        ]
    }
    convHelene.addChoice(situation6)

    var situation7 = {
        message : ["Répondre..."],
        choix : [chredAA, chredAB],
        resultats : [
            ()=>{
                convHelene.addNewMessage(choixAA);
                convHelene.addNewMessage(resulAA);
                convHelene.changeAnswerChoicesTab("situation8");
            },()=>{
                convHelene.addNewMessage(choixAB);
                convHelene.addNewMessage(resulAB);
                convHelene.changeAnswerChoicesTab("situation13");
            }
        ]
    }
    convHelene.addChoice(situation7);
    

    var situation8 = {
        message : ["Répondre..."],
        choix : [chredAAA],
        resultats : [
            ()=>{
                convHelene.addNewMessage(choixAAA);
                convHelene.addNewMessage(resulAAA);
                atteint_lien_douteux = true;
                convHelene.changeAnswerChoicesTab("situation9");
            }
        ]
    }
    convHelene.addChoice(situation8);

    var situation9 = {
        message : ["Répondre..."],
        choix : [chredAAAA, chredAAAB],
        resultats : [
            ()=>{
                convHelene.addNewMessage(choixAAAA);
                convHelene.addNewMessage(resulAAAA);
                convHelene.changeAnswerChoicesTab("situation29");
            },()=>{
                convHelene.addNewMessage(choixAAAB);
                convHelene.addNewMessage(resulAAAB);
                convHelene.changeAnswerChoicesTab("situation11");
            }
        ]
    }
    convHelene.addChoice(situation9);

    var situation10 = {
        message : ["Perdu ! Vous envoyez l'argent pensant que ça allait résoudre tout les problèmes mais Hélène en demande toujours plus en invoquant les même raisons. Trop investi vous multipliez les envois d'argent mais à chaque nouvel envoi votre compte se vide de plus en plus et avec lui votre espoir que tout ceci serve à quelque chose. Vous finissez ruiné, et honteux envers vous même."],
        choix : [],
        resultats : [
            
        ]
    }
    convHelene.addChoice(situation10);

    var situation11 = {
        message : ["Répondre..."],
        choix : [chredAAABA, chredAAABB],
        resultats : [
            ()=>{
                convHelene.addNewMessage(choixAAABA);
                convHelene.addNewMessage(resulAAAA);
                convHelene.changeAnswerChoicesTab("situation29");
            },()=>{
                convHelene.addNewMessage(choixAAABB);
                convHelene.addNewMessage(resulAAABB);
                convHelene.changeAnswerChoicesTab("situation12");
            }
        ]
    }
    convHelene.addChoice(situation11);

    var situation12 = {
        message : ["Répondre..."],
        choix : [chredAAABBA, chredAAABBB],
        resultats : [
            ()=>{
                convHelene.addNewMessage(choixAAABBA);
                convHelene.addNewMessage(resulAAAA);
                convHelene.changeAnswerChoicesTab("situation29");
            },()=>{
                convHelene.addNewMessage(choixAAABBB);
                convHelene.addNewMessage(resulDB);
                convHelene.changeAnswerChoicesTab("situation27");
            }
        ]
    }
    convHelene.addChoice(situation12);

    var situation13 = {
        message : ["Répondre..."],
        choix : [chredABA, chredABB],
        resultats : [
            ()=>{
                convHelene.addNewMessage(choixABA);
                convHelene.addNewMessage(resulABA);
                convHelene.changeAnswerChoicesTab("situation14");
            },()=>{
                convHelene.addNewMessage(choixABB);
                convHelene.addNewMessage(resulABB);
                convHelene.changeAnswerChoicesTab("situation16");
            }
        ]
    }
    convHelene.addChoice(situation13);

    var situation14 = {
        message : ["Répondre..."],
        choix : [chredABAA, chredABAB],
        resultats : [
            ()=>{
                convHelene.addNewMessage(choixABAA);
                convHelene.addNewMessage(resulABAA);
                convHelene.changeAnswerChoicesTab("situation15");
            },()=>{
                convHelene.addNewMessage(choixABAB);
                convHelene.addNewMessage(resulABAA);
                convHelene.changeAnswerChoicesTab("situation15");
            }
        ]
    }
    convHelene.addChoice(situation14);

    var situation15 = {
        message : ["Répondre..."],
        choix : [chredABAAA, chredABAAB],
        resultats : [
            ()=>{
                convHelene.addNewMessage(choixABAAA);
                convHelene.addNewMessage(resulAA);
                convHelene.changeAnswerChoicesTab("situation8");
            },()=>{
                convHelene.addNewMessage(choixABAAB);
                convHelene.addNewMessage(resulD);
                convHelene.changeAnswerChoicesTab("situation25");
            }
        ]
    }
    convHelene.addChoice(situation15);

    var situation16 = {
        message : ["Répondre..."],
        choix : [chredABBA, chredABBB],
        resultats : [
            ()=>{
                convHelene.addNewMessage(choixABBA);
                convHelene.addNewMessage(resulAA);
                convHelene.changeAnswerChoicesTab("situation8");
            },()=>{
                convHelene.addNewMessage(choixABBB);
                convHelene.addNewMessage(resulABBB);
                convHelene.changeAnswerChoicesTab("situation17");
            }
        ]
    }
    convHelene.addChoice(situation16);

    var situation17 = {
        message : ["Répondre..."],
        choix : [chredABBBA, chredABBBB],
        resultats : [
            ()=>{
                convHelene.addNewMessage(choixABBBA);
                convHelene.addNewMessage(resulAA);
                convHelene.changeAnswerChoicesTab("situation8");
            },()=>{
                convHelene.addNewMessage(choixABBBB);
                convHelene.addNewMessage(resulD);
                convHelene.changeAnswerChoicesTab("situation25");
            }
        ]
    }
    convHelene.addChoice(situation17);

    var situation18 = {
        message : ["Répondre..."],
        choix : [chredBA],
        resultats : [
            ()=>{
                convHelene.addNewMessage(choixBA);
                convHelene.addNewMessage(resulBA);
                convHelene.changeAnswerChoicesTab("situation19");
            }
        ]
    }
    convHelene.addChoice(situation18);

    var situation19 = {
        message : ["Répondre..."],
        choix : [chredBAA, chredBAB, chredBAC],
        resultats : [
            ()=>{
                convHelene.addNewMessage(choixBAA);
                convHelene.addNewMessage(resulA);
                convHelene.changeAnswerChoicesTab("situation7");
            },()=>{
                convHelene.addNewMessage(choixBAB);
                convHelene.addNewMessage(resulBAB);
                convHelene.changeAnswerChoicesTab("situation20");
            },()=>{
                convHelene.addNewMessage(choixBAC);
                convHelene.addNewMessage(resulD);
                convHelene.changeAnswerChoicesTab("situation25");
            }
        ]
    }
    convHelene.addChoice(situation19);

    var situation20 = {
        message : ["Répondre..."],
        choix : [chredBABA, chredBABB, chredBABC],
        resultats : [
            ()=>{
                convHelene.addNewMessage(choixBABA);
                convHelene.addNewMessage(resulA);
                convHelene.changeAnswerChoicesTab("situation7");
            },()=>{
                convHelene.addNewMessage(choixBABB);
                convHelene.addNewMessage(resulBABB);
                convHelene.changeAnswerChoicesTab("situation21");
            },()=>{
                convHelene.addNewMessage(choixBABC);
                convHelene.addNewMessage(resulD);
                convHelene.changeAnswerChoicesTab("situation25");
            }
        ]
    }
    convHelene.addChoice(situation20);

    var situation21 = {
        message : ["Répondre..."],
        choix : [chredBABBA, chredBABBB, chredBABBC],
        resultats : [
            ()=>{
                convHelene.addNewMessage(choixBABBA);
                convHelene.addNewMessage(resulA);
                convHelene.changeAnswerChoicesTab("situation7");
            },()=>{
                convHelene.addNewMessage(choixBABBB);
                convHelene.addNewMessage(resulBABBB);
                details_demandes = true;
                convHelene.changeAnswerChoicesTab("situation22");
            },()=>{
                convHelene.addNewMessage(choixBABBC);
                convHelene.addNewMessage(resulBABBC);
                convHelene.changeAnswerChoicesTab("situation23");
            }
        ]
    }
    convHelene.addChoice(situation21);

    var situation22 = {
        message : ["Répondre..."],
        choix : [chredBABBBA, chredBABBBB],
        resultats : [
            ()=>{
                convHelene.addNewMessage(choixBABBBA);
                convHelene.addNewMessage(resulA);
                convHelene.changeAnswerChoicesTab("situation7");
            },()=>{
                convHelene.addNewMessage(choixBABBBB);
                convHelene.addNewMessage(resulD);
                convHelene.changeAnswerChoicesTab("situation25");
            }
        ]
    }
    convHelene.addChoice(situation22);

    var situation23 = {
        message : ["Répondre..."],
        choix : [chredBABBCA, chredBABBCB],
        resultats : [
            ()=>{
                convHelene.addNewMessage(choixBABBBA);
                convHelene.addNewMessage(resulA);
                convHelene.changeAnswerChoicesTab("situation7");
            },()=>{
                convHelene.addNewMessage(choixBABBBB);
                convHelene.addNewMessage(resulD);
                convHelene.changeAnswerChoicesTab("situation25");
            }
        ]
    }
    convHelene.addChoice(situation23);

    var situation24 = {
        message : ["Répondre..."],
        choix : [chredA, chredB, chredD],
        resultats : [
            ()=>{
                convHelene.addNewMessage(choixA);
                convHelene.addNewMessage(resulA);
                convHelene.changeAnswerChoicesTab("situation7");
            },()=>{
                convHelene.addNewMessage(choixB);
                convHelene.addNewMessage(resulB);
                convHelene.changeAnswerChoicesTab("situation18");
            },()=>{
                convHelene.addNewMessage(choixD);
                convHelene.addNewMessage(resulD);
                convHelene.changeAnswerChoicesTab("situation25");
            }
        ]
    }
    convHelene.addChoice(situation24);

    var situation25 = {
        message : ["Répondre..."],
        choix : [chredDA, chredDB],
        resultats : [
            ()=>{
                convHelene.addNewMessage(choixDA);
                convHelene.addNewMessage(resulA);
                convHelene.changeAnswerChoicesTab("situation8");
            },()=>{
                convHelene.addNewMessage(choixDB);
                convHelene.addNewMessage(resulDB);
                convHelene.changeAnswerChoicesTab("situation27");
            }
        ]
    }
    convHelene.addChoice(situation25);

    var situation26 = {
        message : ["Gagné ! Malgré les menaces vous tenez bon et écoutez les conseils de la police qui vous recommande de ne rien faire. Selon eux, ces menaces ne seront pas mises à execution et vous vous rendez compte dans les semaines qui viennent qu'ils avaient raison. Vous prenez du temps mais finissez par vous remettre de cette trahison."],
        choix : [],
        resultats : [
            
        ]
    }
    convHelene.addChoice(situation26);
    var situation27 = {
        message : ["Que faire?"],
        choix : [chredDBA, chredDBB],
        resultats : [
            ()=>{
                convHelene.addNewMessage(choixDBA);
                convHelene.addNewMessage(resulA);
                defaite = true;
                convHelene.changeAnswerChoicesTab("situation10");
            },()=>{
                convHelene.addNewMessage(choixDBB);
                convHelene.addNewMessage(resulDBB);
                menace = true;
                convHelene.changeAnswerChoicesTab("situation28");
            }
        ]
    }
    convHelene.addChoice(situation27);
    var situation28 = {
        message : ["Que faire?"],
        choix : [chredDBBA, chredDBBB],
        resultats : [
            ()=>{
                convHelene.addNewMessage(choixDBBA);
                convHelene.addNewMessage(resulDBBA);
                defaite = true;
                convHelene.changeAnswerChoicesTab("situation10");
            },()=>{
                convHelene.addNewMessage(resulDBBB);
                victoire = true;
                convHelene.changeAnswerChoicesTab("situation26");
            }
        ]
    }
    convHelene.addChoice(situation28);
    var situation29 = {
        message : ["Que faire?"],
        choix : [chredAAAAA, chredAAAAB],
        resultats : [
            ()=>{
                convHelene.addNewMessage(resulAAAAA);
                defaite = true;
                convHelene.changeAnswerChoicesTab("situation10");
            },()=>{
                convHelene.addNewMessage(choixAAAAB)
                convHelene.addNewMessage(resulDB);
                convHelene.changeAnswerChoicesTab("situation27");
            }
        ]
    }
    convHelene.addChoice(situation29);
    //Etape initiale
    convHelene.changeAnswerChoicesTab("situation0");
}

var textbox2 = textbox
export{textbox2, sleep};

function dialogue_Tom_setup()
{
    var contact = contactTom
    
    //Liste des messages initiaux : Le deuxième argument vaut 1 si le message provient du contact, et 2 si il provient de l'utilisateur
    var message_list = [
        new Message(contactTom,1,"21 février 2026","11:13","Bonne fête des pères !!! <3"),
        new Message(contactTom,2,"21 février 2026","11:17","Merci mon grand. Tu feras gaffe, la fête des pères c'est dans 4 mois 😂"),
        new Message(contactTom,1,"21 février 2026","11:18","Minnnnnnnce je me trompe tout le temps 😭"),
        new Message(contactTom,1,"21 février 2026","11:19","Au fait, le nouveau film Naruto sort bientôt, on pourra aller le voir ensemble ??"),
        
    ];

    convTom = new Conversation(contactTom,1,message_list, "whatsapp", true)
    var conv = convTom
    convTom.send();

    var situation0 = {
        message : ["Répondre :"],
        choix: ["Avec plaisir !", "Naruto, c'est quoi ?"],
        resultats : [()=>{
            var m = new Message(contactTom,2,"21 février 2026","13:10","Oui avec plaisir !");
            var m2 = new Message(contactTom,1,"21 février 2026","13:11","Superr j'ai hâte !!");
            conv.addNewMessage(m);
            conv.addNewMessage(m2);
            conv.changeAnswerChoices(situation2);
        }, ()=>{
            var m = new Message(contactTom,2,"21 février 2026","13:10","Naruto ? Je connais pas c'est quoi ?");
            var m2 = new Message(contactTom,1,"21 février 2026","13:11","Mais papa je t'avais déjà raconté, c'est un animé d'action où on suit Naruto qui est un ninja qui veut devenir chef du village, sauf qu'il a un démon qui habite en lui, et il y a plein de combats, et en plus Kakashi il est trop stylé !! ça te tente du coup ? ");
            conv.addNewMessage(m);
            conv.addNewMessage(m2);
            conv.changeAnswerChoices(situation1);
            
        }]
    }

    var situation1 = {
        message : ["Répondre :"],
        choix: ["Oui !", "C'est pas mon truc"],
        resultats : [() =>{
            var m1 = new Message(contactTom,2,"21 février 2026","13:13","ça a l'air sympa, ça me tente bien !");
            var m = new Message(contactTom,1,"21 février 2026","13:13","Super, j'ai hâte !");
            conv.addNewMessage(m1);
            conv.addNewMessage(m);
            conv.changeAnswerChoices(situation2);
        },()=>{
            var m1 = new Message(contactTom,2,"21 février 2026","13:27","Oula ça a l'air spécial, je suis pas sûr que ce soit mon style...");
            var m = new Message(contactTom,1,"21 février 2026","13:28","Ok je comprends, tant pis c'est pas grave j'irai avec mes amis !");
            conv.addNewMessage(m1);
            conv.addNewMessage(m);
            conv.changeAnswerChoices(situation2);
        }]
    }

    var situation2 = {
        message : ["Ecrire"],
        choix : [],
        resultats : []
    }

    var situation3 = {
        message : ["Répondre"],
        choix : ["Préviens moi la prochaine fois !"],
        resultats : [()=>{
            var m1 = new Message(contactTom,2,"21 février 2026","13:40","Ok soit, mais pense à me prévenir la prochaine fois que tu achète un truc sur mon compte !");
            var m = new Message(contactTom,1,"21 février 2026","13:41","C'est vrai désolé");
            queteTom.update("Trouver comment réceptionner le colis de Tom");
            convTom.addNewMessage(m1);
            convTom.addNewMessage(m);
            convTom.changeAnswerChoicesTab("situation4");
        }]
    }

    conv.addChoice(situation0);
    conv.addChoice(situation1);
    conv.addChoice(situation2);
    conv.addChoice(situation3);
    conv.addChoice(convRAS);

    //Etape initiale
    conv.changeAnswerChoices(situation0);

}


function intro_setup()
{
    var dialogue = {
        message : ["Joueuse, joueur, salutation ! Bienvenue sur notre activité interactive. (Clique sur cette boite de dialogue pour passer au message suivant.)",
                    "Dans ce jeu, vous êtes dans la peau d'un homme d'une quarantaine d'années nommé Gaspard Guillemaut, et avez accès à son téléphone pour effectuer diverses actions. Votre objectif, si vous l'acceptez, est de prendre connaissance de la situation actuelle, et de faire votre possible pour améliorer la situation du personnage (comme si il s'agissait de vous).",
                    "Nous vous invitons à inspecter les différentes applications pour prendre connaissance plus en détail de votre situation. (L'application 'informations' vous permettra notamment d'en savoir plus sur les caractéristiques et les relations de votre personnage.)",
                    "Vous allez également pouvoir intéragir avec différentes personnes au travers de discussions à choix multiples qui orienteront le scénario.  Des quêtes vont apparaître pour vous guider, à vous d'essayer de les réaliser (ou pas).",
                    "Si vous avez la sensation d'être bloqué n'hésitez pas à vérifier les différentes applications de messagerie. Et si vous n'avez plus aucun choix proposé, bravo vous êtes arrivé au bout du jeu, vous pouvez cliquer sur le bouton 'Terminer le jeu' pour avoir un retour sur votre parcours.",
                    "L'objectif de ce jeu est d'analyser vos choix et de voir quelles bonnes pratiques vous pouvez mettre en place et adopter en conditions réelles. Bonne chance ! (cliquez sur le choix 'Super !' pour continuer)"
                ],
        choix : ["Super !"],
        resultats : [ ()=>{
            quests[0].change_state(1);
            quests[0].update("Inspectez les 4 premières applications");
            queteArgent.update("Gagner un peu d'argent")}
        ]
        }
    textbox.ecrire_dialogue(dialogue,0);
}

function info_setup()
{

    var d1_garpard = {
        message : ["Vous incarnez un homme d'une quarantaine d'années, divorcé et père d'un enfant de 15 ans. Vous êtes employé d'une grande entreprise de thé glacé, vous vous y plaisez même si en ce moment le job vous procure pas mal de stress."],
        choix : ["Ok"],
        resultats : [()=>{}],
        }

    
    var d2_helene= {
        message : ["Vous discutez depuis plusieurs mois avec une jeune femme nommée Hélène. Vous l'avez rencontré sur Tinder mais n'avez pas encore pu faire de sortie ensemble car elle est actuellement en mission humanitaire mais ne devrait pas tarder à rentrer. Néanmoins vous avez beaucoup discuté par messages et appels, vous l'appréciez beaucoup et attendez son retour avec hâte."],
        choix : ["Ok"],
        resultats : [()=>{}]
        }
    
    var d3_tom = {
        message : ["Votre relation avec votre fils est plutôt bonne, il est fan de mangas, vit avec vous une semaine sur deux et ne pose pas beaucoup de problèmes."],
        choix : ["Ok"],
        resultats : [()=>{}]
        }

    document.getElementById("cellPhone-info1").addEventListener("click", ()=>{
        textbox.ecrire_dialogue(d1_garpard,0);
    });
    document.getElementById("cellPhone-info2").addEventListener("click", ()=>{
        textbox.ecrire_dialogue(d2_helene,0);
        quests[1].update("Trouver le moyen de voir Hélène")
    });
    document.getElementById("cellPhone-info3").addEventListener("click", ()=>{
        textbox.ecrire_dialogue(d3_tom,0);
    });
}

function colis_setup()
{
    
    var amazon_seen = 4
    var Tom_answer = 5
    var phishing_before_amazon = 3
    var phishing_after_amazon = 30;
    
    var scammed = 100
    var ok = 50
    var mail9 = new Mail("Amazon France","confirmation-commmande@amazon.fr","10:23","Confirmation de commande pour 1 item","Cher client,\nMerci pour votre commande. Nous vous tiendrons informé par SMS lorsque les articles de votre commande seront expédiés. Vous pouvez suivre l'état de votre commande ou modifier celle-ci sur l'application Amazon.\nDétails de la commande\nNaruto Shipudden - Action Figure EUR 31\n\nSous total des articles : EUR 31\nFrais d'envoi : EUR 0\nTotal HT : EUR 27\nTVA : EUR 4\nMontant total de la commande: EUR 31","mail-amazon-naruto")
    mail9.send();
    document.getElementById("mail-amazon-naruto").addEventListener("click", ()=> {
        if(quests[2].state<amazon_seen){

            quests[2].update("Enquêter sur le colis Amazon que vous n'avez pas commandé"); 
            quests[2].change_state(amazon_seen);
            var contact = contactTom;
            var conv = convTom;
            var choix11 = new Message(contact,2,"21 février 2026", "13:35","D'ailleurs j'ai vu dans mes mails que quelqu'un a commandé une figurine Naruto sur Amazon, est ce que ça vient de toi ?");
            var choixReduit11 = "As tu acheté quelque chose sur Amazon ?"
            var resultat11 = new Message(contact,1,"21 février 2026","13:36","Oui c'est moi, j'ai oublié de te prévenir, je te rembourserais avec mon argent de poche !");
            conv.addChoiceSituation("situation2",choixReduit11,[choix11,resultat11],"situation3");
        
        }
    });
    var contact1 = new Contact("+33784673528","");
    var message11 = new Message(contact1,1,yesterday, "11:17","bonjour c'est le livreur, votre colis ne rentre pas dans la boite aux lettres merci de choisir un nouveau créneau via");
    message11.setLink("https://chronopost-suivi.com/71224");
    var conv1 = new Conversation(contact1,1,[message11],"SMS",true,"colis-phishing1");
    conv1.send();


    var contact2 = new Contact("+33767631745","");
    var message21 = new Message(contact2,1,yesterday, "14:36","Votre colis a été envoyé. \n Veuillez le vérifier et le recevoir.");
    message21.setLink("http://tinyurl.com/yh6gzfgk");
    var conv2 = new Conversation(contact2,1,[message21],"SMS",true, "colis-phishing2");
    conv2.send();




    var contact3 = new Contact("","Pickup");
    
    var message31 = new Message(contact3,1,today, "11:00","Votre colis AMAZON est arrivé au relais CITY CENTER PALAISEAU. \n \n Présentez Pass :");
    message31.setLink("http://n.pkup.fr/nFvSJFHIj");
    var conv3 = new Conversation(contact3,1,[message31],"SMS");
    conv3.send();

    var contact4 = new Contact("+33659152278","");
    var message41 = new Message(contact4,1,yesterday, "18:14","Guillemaut le paquet est trop grand pour la boite aux lettres. Veuillez choisir un reacheminement via ");
    message41.setLink("https://Guillemaut.distribs-bordereau.com");
    var conv4 = new Conversation(contact4,1,[message41],"SMS",true, "colis-phishing3");
    conv4.send();

    for(var i=1; i<4; i++)
    {
        document.getElementById("colis-phishing"+i).addEventListener("click", ()=>{
            if(quests[2].getState()<= phishing_before_amazon)
            {
                quests[2].update("Enquêter sur cette histoire de colis");
                quests[2].state = phishing_before_amazon;
            }
            else
            {
                quests[2].state = phishing_after_amazon;
            }
        })
    }

    message41.getLink().addEventListener("click", () => {
        var dialogue = {
            message: ["Une page s'ouvre, vous demandant d'entrer vos coordonnées et l'adresse pour la nouvelle livraison, ainsi que de payer des frais de 1.93€"],
            choix : ["Remplir les informations demandées et payer", "Partir"],
            resultats : [ ()=>{quests[2].complete();
                                var state = quests[2].getState();
                                if(state<amazon_seen)
                                    quests[2].change_state(scammed);
                                else if(state==ok || state== ok+1)
                                    quests[2].change_state(scammed+2)
                                else if(state==scammed)
                                    quests[2].change_state(2*scammed)
                                else
                                    quests[2].change_state(scammed+1)
                            },
                           ()=>{}]
        };
        textbox.ecrire_dialogue(dialogue,0)
    })
    message31.getLink().addEventListener("click", () => {
        var dialogue = {
            message: ["Une page s'ouvre, (Amazon.fr), vous demandant de vous connecter."],
            choix : ["Entrer votre identifiant et mot de passe", "Partir"],
            resultats : [ ()=>{quests[2].complete();
                               var state = quests[2].getState();
                               if(state<4)
                               {
                                    quests[2].change_state(ok-1);
                               }
                               else if(state<ok)
                               {
                                    quests[2].change_state(ok);
                               }
                               else
                               {
                                    quests[2].change_state(scammed+2)
                               }
                                
                            },
                           ()=>{}]
        };
        textbox.ecrire_dialogue(dialogue,0)
    })
    message21.getLink().addEventListener("click", () => {
        var dialogue = {
            message: ["Une page s'ouvre, vous demandant de payer les frais de livraison"],
            choix : ["Payer", "Partir"],
            resultats : [ ()=>{quests[2].complete();
                var state = quests[2].getState();
                if(state<amazon_seen)
                    quests[2].change_state(scammed);
                else if(state==ok || state== ok+1)
                    quests[2].change_state(scammed+2)
                else if(state==scammed)
                    quests[2].change_state(2*scammed)
                else
                    quests[2].change_state(scammed+1)
                            },
                           ()=>{}]
        };
        textbox.ecrire_dialogue(dialogue,0)
    })
    message11.getLink().addEventListener("click", () => {
        var dialogue = {
            message: ["Une page s'ouvre, vous demandant d'entrer vos coordonnées et l'adresse pour la nouvelle livraison, ainsi que de payer des frais de 1.32€"],
            choix : ["Remplir les informations demandées et payer", "Partir"],
            resultats : [ ()=>{quests[2].complete();
                var state = quests[2].getState();
                if(state<amazon_seen)
                    quests[2].change_state(scammed);
                else if(state==ok || state== ok+1)
                    quests[2].change_state(scammed+2)
                else if(state==scammed)
                    quests[2].change_state(2*scammed)
                else
                    quests[2].change_state(scammed+1)
                            },
                           ()=>{}]
        };
        textbox.ecrire_dialogue(dialogue,0)
    })
    
    

}

//LANCER BANK_SCAM
async function bank_scam() {
    bank_call_setup();
    var idx=2; //Indice pour gérer le numéro de l'appel 
    await sleep(1000);
    var contactBankScam = new Contact("3714","BnP");
    var messBankBankScam = new Message(contactBankScam,1,"21 février 2026","11:49","BNPParibas : activité anormale détectée sur votre compte. Demande de paiement de 1827 euros."); //Envoyer un message en mode urgent paiement anormal détecté
    var convBankBankScam = new Conversation(contactBankScam,0,[],"SMS",false);
    convBankBankScam.send();
    convBankBankScam.addNewMessage(messBankBankScam);
    await sleep(1000);
    audioConvBanque.call_notification(4);// entering_call("+33569283714",idx,true)
    queteArnaqueBancaire.change_state(2);
}

function voicemail_setup()
{
    var situation0 = {
        message: ["Cette personne a laissé un message vocal: L'écouter ?"],
        choix : ["Oui", "Non"],
        resultats : [ ()=>{
                                audioConvBanque.change_state(9);
                                audioConvBanque.playAudio(0);
                                audioConvBanque.audio.onended = () => {
                                    audioConvBanque.allow_home();
                                    if(queteArnaqueBancaire.getState()==50 || queteArnaqueBancaire.getState()==60)
                                        {textbox.ecrire_dialogue(situation1,0);
                                        interactionPremierAppel = 1;}
                            
                                }
                        },
                        ()=>{}]
    };

    var situation1 = {
        message: ["Rappeler ?"],
        choix : ["Oui", "Non"],
        resultats : [ ()=>{
            //Démarrer l'appel
            audioConvBanque.change_state(7);
            queteArnaqueBancaire.change_state(70);
            audioConvBanque.changeAnswerChoicesTab("situation0");
            audioConvBanque.enter_call();
            interactionPremierAppel=1;
            
        },
        ()=> {}]
    };

    var situation2 = {
        message: ["Cette personne n'as pas laissé de message"],
        choix : ["D'accord"],
        resultats : [ ()=> {}]
    };


    document.getElementById("cellPhone-voicemail4").addEventListener("click",() =>{ if(interactionPremierAppel !=1)
        textbox.ecrire_dialogue(situation0,0);
    })

    document.getElementById("cellPhone-voicemail1").addEventListener("click",() =>{
        textbox.ecrire_dialogue(situation2,0);
    })
    document.getElementById("cellPhone-voicemail2").addEventListener("click",() =>{
        textbox.ecrire_dialogue(situation2,0);
    })
    document.getElementById("cellPhone-voicemail3").addEventListener("click",() =>{
        textbox.ecrire_dialogue(situation2,0);
    })
}


var interactionPremierAppel = 0; //0 aucune interaction, 1 interaction positive, -1 juste raccrocher sur la notif
function bank_call_setup() {


    //click sur décrocher/raccrocher 
    var pick_up=document.getElementById("pick_up_img");
    var hang_up=document.getElementById("hang_up_img");
    var hang_up_in_call=document.getElementById("hang-up-call");
    pick_up.addEventListener("click",() => {if (interactionPremierAppel ==1){audioConvBanque.change_state(6);}  interactionPremierAppel=1; audioConvBanque.enter_call()});
    hang_up.addEventListener("click",() => {audioConvBanque.stop();
        interactionPremierAppel=-1;
        var zone=document.getElementById("cellPhone-entering-call");
        zone.style.display = "none";

        if(queteArnaqueBancaire.getState()<=2)
        {
            setTimeout(async() =>{audioConvBanque.change_state(6);
                    queteArnaqueBancaire.change_state(3);
                    audioConvBanque.call_notification(false);
                    audioConvBanque.changeAnswerChoicesTab("situation1");
                    mailBlocage.send()
                    document.getElementById("mailBlocage").addEventListener("click", () => {
        if (queteArnaqueBancaire.getState >= 2) 
        { audioConvBanque.addChoiceSituation("situation2","J'ai bien reçu le mail mais je ne vois pas quoi faire",9,"situation3");
        queteArnaqueBancaire.change_state(4);
        }
    });;},8000);
            voicemail_setup();
        }
        else 
        {
            queteArnaqueBancaire.change_state(40);
            convHelene.addChoiceSituation("situation2",chred31,[choixBank31,resul3],"situation3");
            convHelene.addChoiceSituation("situation3",chred41,[choixBank41,resul41],"situation4");
            convHelene.addChoiceSituation("situation4",chred411,[choixBank411,resul4],"situation6");
            convHelene.addChoiceSituation("situation4",chred412,[choixBank412,resul4],"situation6"); 
        }
        
    });
    hang_up_in_call.addEventListener("click",() => {
        audioConvBanque.stop();
        if(queteArnaqueBancaire.getState() != 3)
        {
            setTimeout(async() =>{audioConvBanque.change_state(6);
                    queteArnaqueBancaire.change_state(3);
                    audioConvBanque.call_notification(false);
                    audioConvBanque.changeAnswerChoicesTab("situation1");
                    mailBlocage.send()
                    document.getElementById("mailBlocage").addEventListener("click", () => {
        if (queteArnaqueBancaire.getState >= 2) 
        { audioConvBanque.addChoiceSituation("situation2","J'ai bien reçu le mail mais je ne vois pas quoi faire",9,"situation3");
        queteArnaqueBancaire.change_state(4);
        }});;},8000);
        }
        else 
        {
            if (banqueClick && lienClick)
                queteArnaqueBancaire.change_state(8)
            else if (lienClick)
                queteArnaqueBancaire.change_state(5)
            audioConvBanque.stop();
            queteArnaqueBancaire.change_state(40);
            convHelene.addChoiceSituation("situation2",chred31,[choixBank31,resul3],"situation3");
            convHelene.addChoiceSituation("situation3",chred41,[choixBank41,resul41],"situation4");
            convHelene.addChoiceSituation("situation4",chred411,[choixBank411,resul4],"situation6");
            convHelene.addChoiceSituation("situation4",chred412,[choixBank412,resul4],"situation6");
        }
    });


    //gestion du cas où le gars laisse juste sonner sans décrocher la première fois 
    setTimeout(async() =>{ if (interactionPremierAppel != 1)
        {
        document.getElementById("app-icon-notification").src = "src/icons/Appels.png";
        document.getElementById('notif-sender').innerHTML="Répondeur";
        document.getElementById('notif-content').innerHTML="1 nouveau message";
        document.getElementById('cellPhone-notification').style.display = "flex";
        await sleep(2000);
        document.getElementById('cellPhone-notification').style.display = "none";
        await sleep(4000);
        queteArnaqueBancaire.change_state(50);
        audioConvBanque.call_notification(false);
        audioConvBanque.changeAnswerChoicesTab("situation0");

        await sleep(25000);

        if(interactionPremierAppel != 1)
        {
            var m = new Message(contactHelene,1,today,"13:20","J'ai un problème, un conseiller bancaire m'a appelée et il m'a conseillé de virer mon argent sur un compte sécurisé, ce que j'ai fait mais je n'ai toujours pas reçu les codes d'accès...")
            convHelene.addNewMessage(m);
            convHelene.changeAnswerChoicesTab("situation5")
            var m2 = new Message(contactHelene,1,today,"13:22","Déjà fait... Je devais acheter mon billet d'avion pour rentrer, ça me dérange un peu de te demander ça mais est-ce que tu pourrais me l'avancer stp ?")
            convHelene.addChoiceSituation("situation5",chred422,[choixBank422,m2],"situation6")
        }
        }},12000)



    document.getElementById("cellPhone-call-button").addEventListener("click",()=>{ 
        if(nb_pause == 0) {
        if(!lienAccepted)
            audioConvBanque.changeAnswerChoicesTab("situation2");
        else
        {
            audioConvBanque.removeChoicesSituation("situation2");
            audioConvBanque.addChoiceSituation("situation2","C'est tout bon !",2,"situation4");
            audioConvBanque.changeAnswerChoicesTab("situation2");
            document.getElementById("cellPhone-call-button").style.display="none";
            cellPhone_change_app("appel2");
            audioConvBanque.show_choice();
            audioConvBanque.allowed_home = false;
        }
            
        nb_pause = nb_pause +1;
    }
    else {
        if(!lienAccepted)
        {
        audioConvBanque.removeChoicesSituation("situation2");
        audioConvBanque.changeAnswerChoicesTab("situation2");
        audioConvBanque.addChoiceSituation("situation2","Le mail est bizarre, il me demande de rentrer mes coordonnées bancaires",4,"situation3");
        document.getElementById("cellPhone-call-button").style.display="none";
        cellPhone_change_app("appel2");
        audioConvBanque.show_choice();
        audioConvBanque.allowed_home = false;
        }
        else
        {
            audioConvBanque.removeChoicesSituation("situation2");
            audioConvBanque.addChoiceSituation("situation2","C'est tout bon !",2,"situation4");
            audioConvBanque.changeAnswerChoicesTab("situation2");
            document.getElementById("cellPhone-call-button").style.display="none";
            cellPhone_change_app("appel2");
            audioConvBanque.show_choice();
            audioConvBanque.allowed_home = false;
        }
        

    }})
    

    var nb_pause = 0;
    var lienClick = false;
    var lienAccepted = false;
    
    var contact=contactHelene;
    var choixBank41 = new Message(contact,2,"21 février 2026", "13:22","Non ! Essaie d'annuler ! C'était une arnaque !" ); //POSSIBLE QUE SI ARNAQUE DETECTEE
    var chred41 = "Nooon c'était une arnaque";
    var resul41 = new Message(contact,1,"21 février 2026", "13:22","Quoi ? Sérieusement ? Non... Je peux pas annuler... J'ai tout viré dessus en plus..." );
    var choixBank411 = new Message(contact,2,"21 février 2026", "13:22","Je suis désolé..." );
    var chred411 = "Désolé...";
    var choixBank412 = new Message(contact,2,"21 février 2026", "13:22","Merde... Essaie de porter plainte et d'appeler ta banque on sait jamais..." );
    var chred412 = "Appelle ta banque et porte plainte on sait jamais";

    var choixBank42 = new Message(contact,2,"21 février 2026", "13:22","Okay tant mieux, il doit être en sécurité !" );
    var chred42 = "Super";
    var resul42 = new Message(contact,1,"21 février 2026", "13:23","Oui le seul problème c'est que je n'ai pas encore reçu les codes d'accès à mon nouveau compte..." );
    var choixBank421 = new Message(contact,2,"21 février 2026", "13:23","Bizarre. T'es sûre que ce n'était pas une arnaque ?" );
    var chred421 = "Bizarre, une arnaque peut-être ?";
    //résul41
    var choixBank422 = new Message(contact,2,"21 février 2026", "13:22","T'inquiète ça ne devrait pas tarder, relance le !" );
    var chred422 = "Relance le il va te les donner"; 
    //resul4
    var resul4 = new Message(contact,1,"21 février 2026", "13:24","C'est horrible, à cause de cette arnaque mon compte est bloqué temporairement je ne peux rien retirer je ne peux donc pas me payer le billet d'avion du retour. Ca me gène un peu de demander ça mais tu pourrais m'avancer ce billet?" );

    var choixBank31 = new Message(contact,2,"21 février 2026", "13:20","Un conseiller bancaire m'a appelé pour me demander de l'argent, fais gaffe c'est une arnaque !" );
    var chred31 = "Dénoncer l'arnaque de l'appel" //POSSIBLE QUE SI ON A REFUSE DE PAYER ET EMIS DES SOUPCONS
    var choixBank32 = new Message(contact,2,"21 février 2026", "13:20","Un conseiller bancaire m'a appelé car j'allais être débité d'une somme importante et il a résolu le problème !" );
    var chred32 = "Evoquer l'appel avec le conseiller"
    var resul3 = new Message(contact,1,"21 février 2026", "13:21","Quoi ? Moi aussi ! Il m'a conseillé de virer mes économies sur un compte sécurisé et j'ai accepté. " );
    
    
    var mailBlocage = new Mail("BnP","BnP@gmail.com","13:19","Blocage carte","Cher client, \n En mesure de sécuritée, suite à une activité inhabituelle sur votre carte bancaire, nous avons temporairement suspendu tous les débitements en cours. \n Sans plus d'action de votre part, tous les prélèvements en cours de validation seront accepté. Pour annuler les transactions frauduleuses, nous vous prions donc de bien vouloir confirmer vos informations et suivre les démarches indiqué sur ce lien :","mailBlocage"); // Déclaration du mail avec le lien
    mailBlocage.add_link("https://bnp-paribas-espace-client.fr/cancel/069853");
    mailBlocage.getLink().addEventListener("click", ()=> {
        // Clic sur le lien
        if(!lienClick)
        {
            audioConvBanque.addChoiceSituation("situation2","J'ai cliqué sur votre lien et on me demande d'entrer mes coordonnées bancaires...",4,"situation3");
            lienClick = true;
        }
        if(!lienAccepted)
        {

        
        lienClick = true;
        var situation = {
            message : ["Une page web s'ouvre, vous demandant d'entrer vos information de connexion à votre espace client et votre numéro de carte"],
            choix : ["Se connecter", "Ne pas entrer ces informations"],
            resultats : [()=>{
                lienAccepted = true;
                if (banqueClick && lienClick)
                    queteArnaqueBancaire.change_state(9);
                else if (lienClick)
                    queteArnaqueBancaire.change_state(6);
            queteArnaqueBancaire.update("Reprendre l'appel");    
            textbox.ecrire_dialogue(situation2,0);
            },
                 ()=>{
                    
                    queteArnaqueBancaire.change_state(8);
                    queteArnaqueBancaire.update("Reprendre l'appel");
                      
                    
                 }]
        }

        var situation2 = {
            message : ["La page indique que tous les prélévements frauduleux ont maintenant été annulé, et que le virement de votre compte vers un compte sécurisé débutera bientôt"],
            choix : ["Super !"],
            resultats : [()=>{}]

        }

        textbox.ecrire_dialogue(situation,0);
        
        
    }});


    var situation0 = {
        message: ["Répondre"],
            choix : ["D'accord je vais regarder ça", "(Raccrocher)"],
            resultats : [ ()=>{audioConvBanque.allow_home();
                var info ={
                    message : ["L'appel a été mis en pause pour vous permettre d'aller consulter vos différentes applications (cliquer sur le bouton home). Quand vous vous le sentez, cliquer sur le bouton reprendre l'appel à droite pour continuer le dialogue."],
                    choix : [],
                    resutats : [() => {}]
                }
                textbox.ecrire_dialogue(info,0)
                document.getElementById("cellPhone-call-button").style.display = "block";
                mailBlocage.send();
                document.getElementById("mailBlocage").addEventListener("click", () => {
                    
        if (queteArnaqueBancaire.getState() >= 2) 
        { audioConvBanque.addChoiceSituation("situation2","J'ai bien reçu le mail mais je ne vois pas quoi faire",9,"situation3");
        queteArnaqueBancaire.change_state(4);
        }});
            },
             async ()=>{
                    audioConvBanque.stop();
                    audioConvBanque.change_state(6);
                    queteArnaqueBancaire.change_state(3);
                    await sleep(10000);
                    audioConvBanque.call_notification(false);
                    audioConvBanque.changeAnswerChoicesTab("situation1");
                    mailBlocage.send()
                    document.getElementById("mailBlocage").addEventListener("click", () => {
        if (queteArnaqueBancaire >= 2) 
        { audioConvBanque.addChoiceSituation("situation2","J'ai bien reçu le mail mais je ne vois pas quoi faire",9,"situation3");
        queteArnaqueBancaire.change_state(4);
        }
    });
                        }]
    };
    audioConvBanque.addChoice(situation0);

    //2ème appel depuis le début
    var situation1 = {
        message : ["Répondre"],
        choix : ["D'accord je vais regarder ça", "(Raccrocher)"],
        resultats : [ ()=>{
            audioConvBanque.allow_home();
             var info ={
                    message : ["L'appel a été mis en pause pour vous permettre d'aller consulter vos différentes applications (cliquer sur le bouton home). Quand vous vous le sentez, cliquer sur le bouton reprendre l'appel à droite pour continuer le dialogue."],
                    choix : [],
                    resutats : [() => {}]
                }
            textbox.ecrire_dialogue(info,0)
            textbox.ecrire_dialogue(info,0)
            document.getElementById("cellPhone-call-button").style.display = "block"},
            ()=>{
                if (banqueClick && lienClick)
                    queteArnaqueBancaire.change_state(8)
                else if (lienClick)
                    queteArnaqueBancaire.change_state(5)
                audioConvBanque.stop();
                queteArnaqueBancaire.change_state(40);
                convHelene.addChoiceSituation("situation2",chred31,[choixBank31,resul3],"situation3");
                convHelene.addChoiceSituation("situation3",chred41,[choixBank41,resul41],"situation4");
                convHelene.addChoiceSituation("situation4",chred411,[choixBank411,resul4],"situation6");
                convHelene.addChoiceSituation("situation4",chred412,[choixBank412,resul4],"situation6");
            } 
        ]
    };
    audioConvBanque.addChoice(situation1);

    var situation2 = {
        message : ["Répondre"],
        choix : ["(Raccrocher)","Je ne comprends pas..."],
        resultats : [ () => {queteArnaqueBancaire.change_state(queteArnaqueBancaire.state + 19);
            audioConvBanque.call_notification(false);
            audioConvBanque.changeAnswerChoicesTab("situation3")
        },
        () => {
            audioConvBanque.change_state(5)
            audioConvBanque.playAudio(0)
            document.getElementById("cellPhone-call-button").style.display = "block";
            audioConvBanque.allow_home();

        }]

    }
    audioConvBanque.addChoice(situation2)

    //2ème appel depuis un instant donné => situation3

    //situation 4 : envoyer bouler ou remplir les infos
    var situation3 = {
        message : ["Répondre..."],
        choix : ["(Remplir les infos sur le lien)", "(Envoyer bouler)"],
        resultats : [()=>{
            audioConvBanque.change_state(2);
            audioConvBanque.playAudio(2);
            if (banqueClick && lienClick)
                queteArnaqueBancaire.change_state(9)
            else if (lienClick)
                queteArnaqueBancaire.change_state(6)

            queteArnaqueBancaire.change_state(39);
            convHelene.addChoiceSituation("situation2",chred32,[choixBank32,resul3],"situation3");
            convHelene.addChoiceSituation("situation3",chred42,[choixBank42,resul42],"situation4");
            convHelene.addChoiceSituation("situation4",chred421,[choixBank421,resul41],"situation5");
            convHelene.addChoiceSituation("situation4",chred422,[choixBank422,resul4],"situation5");
            convHelene.addChoiceSituation("situation5",chred411,[choixBank411,resul4],"situation6");
            convHelene.addChoiceSituation("situation5",chred412,[choixBank412,resul4],"situation6");
        },
    ()=>{audioConvBanque.stop();
        if (banqueClick && lienClick)
            queteArnaqueBancaire.change_state(8)
        else if (lienClick)
            queteArnaqueBancaire.change_state(5)
        queteArnaqueBancaire.change_state(40);
        convHelene.addChoiceSituation("situation2",chred31,[choixBank31,resul3],"situation3");
        convHelene.addChoiceSituation("situation3",chred41,[choixBank41,resul41],"situation4");
        convHelene.addChoiceSituation("situation4",chred411,[choixBank411,resul4],"situation6");
        convHelene.addChoiceSituation("situation4",chred412,[choixBank412,resul4],"situation6");
    }]
    }
    audioConvBanque.addChoice(situation3);

    var situation4 = {
        message:["Répondre"],
        choix : ["Super merci, bonne journée."],
        resultats : [() =>{
            audioConvBanque.stop();
            if (banqueClick && lienClick)
                queteArnaqueBancaire.change_state(9)
            else if (lienClick)
                queteArnaqueBancaire.change_state(6)

            queteArnaqueBancaire.change_state(28);
            queteArnaqueBancaire.complete();
            convHelene.addChoiceSituation("situation2",chred32,[choixBank32,resul3],"situation3");
            convHelene.addChoiceSituation("situation3",chred42,[choixBank42,resul42],"situation4");
            convHelene.addChoiceSituation("situation4",chred421,[choixBank421,resul41],"situation5");
            convHelene.addChoiceSituation("situation4",chred422,[choixBank422,resul4],"situation5");
            convHelene.addChoiceSituation("situation5",chred411,[choixBank411,resul4],"situation6");
            convHelene.addChoiceSituation("situation5",chred412,[choixBank412,resul4],"situation6");
        }]
    }
    audioConvBanque.addChoice(situation4);

    audioConvBanque.changeAnswerChoicesTab("situation0");
    audioConvBanque.change_state(1)
}

function other_message_setup() {

    var contactSG1 = new Contact("5122","");
    var convSG1 = new Conversation(contactSG1,0,[],"SMS",true);
    var messageSG1 = new Message(contactSG1,1,twoDaysAgo, "15:53","[SOCIÉTÉ GENERALE] Une opération d'un montant de 769,99 EUR a été détectée comme frauduleuse. \n Dans le cas où vous n'en seriez pas à l'origine, nous vous prions de bien vouloir contacter le centre d'opposition au :");
    messageSG1.setLink("+33189625275")
    messageSG1.getLink().addEventListener("click", () => {
    var situation = {
        message :["Un appel se lance et un message automatique vous informe que ce numéro est surtaxé. Vous vous empressez de raccrocher avec la sensation de vous être fait avoir."],
        choix : [],
        resultats : [() =>{}]}
    textbox.ecrire_dialogue(situation,0)})
    convSG1.send();
    convSG1.addNewMessage(messageSG1);


    var contactCheque = new Contact("","ChqEnergie")
    var m = new Message(contactCheque,1,yesterday,"10:25","Madame, Monsieur, si vous vous chauffez au BOIS ou au FIOUL, vous pouvez demander votre CHEQUE ENERGIE sur")
    m.setLink("https://chequeboisfioul.asp-public.fr")
    m.getLink().addEventListener("click",()=>{
        var situation0 = {
            message: ["Une page s'ouvre, vous invitant à vous connecter avec France Connect pour vous authentifier"],
            choix : ["Le faire", "Ne pas le faire"],
            resultats: [()=>{textbox.ecrire_dialogue(situation1,0);}, ()=>{if( !(queteArgent.in_history(3)))
                {
                    queteArgent.change_state(3);
                }}]

        }

        var situation1 = {
            message: ["La page vous demande ensuite d'entrer des informations sur les membres de votre famille vivant dans votre logement, sur votre revenu et sur la part de bois et de fioul que vous utilisez"],
            choix : ["Le faire", "Ne pas le faire"],
            resultats: [()=>{textbox.ecrire_dialogue(situation2,0);
                mail.send();
                if( !(queteArgent.in_history(5)))
                    {
                        queteArgent.change_state(5);
                        queteArgent.complete();
                    }

            }, ()=>{if( !(queteArgent.in_history(3)))
                {
                    queteArgent.change_state(3);
                }}]
        }

        var situation2 = {
            message : ["Vous êtes bien éligible pour un cheque bois-fioul de 300€. Un mail de confirmation vient de vous être envoyé"],
            choix : ["Super !"],
            resultats : [()=>{ 
            }, ()=>{}]
        }
        var mail = new Mail("confirmation-ChqEnergie.gouv.fr","confirmation-ChqEnergie.gouv.fr","12:05","Confirmation Chèque Energie","Bonjour M Guillemaut, \nNous avons le plaisir de vous confirmer votre élégibilité au chèque énergie, et la réception de votre demande par nos services. Vous recevrez donc ce chèque d'un montant de 300€ par voie postale dans les prochains jours. \nMerci de votre confiance.");


        textbox.ecrire_dialogue(situation0,0);
    })
    let convCheque = new Conversation(contactCheque,1,[ m],"SMS",false,"conv-Cheque");
    convCheque.send();
    document.getElementById("conv-Cheque").addEventListener("click", ()=>{
        if( !(queteArgent.in_history(2)))
        {
            queteArgent.change_state(2);
        }
    })


    var situation_n0 = {
        message : ["Une page s'ouvre vous demandant d'entrer vos coordonnées bancaires pour recevoir le remboursement"],
        choix : ["Remplir les informations", "Quitter la page"],
        resultats : [()=>{textbox.ecrire_dialogue(situation_n1,0);
            if( !(queteArgent.in_history(6)))
                {
                    queteArgent.change_state(6);
                    queteArgent.complete();
                }
        }, ()=>{
            if( !(queteArgent.in_history(4)))
                {
                    queteArgent.change_state(4);
                }
        }]

    }

    var situation_n1 = {
        message : ["Un message s'affiche, indiquant que vous recevrez le remboursement dans quelques jours"],
        choix : ["Super !"],
        resultats : [()=>{}]
    }
    var contactNAvigo = new Contact("","Navigo");
    var m = new Message(contactNAvigo,1,today,"10:20","Cher utilisateur, bonne nouvelle ! Ile-de-France Mobilité vous rembourse 37.10 euros via");
    m.setLink("https://ratp-navigo.com");
    m.link.addEventListener("click", ()=>{
        textbox.ecrire_dialogue(situation_n0,0);
    })
    m.add_text2("Profitez en ! STOP 36105");
    var convNavigo = new Conversation(contactNAvigo,1, [ m],"SMS",false,"conv-Navigo");
    convNavigo.send();
    document.getElementById("conv-Navigo").addEventListener("click", ()=>{
        if( !(queteArgent.in_history(1)))
        {
            queteArgent.change_state(1);
        }
    })
    
    
}

function end_game_setup()
{
    var situation0 = {
        message: ["Êtes vous sûr de vouloir terminer le jeu ? Vous serez alors informé des détails des intrigues repérées, et recevrez un compte rendu de l'effet de vos choix et des conseils."],
            choix : ["Oui", "Non"],
            resultats : [ ()=>{
                                end_game();
                            },
                           ()=>{}]
    };
    document.getElementById("cellPhone-end-game-button").addEventListener("click", ()=>{
        textbox.ecrire_dialogue(situation0,0);
    })
}



function end_game()
{
    document.getElementById("cellPhone-container").style.display = "none";
    document.getElementById("cellPhone-left-container").style.display = "none";
    document.getElementById("cellPhone-end-container").style.display = "block";
    var bilan_helene = "Vous n'êtes pas arrivé au bout de la quête d'Hélène.";
    if (victoire){
        if(atteint_lien_douteux){
            document.getElementById("bilan-helene-flag").innerHTML+=" - ✅";
            bilan_helene = "Bien joué ! Vous vous êtes rendus compte juste à temps que le lien de paiement était louche et avez finalement résisté aux coups de pression de l'arnaqueur (Hélène est en effet une personne fictive, vous ne la verrez jamais) pour vous extorquer votre argent.";
        }
        else if (details_demandes){
            document.getElementById("bilan-helene-flag").innerHTML+=" - ✅";
            bilan_helene = "Bien joué ! Votre détermination à demander des détails vous a permis de déceler le piège et résister à toutes les tentatives de l'arnaqueur (Hélène est en effet une personne fictive, vous ne la verrez jamais) pour vous soutirer de l'argent.";
        }
        else{
            document.getElementById("bilan-helene-flag").innerHTML+=" - ✅";
            bilan_helene = "Bien joué ! Vous avez décelé le piège et avez résisté à toutes les tentatives de l'arnaqueur (Hélène est en effet une personne fictive, vous ne la verrez jamais) pour vous soutirer de l'argent.";
        }
    }
    else if (defaite){
        if (menace){
            document.getElementById("bilan-helene-flag").innerHTML+=" - 🚩";
            bilan_helene = "Oh non… Vous avez décelé le piège mais avez cédé au coup de pression de l'arnaqueur (Hélène est en effet une personne fictive, vous ne la verrez jamais) et avez fini par payer. Il est important de noter que la plupart du temps ces menaces ne sont pas mises à exécution car cela ne rapporte rien à l'arnaqueur. En cas de menace il est important de contacter la police qui vous guidera sur la marche à suivre."
        }
        else if (details_demandes){
            document.getElementById("bilan-helene-flag").innerHTML+=" - 🚩";
            bilan_helene = "Oh non… Hélas, malgré votre détermination à demander des détails, vous ne vous êtes pas méfié suffisamment. Vous avez fini par céder et avez donné une grande partie de vos économies à l'arnaqueur (Hélène est en effet une personne fictive, vous ne la verrez jamais). Les arnaqueurs passent souvent par des plateformes peu conventionnelles pour demander de l'argent afin être moins traçables, vous auriez dû vous méfier à ce moment là. Même s'il est très dur d'admettre que la personne avec qui on a tant conversé est un arnaqueur.";
        }
        else {
            document.getElementById("bilan-helene-flag").innerHTML+=" - 🚩🚩";
            bilan_helene = "Oh non… Vous avez cru Hélène et donné votre argent à cet arnaqueur (Hélène est en effet une personne fictive, vous ne la verrez jamais). Les arnaqueurs passent souvent par des plateformes peu conventionnelles pour demander de l'argent afin être moins traçable, vous auriez dû vous méfier à ce moment là. Même s'il est très dur d'admettre que la personne avec qui on a tant conversé est un arnaqueur.";
        }
    }
    else{
        document.getElementById("bilan-helene-flag").innerHTML+=" - 🔎";
    }
    document.getElementById("bilan-quete-Helene").innerHTML = bilan_helene;



    var bilan_colis = "";
    switch(quests[2].getState()){
        case 0:
            document.getElementById("bilan-colis-flag").innerHTML+=" - 🔎";
            bilan_colis = "Vous n'avez pas abordé cette quête.";
            break;
        case 3:
            document.getElementById("bilan-colis-flag").innerHTML+=" - 🔎✅";
            bilan_colis = "Vous avez vu les messages de phishing demandant de payer pour recevoir un colis, et n'êtes pas tombé dans le panneau. Mais il y avait pourtant un vrai colis à réceptionner dans cette histoire, ne vous laissez pas submerger par les messages d'arnaque !";
            break;
        case 4:
            document.getElementById("bilan-colis-flag").innerHTML+=" - 🔎";
            bilan_colis = "Vous avez vu le mail d'Amazon, mais avez choisi de ne pas aller plus loin. Votre fils avait en effet bien commandé un colis sur Amazon, ce que vous pouviez lui demander. Vous aviez reçu plusieurs plusieurs messages à propos de colis, dont un seul venait véritablement d'Amazon, les autres étant des tentatives de phishing. "
            bilan_colis+= "En règle général, les livreurs ou grandes plateformes ne vous demanderont jamais d'argent via un lien par SMS ou par mail pour une quelconque raison. En cas de doute, n'hésitez pas à vérifier l'url du site et à regarder sur internet s'il y a des cas d'arnaques concernant ce site. Et même si ces arnaques peuvent demander une somme d'argent relativement faible, ou même aucun prélèvement immédiat, le simple fait d'entrer vos informations bancaires après avoir cliqué sur un lien par SMS ou par mail constitue un grand risque."
            break;
        case 5:
            document.getElementById("bilan-colis-flag").innerHTML+=" - 🔎";
            bilan_colis = "Demander à votre fils fan de manga si le colis vient de lui était une excellente initiative. Vous aviez reçu plusieurs plusieurs messages à propos de colis, dont un seul venait véritablement d'Amazon, les autres étant des tentatives de phishing. "
            bilan_colis+= "En règle général, les livreurs ou grandes plateformes ne vous demanderont jamais d'argent via un lien par SMS ou par mail pour une quelconque raison. En cas de doute, n'hésitez pas à vérifier l'url du site et à regarder sur internet s'il y a des cas d'arnaques concernant ce site. Et même si ces arnaques peuvent demander une somme d'argent relativement faible, ou même aucun prélèvement immédiat, le simple fait d'entrer vos informations bancaires après avoir cliqué sur un lien par SMS ou par mail constitue un grand risque." 
            break;
        case 30:
            document.getElementById("bilan-colis-flag").innerHTML+=" - ✅⚠️";
            bilan_colis = "Vous avez vu le mail d'Amazon indiquant que vous aviez un colis à réceptionner, et divers messages dans vos SMS prétendant aider à la réception du colis, que vous avez identifié comme des arnaques. Pourtant, l'un des SMS était réel et vous permettait d'obtenir un code permettant de réceptionner votre colis ! Refuser en bloc de cliquer sur les liens envoyé par SMS est une bonne stratégie pour éviter les arnaques, mais faites attention à ne pas considérer tous les SMS que vous recevez comme des arnaques"
            break;
        case 49 :
            document.getElementById("bilan-colis-flag").innerHTML+=" - 🔎✅";
            bilan_colis = "Vous avez obtenu le code pour réceptionner le colis un peu par hasard, sans savoir qu'il y avait un colis qui vous était destiné, mais vous avez su déjouer les arnaques et trouver le SMS réel. Pour les prochaines fois, pour être encore plus sûr de ne pas vous faire avoir, vérifiez que vous avez bien un colis commandé chez Amazon avant de cliquer sur un lien dans un SMS et d'indiquer votre mot de passe. Cette fois-ci, c'était bien le cas, votre fils l'avait commandé, ce qui était vérifiable en lui demandant, et confirmable par un mail."
            break;
        case 50 :
            document.getElementById("bilan-colis-flag").innerHTML+=" - ✅";
            bilan_colis = "Bravo, vous avez réussi à identifier la présence d'un colis vous étant destiné et à trouver le bon moyen de le réceptionner en évitant les arnaques."
            break;
        case 100:
            document.getElementById("bilan-colis-flag").innerHTML+=" - 🚩";
            bilan_colis = "Vous avez vu un message concernant un colis à décaler, vous avez payé des frais négligeables et tout est réglé... mais est-ce vraiment le cas ? Le message auquel vous avez fait confiance pour récupérer un colis était en fait un message de phishing, visant à collecter vos données bancaires. "
            bilan_colis+= "En règle général, les livreurs ou grandes plateformes ne vous demanderont jamais d'argent via un lien par SMS ou par mail pour une quelconque raison. En cas de doute, n'hésitez pas à vérifier l'url du site et à regarder sur internet s'il y a des cas d'arnaques concernant ce site. Et même si ces arnaques peuvent demander une somme d'argent relativement faible, ou même aucun prélèvement immédiat, le simple fait d'entrer vos informations bancaires après avoir cliqué sur un lien par SMS ou par mail constitue un grand risque."
            break;
        case 101:
            document.getElementById("bilan-colis-flag").innerHTML+=" - 🚩";
            bilan_colis = "Vous avez vu le mail d'Amazon indiquant que vous attendiez un colis, et également un message du livreur pour décaler la livraison. Vous avez donc payé des frais négligeables et tout est réglé... mais est-ce vraiment le cas ? Le message auquel vous avez fait confiance pour récupérer un colis était en fait un message de phishing, visant à collecter vos données bancaires. "
            bilan_colis+= "En règle général, les livreurs ou grandes plateformes ne vous demanderont jamais d'argent via un lien par SMS ou par mail pour une quelconque raison. En cas de doute, n'hésitez pas à vérifier l'url du site et à regarder sur internet s'il y a des cas d'arnaques concernant ce site. Et même si ces arnaques peuvent demander une somme d'argent relativement faible, ou même aucun prélèvement immédiat, le simple fait d'entrer vos informations bancaires après avoir cliqué sur un lien par SMS ou par mail constitue un grand risque."
            break;
        case 102:
            document.getElementById("bilan-colis-flag").innerHTML+=" - 🚩";
            bilan_colis= "Vous avez bien réceptionné votre colis en vous connectant à Amazon... Mais vous vous êtes aussi fait arnaquer par un message de phishing ! "
            bilan_colis+= "En règle général, les livreurs ou grandes plateformes ne vous demanderont jamais d'argent via un lien par SMS ou par mail pour une quelconque raison. En cas de doute, n'hésitez pas à vérifier l'url du site et à regarder sur internet s'il y a des cas d'arnaques concernant ce site. Et même si ces arnaques peuvent demander une somme d'argent relativement faible, ou même aucun prélèvement immédiat, le simple fait d'entrer vos informations bancaires après avoir cliqué sur un lien par SMS ou par mail constitue un grand risque."
            break;
        case 200:
            document.getElementById("bilan-colis-flag").innerHTML+=" - 🚩🚩";
            bilan_colis= "Malheureusement vous vous êtes fait avoir par les SMS de phishing... Deux fois... "
            bilan_colis+= "En règle général, les livreurs ou grandes plateformes ne vous demanderont jamais d'argent via un lien par SMS ou par mail pour une quelconque raison. En cas de doute, n'hésitez pas à vérifier l'url du site et à regarder sur internet s'il y a des cas d'arnaques concernant ce site. Et même si ces arnaques peuvent demander une somme d'argent relativement faible, ou même aucun prélèvement immédiat, le simple fait d'entrer vos informations bancaires après avoir cliqué sur un lien par SMS ou par mail constitue un grand risque."
            break;
  
    }
    document.getElementById("bilan-quete-Colis").innerHTML = bilan_colis;

    if(quests[3].getState() >=29 && quests[3].getState() <=38){
        quests[3].change_state(40);
    }

    if(quests[3].getState() >=10 && quests[3].getState() <=27 
    || quests[3].getState() >= 2 && quests[3].getState() <=5
    || quests[3].getState() >= 7 && quests[3].getState() <=8){
        quests[3].change_state(10);
    }



    var bilan_arnaque = "";
    switch(quests[3].getState()){
        case 0:
            document.getElementById("bilan-banque-flag").innerHTML+=" - 🔎";
            bilan_arnaque = "Vous n'avez pas abordé cette quête. ";
            break;
        case 1:
            document.getElementById("bilan-banque-flag").innerHTML+=" - 🔎";
            bilan_arnaque = "Vous n'avez pas abordé cette quête. ";
            break;
        case 60:
            document.getElementById("bilan-banque-flag").innerHTML+=" - ✅⚠️";
            bilan_arnaque = "Ne pas répondre aux appels de numéros inconnus est une stratégie valide pour échapper aux arnaques téléphoniques. Néanmoins, veillez à ne pas tomber dans une paranoïa autour de cela. ";
            break;
        case 50:
            document.getElementById("bilan-banque-flag").innerHTML+=" - ✅⚠️";
            bilan_arnaque = "Ne pas répondre aux appels de numéros inconnus est une stratégie valide pour echapper aux arnaques téléphoniques. Néanmoins, veillez à ne pas tomber dans une paranoïa autour de cela. ";
            break;
        case 28:
            document.getElementById("bilan-banque-flag").innerHTML+=" - 🚩";
            bilan_arnaque = "Vous avez bien protégé votre compte grâce à votre conseillère bancaire... N'est-ce pas ? En fait non, pas du tout, vous avez été victime d'une arnaque bancaire très importante ! "
            bilan_arnaque+= "Vos conseiller·ères bancaires ne vous demanderont jamais (JAMAIS) vos coordonnées bancaires, que ce soit pour des précisions sur votre carte bancaire, ou le mot de passe de votre espace client, par téléphone, SMS ou mail pour une quelconque raison. En cas de doute, n'hésitez pas à vous rendre en présentiel dans votre banque ou appelez vous-même le véritable numéro d'aide de votre banque que vous trouverez sur votre espace client. Si vous avez tout de même donné les informations de votre carte bancaires, mettez celle-ci en opposition le plus tôt possible. De manière générale, si vous vous rendez compte que vous avez donné des informations confidentielles, notamment concernant votre banque à une personne malveillante, n'hésitez pas à contatcter votre conseiller·ère bancaire pour obtenir l'aide d'un·e (véritable) professionnel·le ."
            break;
        case 39:
            document.getElementById("bilan-banque-flag").innerHTML+=" - 🚩";
            bilan_arnaque = "Vous avez fini par protéger votre compte grâce à l'insistance de votre conseillère bancaire... N'est-ce pas ? En fait non, pas du tout, vous avez finalement été victime d'une arnaque bancaire très importante ! "
            bilan_arnaque+= "Vos conseiller·ères bancaires ne vous demanderont jamais (JAMAIS) vos coordonnées bancaires, que ce soit pour des précisions sur votre carte bancaire, ou le mot de passe de votre espace client, par téléphone, SMS ou mail pour une quelconque raison. En cas de doute, n'hésitez pas à vous rendre en présentiel dans votre banque ou appelez vous-même le véritable numéro d'aide de votre banque que vous trouverez sur votre espace client. Si vous avez tout de même donné les informations de votre carte bancaires, mettez celle-ci en opposition le plus tôt possible. De manière générale, si vous vous rendez compte que vous avez donné des informations confidentielles, notamment concernant votre banque à une personne malveillante, n'hésitez pas à contatcter votre conseiller·ère bancaire pour obtenir l'aide d'un·e (véritable) professionnel·le ."
            break;
        case 40:
            document.getElementById("bilan-banque-flag").innerHTML+=" - ✅";
            bilan_arnaque = "Félicitations ! Vous n'est pas tombé dans le piège de l'arnaque téléphonique ! Cette soi-disant conseillère bancaire faisait en effet partie d'un réseau d'arnaque. Vous avez réussi à ne donner aucune information sensible malgré la pression de la situation. "
            break;
        case 10:
            document.getElementById("bilan-banque-flag").innerHTML+=" - 🔎✅";
            bilan_arnaque = "Vous n'avez pas fini cette quête, mais vous n'est pas tombé dans le piège de l'arnaque téléphonique. Cette soi-disant conseillère bancaire faisait en effet partie d'un réseau d'arnaque. Vous avez réussi à ne donner aucune information sensible malgré la pression de la situation. "
            bilan_arnaque+= "Vos conseiller·ères bancaires ne vous demanderont jamais (JAMAIS) vos coordonnées bancaires, que ce soit pour des précisions sur votre carte bancaire, ou le mot de passe de votre espace client, par téléphone, SMS ou mail pour une quelconque raison. En cas de doute, n'hésitez pas à vous rendre en présentiel dans votre banque ou appelez vous-même le véritable numéro d'aide de votre banque que vous trouverez sur votre espace client. Si vous avez tout de même donné les informations de votre carte bancaires, mettez celle-ci en opposition le plus tôt possible. De manière générale, si vous vous rendez compte que vous avez donné des informations confidentielles, notamment concernant votre banque à une personne malveillante, n'hésitez pas à contatcter votre conseiller·ère bancaire pour obtenir l'aide d'un·e (véritable) professionnel·le ."
            break;
        case 9:
            document.getElementById("bilan-banque-flag").innerHTML+=" - 🚩";
            bilan_arnaque ="C'était un bon réflexe de vérifier votre application de banque, mais malgré le fait que vous n'avez pas vu de prélèvelement étrange, vous avez donné vos informations bancaires ! Vous avez finalement été victime d'une arnaque bancaire très importante ! "
            bilan_arnaque+= "Vos conseiller·ères bancaires ne vous demanderont jamais (JAMAIS) vos coordonnées bancaires, que ce soit pour des précisions sur votre carte bancaire, ou le mot de passe de votre espace client, par téléphone, SMS ou mail pour une quelconque raison. En cas de doute, n'hésitez pas à vous rendre en présentiel dans votre banque ou appelez vous-même le véritable numéro d'aide de votre banque que vous trouverez sur votre espace client. Si vous avez tout de même donné les informations de votre carte bancaires, mettez celle-ci en opposition le plus tôt possible. De manière générale, si vous vous rendez compte que vous avez donné des informations confidentielles, notamment concernant votre banque à une personne malveillante, n'hésitez pas à contatcter votre conseiller·ère bancaire pour obtenir l'aide d'un·e (véritable) professionnel·le ."
            break;
        case 6:
            document.getElementById("bilan-banque-flag").innerHTML+=" - 🚩";
            bilan_arnaque ="Vous avez donné vos informations ! Vous avez été victime d'une arnaque bancaire très importante ! "
            bilan_arnaque+= "Vos conseiller·ères bancaires ne vous demanderont jamais (JAMAIS) vos coordonnées bancaires, que ce soit pour des précisions sur votre carte bancaire, ou le mot de passe de votre espace client, par téléphone, SMS ou mail pour une quelconque raison. En cas de doute, n'hésitez pas à vous rendre en présentiel dans votre banque ou appelez vous-même le véritable numéro d'aide de votre banque que vous trouverez sur votre espace client. Si vous avez tout de même donné les informations de votre carte bancaires, mettez celle-ci en opposition le plus tôt possible. De manière générale, si vous vous rendez compte que vous avez donné des informations confidentielles, notamment concernant votre banque à une personne malveillante, n'hésitez pas à contatcter votre conseiller·ère bancaire pour obtenir l'aide d'un·e (véritable) professionnel·le ."
            break;
        default:
            bilan_arnaque = "Vous n'avez pas abordé cette quête"
            break;
    }

    var bilan_argent = "";
    if(queteArgent.in_history(2)){

        if(queteArgent.in_history(5)){
            bilan_argent+= "Le message concernant le chèque énergie était bel et bien un vrai message, vous avez suivi les démarches pour obtenir ce chèque et vous avez en effet obtenu un chèque énergie d'une valeur de 300€ ! <br> (Il était possible de vérifier le lien sur un véritable navigateur internet, nous vous encourageons à rechercher sur internet les liens dont vous n'êtes pas sûr) <br> <br>"
        }
        else
        {
            bilan_argent += "Malgré l'apparence du SMS, le message concernant le chèque énergie était bel et bien un vrai message envoyé par le gouvernement permettant d'obtenir un chèque énergie. <br> Il était possible de vérifier le lien sur un véritable navigateur internet, nous vous encourageons à rechercher sur internet les liens dont vous n'êtes pas sûr <br> <br>";
        }
    }

    if(queteArgent.in_history(1)){
        if(queteArgent.in_history(6)){
            bilan_argent += "Malheureusement, le SMS de Navigo auquel vous avez confié vos coordonnées bancaires pour un remboursement était une arnaque, malgré le nom 'Navigo' s'affichant au lieu d'un numéro de téléphone. Les pirates peuvent en effet passer par des entreprises de marketing pour obtenir la possibilité d'afficher le nom de l'entreprise qui commande une campagne marketing à la place du numéro de téléphone. Plus d'informations sont disponibles ici : https://www.numerama.com/cyberguerre/1539846-pourquoi-navigo-vous-envoie-des-sms-darnaque.html \n Pour signaler ces fausses campagnes, il est possible d'appeler le 33700"
        }
        else{
            bilan_argent += "Le SMS de Navigo était une arnaque, malgré le nom 'Navigo' s'affichant au lieu d'un numéro de téléphone, et vous n'êtes pas tombé dans le panneau. Les pirates peuvent en effet passer par des entreprises de marketing pour obtenir la possibilité d'afficher le nom de l'entreprise qui commande une campagne marketing à la place du numéro de téléphone. Plus d'informations sont disponibles ici : https://www.numerama.com/cyberguerre/1539846-pourquoi-navigo-vous-envoie-des-sms-darnaque.html \n Pour signaler ces fausses campagnes, il est possible d'appeler le 33700";
        }
    }
    if(queteArgent.history==0)
    {
        bilan_argent = "Cette quête n'a pas été abordée";
    }

    if(queteArgent.in_history(6))
    {
        document.getElementById("bilan-argent-flag").innerHTML+=" - 🚩";
    }
    else if(queteArgent.in_history(5))
    {
        document.getElementById("bilan-argent-flag").innerHTML+=" - ✅";
    }
    else if(queteArgent.in_history(1))
    {
        document.getElementById("bilan-argent-flag").innerHTML+=" - ✅🔎"
    }
    else
    {
        document.getElementById("bilan-argent-flag").innerHTML+=" - 🔎";
    }
    document.getElementById("bilan-quete-Banque").innerHTML = bilan_arnaque;
    document.getElementById("bilan-quete-Argent").innerHTML = bilan_argent;
}
