import { Contact } from "./Contact.mjs"
import { Message } from "./Message2.mjs"
import { cellPhone_change_app, current_app_name, started, update_notification_str } from "./CellPhone.mjs";
import { textbox2 } from "./CellPhone.mjs";

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

function Conversation(contact,nb_new_messages, message_list,app, can_answer,idconv)
{
    this.contact = contact //Contact 
    this.nb_new_messages = nb_new_messages
    this.message_list = message_list // Message Array
    this.app = app
    this.id = this.app+this.contact.getInfos();
    this.can_answer = can_answer;
    this.idconv = idconv

    //tableau qui contient les différentes situations et fonction pour ajouter une situation au tableau
    this.tabChoice = []
    this.addChoice = function(situation)
    {
        this.tabChoice.push(situation)
    }
    //nomenclature des situations : situationi avec i l'indice de la case du tableau

    this.answerChoices; 
    for (var i=0; i< this.message_list.length; i++)
    {
        this.message_list[i].set_app(this.app)
    }

    this.container = document.createElement("div");
    this.content = document.createElement("div");
    this.date = document.createElement("div");
    this.newMessage = document.createElement("div");

    this.addNewMessage = async function(message)
    {
        message.set_app(this.app);
        this.message_list.push(message);
        if(document.getElementById("cellPhone-"+app+"2-conv").innerHTML == this.id && current_app_name==this.app+'2')
        {
            message.display();
            
        }
        else {
            if(started)
            {
                document.getElementById("app-icon-notification").src="src/icons/"+message.app+".png";
                document.getElementById('notif-sender').innerHTML=message.contact.getInfos();
                document.getElementById('notif-content').innerHTML=message.content;
                document.getElementById('cellPhone-notification').style.display = "flex";
                update_notification_str(this.app + "1");
                await sleep(2000);
                document.getElementById('cellPhone-notification').style.display = "none";
                update_notification_str("_");
            }
            this.nb_new_messages += 1;
            this.newMessage.display = "flex";

            if(this.app=="SMS")
                {
                //console.log("[new] From " + parseInt(document.getElementById("cellPhone-SMS1-nb-new-messages").innerHTML));
                document.getElementById("cellPhone-SMS1-nb-new-messages").innerHTML = parseInt(document.getElementById("cellPhone-SMS1-nb-new-messages").innerHTML)+1;
                //console.log(" to " + parseInt(document.getElementById("cellPhone-SMS1-nb-new-messages").innerHTML));       
                //console.log("(" + message.content + ")\n");
            }

            if(message.sender==2)
            {
                this.nb_new_messages=0;
            }
        }
        
        //console.log("constructor");
        //console.log("constructor-- " + this.nb_new_messages);
        this.update();
    }

    this.update = function()
    {
        //console.log("with " + this.nb_new_messages + " messages at [" + this.contact + "]");
        let last_message = this.message_list[this.message_list.length-1];
        this.content.innerText = last_message.content;
        this.date.innerText = last_message.hour;
        if(this.nb_new_messages > 0) {
            this.newMessage.style.display = "block";
            this.newMessage.innerText = this.nb_new_messages;
        } else {
            this.newMessage.style.display = "none";
            this.newMessage.innerText = ".";
        }
    }

    this.send = function()
    {
        this.container.className = "cellPhone-messageapp-container cellPhone-"+this.app+"-container";
        if(this.idconv)
            this.container.id = this.idconv

        let profile = document.createElement("img");
        profile.className = "cellPhone-messageapp-img cellPhone-"+app+"-img ";
        profile.src = contact.picture;

        this.container.appendChild(profile);

        let container2 = document.createElement("div");
        container2.className = "cellPhone-messageapp-container2 cellPhone-"+app+"container2";

        let header = document.createElement("div");
        header.className = "cellPhone-mail-header";

        let sender = document.createElement("div");
        sender.className = "cellPhone-messageapp-sender cellPhone-"+app+"-sender ";
        sender.innerText = this.contact.getInfos();

        header.appendChild(sender);

        container2.appendChild(header);
        
        this.content.className = "cellPhone-messageapp-content cellPhone-"+app+"-content ";

        container2.appendChild(this.content);
        this.container.appendChild(container2);

        let left = document.createElement("div");
        left.className = "cellPhone-messageapp-left cellPhone-"+app+"-left";

        this.date.className = "cellPhone-messageapp-date cellPhone-"+app+"-date ";
        
        if(message_list.length >0)
        {
            this.content.innerText = message_list[message_list.length - 1].content; 
            this.date.innerText = message_list[message_list.length - 1].hour;
        }
        this.newMessage.className = "cellPhone-messageapp-new-message cellPhone-"+app+"-new-message ";
        if(this.nb_new_messages > 0)
        {
            this.newMessage.style.display = "block";
            this.newMessage.innerText = this.nb_new_messages;
        } else {
            this.newMessage.style.display = "none";
            this.newMessage.innerText = ".";
        }
        left.appendChild(this.newMessage);
        left.appendChild(this.date);
        this.container.appendChild(left);

        document.getElementById("cellPhone-"+app+"-zone").appendChild(this.container);

        if(this.app=="SMS")
            {
                //console.log("[init] From " + parseInt(document.getElementById("cellPhone-SMS1-nb-new-messages").innerHTML));
                document.getElementById("cellPhone-SMS1-nb-new-messages").innerHTML = parseInt(document.getElementById("cellPhone-SMS1-nb-new-messages").innerHTML)+nb_new_messages;
                //console.log(" to " + parseInt(document.getElementById("cellPhone-SMS1-nb-new-messages").innerHTML) + "\n");       
                //console.log("(" + this.content.innerHTML + ")\n");     
            }

        //Fonction appelée sur un click
        this.container.addEventListener("click",()=>{
            document.getElementById("cellPhone-"+app+"2-zone").innerHTML = "";
            document.getElementById("cellPhone-"+app+"2-conv").innerText = this.id;
            //this.newMessage.style.display = "none";
            let date = "";


            for (let i=0; i<this.message_list.length;i++)
            {
                if (message_list[i].date != date)
                {
                    let dateContainer = document.createElement("div");
                    dateContainer.className = "cellPhone-SMS2-date-change";
                    dateContainer.innerHTML = message_list[i].date;
                    date = message_list[i].date;
                    document.getElementById("cellPhone-"+this.app+"2-zone").appendChild(dateContainer);
                }
                message_list[i].display();
            }



            document.getElementById("cellPhone-"+app+"2-contact").innerText = this.contact.getInfos()
            cellPhone_change_app(app+"2");

            document.getElementById("cellPhone-"+app+"-writing-zone").parentNode.innerHTML += ''// supprime tout les eventListener de la zone de réponse
            
            document.getElementById("cellPhone-"+app+"-writing-zone").addEventListener("click",()=> {if(this.answerChoices != null) 
                {
                    if(this.answerChoices.choix.length!=0)
                        textbox2.ecrire_dialogue(this.answerChoices,0)
                    else
                    {
                        var situation = {
                            message : ["Aucune action disponible pour le moment. Essayez d'avancer un peu dans l'histoire et de revenir après"],
                            choix : ["Ok"],
                            resultats : [()=>{}]
                        }
                        textbox2.ecrire_dialogue(situation,0);
                    }
                }
            });
            

            if(this.app=="SMS")
                {
                    //console.log("[red] From " + parseInt(document.getElementById("cellPhone-SMS1-nb-new-messages").innerHTML));
                    document.getElementById("cellPhone-SMS1-nb-new-messages").innerHTML = parseInt(document.getElementById("cellPhone-SMS1-nb-new-messages").innerHTML)- this.nb_new_messages;
                    //console.log(" to " + parseInt(document.getElementById("cellPhone-SMS1-nb-new-messages").innerHTML) + "\n");   
                }
            if(this.can_answer)
            {
                document.getElementById("cellPhone-"+app+"-writing-zone").style.display = "block";
            }
            else{
                document.getElementById("cellPhone-"+app+"-writing-zone").style.display = "none";
            }
            this.nb_new_messages = 0;
            //console.log("send " + this.nb_new_messages);
            this.update();


        })
    }

    this.changeAnswerChoicesTab = function(situationName)
    {
        var idx = parseInt(situationName.substring(9));
        this.answerChoices = this.tabChoice[idx];
    }

    this.changeAnswerChoices = function(newChoices)
    {
        this.answerChoices = newChoices
    }

    this.addChoiceSituation = function(situationName,choix,messages,newSituation)
    {
        var idx = parseInt(situationName.substring(9));
        this.tabChoice[idx].choix.push(choix)
        var tmp=()=>{
            for (let i=0; i<messages.length; i++)
                this.addNewMessage(messages[i]);
            this.changeAnswerChoicesTab(newSituation);}
        this.tabChoice[idx].resultats.push(tmp)

    }

    this.removeChoicesSituation = function(situationName)
    {
        var idx = parseInt(situationName.substring(9));
        this.tabChoice[idx].choix.splice(0);
        this.tabChoice[idx].resultats.splice(0);
    }
}

export {Conversation};