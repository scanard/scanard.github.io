



function TextBox()
{
    this.message_en_cours = "";
    this.timer_ecriture = null;
    this.delai_ecriture = 1000/64;
    this.dialogue_en_cours = [];
    this.indice_en_cours = 0;
    this.reponse = false;


    this.ecrire = function(message,i) {
        this.message_en_cours = message
        var $this = this
        document.getElementById("textBox-text").innerText = message.slice(0,i);
        if(i!= message.length)
            this.timer_ecriture = setTimeout(function(message,i) {$this.ecrire(message,i)}, this.delai_ecriture, message, i+1)
        else
        {
            this.message_en_cours=""
            if(this.indice_en_cours == this.dialogue_en_cours.message.length-1)
                this.ecrire_choix()
        }
    }

    this.ecrire_dialogue = function(dialogue,i) {
        this.open()
        document.getElementById("textBox-text").innerHTML = ""
        document.getElementById("textBox-choices").innerHTML = ""
        this.dialogue_en_cours = dialogue
        this.indice_en_cours = i
        this.ecrire(dialogue.message[0],0)
        this.reponse=true
        var $this = this
        setTimeout(function(){ $this.reponse=false},100) // Sécurité pour s'assurer que la fonction TextBox_click ne se déclenche pas pour un clic lié à une réponse à un choix
    }

    this.ecrire_choix = function(){
        this.reponse = true;
        for(var i=0; i< this.dialogue_en_cours.choix.length; i++)
            {
                //document.getElementById("textBox-choices").innerHTML+= "<div id=textBox-choix"+i+" class=textBox-choix onclick="+this.dialogue_en_cours.resultats[i]+"></div>";
                document.getElementById("textBox-choices").innerHTML+= "<div id=textBox-choix"+i+" class=textBox-choix></div>";
                document.getElementById("textBox-choix"+i).innerHTML ="→ "+ this.dialogue_en_cours.choix[i];
                
            }
        for(var i=0; i< this.dialogue_en_cours.choix.length; i++)
        {
            let ibis = i
            document.getElementById("textBox-choix"+i).addEventListener("click", ()=>{
                var d = this.dialogue_en_cours;
                this.dialogue_en_cours.resultats[ibis]();
                var d2 = this.dialogue_en_cours;
                if(d == d2)
                    this.close();
            });
        }
    }

    this.click = function(){

        
        if(!this.reponse)
            {
                if(this.message_en_cours!="") //Message en cours d'écriture : On fini de l'écrire
                {
                
                    clearTimeout(this.timer_ecriture)
                    document.getElementById("textBox-text").innerText = this.message_en_cours
                    this.message_en_cours = ""
        
                    if(this.indice_en_cours == this.dialogue_en_cours.message.length-1)
                        this.ecrire_choix()
                    
                }
                else if(this.indice_en_cours+1< this.dialogue_en_cours.message.length)
                {
                    this.indice_en_cours+=1
                    this.ecrire(this.dialogue_en_cours.message[this.indice_en_cours],0)
                }
                if(this.dialogue_en_cours.choix.length==0)
                {
                        this.close()
                }
                
            }
            else if(this.dialogue_en_cours.choix.length==0)
                {
                    this.reponse = false;
                }

            
    }

    this.close = function(){
        
        document.getElementById("textBox").style.display="none";
        clearTimeout(this.timer_ecriture);
        
    }

    this.open = function(){
        document.getElementById("textBox").style.opacity="100"
        document.getElementById("textBox").style.display="block"

    }

    this.init = function(){
        document.getElementById("textBox").addEventListener("click", () => {this.click()})
    }

}

var textbox = new TextBox()

export {TextBox}








