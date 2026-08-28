function Quest(name, type, element_list)
{
    this.name = name;
    this.type = type;
    this.element_list = element_list;
    this.element_checked = [];
    this.state = 0;


    this.message = "";
    this.message_div = document.createElement("div");
    this.text = document.createElement("div");
    this.count = document.createElement("div");
    this.completed = false;
    this.history = [this.state];

    this.setup = function()
    {
        this.message_div.style.display = "none";
        document.getElementById("quest-container").appendChild(this.message_div);
        this.message_div.appendChild(this.text);

        if(this.type == "checklist")
        {
            this.message_div.appendChild(this.count);
            this.count.innerHTML="(0/"+this.element_list.length+")";
        }


    }

    this.in_history = function(i)
    {
        for (var j=0; j<this.history.length;j++)
        {
            if(this.history[j]==i)
            {
                return true;
            }
        }
        return false;
    }

    this.update = function(message)
    {
        this.message_div.style.display = "flex";
        this.text.innerHTML = message;
    }

    this.change_state = function(new_state)
    {
        this.history.push(new_state);
        this.state = new_state;
    }

    this.getState = function()
    {
        return this.state;
    }

    this.complete = function()
    {
        this.message_div.style.color = "green";
        this.completed = true;
    }

    this.add_check = function(element)
    {
        var in_element_list = false;
        var in_element_checked = false;
        for(var i=0;i< this.element_list.length;i++)
        {
            if(element == element_list[i])
                in_element_list = true;
        }

        for(var i=0; i<this.element_checked.length; i++)
        {
            if(element == this.element_checked[i])
                in_element_checked = true;
        }
        if( in_element_list && !in_element_checked)
        {
            this.element_checked.push(element);
            this.count.innerHTML ="("+ this.element_checked.length +"/"+ this.element_list.length+")";
            


            if(element_list.length == this.element_checked.length)
                this.complete();
        }
    }


}

export {Quest}