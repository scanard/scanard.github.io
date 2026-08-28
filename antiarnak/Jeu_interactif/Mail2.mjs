import { cellPhone_change_app, started, update_notification_str } from "./CellPhone.mjs";

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms))
}

function Mail(sender,sender_email,date,object,content,id)
{
    this.sender =sender;
    this.content =content;
    this.date =date;
    this.object=object;
    this.sender_email = sender_email;
    this.id = id;
    this.link = document.createElement("div");
    this.sent = false;

    this.display = function()
    {
        document.getElementById("cellPhone-mail2-object").innerText = this.object;
        document.getElementById("cellPhone-mail2-sender").innerText = this.sender;
        document.getElementById("cellPhone-mail2-sender").title = this.sender_email;
        document.getElementById("cellPhone-mail2-date").innerText = this.date;
        document.getElementById("cellPhone-mail2-content").innerText = this.content;
        document.getElementById("cellPhone-mail2-link").innerHTML = "";

        this.link.className = "cellPhone-link";
        document.getElementById("cellPhone-mail2-link").appendChild(this.link);
    }

    this.add_link = function(text){
        this.link.innerHTML = text;
    }

    this.getLink = function(){
        return this.link;
    }

    this.send = async function(){
        //document.getElementById("cellPhone-mails1-page").appendChild
        if(!this.sent)
        {
            let container = document.createElement("div");
            container.className = "cellPhone-mail-container";
            if(this.id)
                container.id = this.id;
            

            let header = document.createElement("div");
            header.className = "cellPhone-mail-header";

            let date = document.createElement("div");
            date.className = "cellPhone-mail-date";
            date.appendChild(document.createTextNode(this.date))

            let sender = document.createElement("div");
            sender.className = "cellPhone-mail-sender";
            sender.appendChild(document.createTextNode(this.sender))

            let object = document.createElement("div");
            object.className = "cellPhone-mail-object";
            object.appendChild(document.createTextNode(this.object))

            let content = document.createElement("div");
            content.className = "cellPhone-mail-content";
            content.innerHTML = this.content;
            //content.appendChild(document.createTextNode(this.content))

            header.appendChild(sender);
            header.appendChild(date);

            container.appendChild(header);
            container.appendChild(object);
            container.appendChild(content);

            container.addEventListener("click", ()=>{this.display();cellPhone_change_app("mails2")});

            document.getElementById("cellPhone-mail-zone").appendChild(container);
            if(started)
            {
                //console.log("notification?");
                document.getElementById("app-icon-notification").src="src/icons/Mail.png";
                document.getElementById('notif-sender').innerHTML=this.sender_email;
                document.getElementById('notif-content').innerHTML=this.content;
                document.getElementById('cellPhone-notification').style.display = "flex";
                //document.getElementById('cellPhone-notification').onclick = "console.log(\"e\");";
                update_notification_str("mails1");
                await sleep(2000);
                document.getElementById('cellPhone-notification').style.display = "none";
                update_notification_str("_");
            }
            this.sent = true;
        }
    }
        
}

export {Mail};
