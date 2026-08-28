function Contact(phone_num,name)
{
    this.phone_num = phone_num;
    this.name = name;
    this.picture = "src/profile.jpg"

    this.getInfos = function(){
        if(name=="")
            return this.phone_num;
        return this.name;
    }
}

export {Contact};