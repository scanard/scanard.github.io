function Message(contact, sender, date, hour, content,id)
{
    this.contact = contact
    this.sender = sender
    this.date = date
    this.content = content
    this.hour = hour
    this.app = "no-app"

    this.link = document.createElement("div");
    this.text2div = document.createElement("div");
    this.text2 = "";

    this.display = function()
    {
        let container = document.createElement("div");
        container.className = "cellPhone-SMS2-message"+sender;

        let contentdiv = document.createElement("div");
        contentdiv.className = "cellPhone-SMS2-content";
        contentdiv.innerHTML = this.content;
        this.text2div.className = "cellPhone-SMS2-content";
        this.text2div.innerHTML = this.text2;
        let dateContainer = document.createElement("div");
        dateContainer.className = "cellPhone-SMS2-date-container";

        let date = document.createElement("div");
        date.className = "cellPhone-SMS2-date";
        date.innerText = this.hour;

        dateContainer.appendChild(date);
        container.appendChild(contentdiv);
        container.appendChild(dateContainer);
        contentdiv.append(this.link);
        contentdiv.append(this.text2div);
        this.link.className = "cellPhone-link";

        document.getElementById("cellPhone-"+this.app+"2-zone").appendChild(container);


        var page = document.getElementById("cellPhone-"+this.app+"2-page");
        
        page.scrollTop = page.scrollHeight;

    }

    this.set_app = function(app)
    {
        this.app = app;
    }

    this.getLink = function()
    {
        return this.link;
    }
    this.setLink = function(name)
    {
        this.getLink().innerHTML= name;
    }

    this.add_text2 = function(text){
        this.text2 = text;
    }
}

export {Message}