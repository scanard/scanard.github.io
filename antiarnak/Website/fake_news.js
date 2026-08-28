var currentImg =0;
var nbImg = 4;




function changeImg(increment)
{
    const text=document.getElementById("text");
    currentImg+=increment;
    currentImg = currentImg % nbImg;
    if (currentImg<0)
        { currentImg +=nbImg}
    document.getElementById("activity").src="images/activity"+currentImg+".jpeg";
    text.textContent="";
    text.style="background-color : white";
}

function checkImg(answer)
{
    const text=document.getElementById("text");
    source=document.getElementById("activity").src;
    length=source.length;
    source=source.substr(length-21,length-1);
    console.log(source);
    if (source=="images/activity0.jpeg")
    {
        if (answer)
        {
            text.textContent="Bien joué, cette image a effectivement été générée par IA. D'ailleurs, ces fausses images du mariage de Tom Holland et Zendaya sont devenues virales et beaucoup de gens y ont cru.";
            text.style="background-color : green";
        }
        else{
            text.textContent="Eh non, cette image a été générée par IA. D'ailleurs, ces fausses images du mariage de Tom Holland et Zendaya sont devenues virales et beaucoup de gens y ont cru.";
            text.style="background-color : red";
        }
    }
    
    if (source=="images/activity1.jpeg")
    {
        if (answer)
        {
            text.textContent="Eh non, cette image était bien réelle.";
            text.style="background-color : red";
        }
        else{
            text.textContent="Bien joué, cette image était bien réelle.";
            text.style="background-color : green";
        }
    }

    if (source=="images/activity2.jpeg")
    {
        if (answer)
        {
            text.textContent="Bien joué, cette image était bien générée par IA.";
            text.style="background-color : green";
        }
        else{
            text.textContent="Eh non, cette image n'était pas réelle.";
            text.style="background-color : red";
        }
    }

    if (source=="images/activity3.jpeg")
    {
        if (answer)
        {
            text.textContent="Eh non, cette image était bien réelle.";
            text.style="background-color : red";   
        }
        else{
            text.textContent="Bien joué, cette image était bien réelle.";
            text.style="background-color : green";
        }
    }

}