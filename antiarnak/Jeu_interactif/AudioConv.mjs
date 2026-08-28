import { cellPhone_change_app, textbox2 } from "./CellPhone.mjs";

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

function AudioConv(name,id)
{
    this.name = name;
    this.id = id;
    this.current_state = 0;
    this.tabChoices = [];
    this.audio = new Audio();
    this.running = false;
    this.allowed_home = true;
    this.answerChoices = 0;

    this.addChoice = function(situation)
    {
        this.tabChoices.push(situation)
    }

    this.change_state = function(i)
    {
        this.current_state = i;
    }

    this.call_notification = async function(idx)
    {
        var zone=document.getElementById("cellPhone-entering-call");
        document.getElementById("caller-num").innerHTML=name;

        zone.style.display="flex";
        await sleep(8000);
        zone.style.display="none";

        if(idx>0)
        {
            document.getElementById("cellPhone-voicemail"+idx.toString()).style.display = "block"
        }

        //if (bool_mess)
        //{
        //    await sleep(3000)
            //voicemail_sending(idx)

        //}
    }
    this.playAudio = function(param) //param = 0 on fait rien, =1 on show le texte, = 2 on raccroche
    {
        this.audio.src = "src/audio/" + this.id + this.current_state.toString()+".mp3";
        var zone=document.getElementById("cellPhone-entering-call");
        
        this.allowed_home = false;
        
        var call = this.audio;
        call.play();
        call.volume=0.9;
        var t=call.duration;
        call.onended = () => {
            if (param == 1)
                this.show_choice();
            if (param == 2)
                this.stop(); 
        }
    }

    this.allow_home = function()
    {
        this.allowed_home = true;
    }
    
    this.enter_call = function()
    {
        var zone=document.getElementById("cellPhone-entering-call");
        zone.style.display="none";
        this.running = true;
        
        document.getElementById("name_caller").innerHTML=name;
        cellPhone_change_app("appel2");
        this.playAudio(1);
    }

    this.show_choice = function()
    {
        if(this.answerChoices != null) 
            textbox2.ecrire_dialogue(this.answerChoices,0)
        
    }

    this.stop = function()
    {
        this.running = false;
        cellPhone_change_app("home");
        this.audio.pause();
        this.allow_home();
    }

    this.changeAnswerChoicesTab = function(situationName)
    {
        var idx = parseInt(situationName.substring(9));
        this.answerChoices = this.tabChoices[idx];
    }

    this.addChoiceSituation = function(situationName,choix,idx_audio,newSituation)
    {
        var idx = parseInt(situationName.substring(9));
        this.tabChoices[idx].choix.push(choix)
        var tmp=()=>{
            this.current_state = idx_audio;
            this.changeAnswerChoicesTab(newSituation);
            this.playAudio(1);}
        this.tabChoices[idx].resultats.push(tmp)

    }

    this.removeChoicesSituation = function(situationName)
    {
        var idx = parseInt(situationName.substring(9));
        this.tabChoices[idx].choix.splice(0);
        this.tabChoices[idx].resultats.splice(0);
    }
    
}

export {AudioConv}
