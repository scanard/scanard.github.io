
import { Message } from "./Message.mjs";
import { TextBox } from "./Text Box/TextBox.mjs";

function MessageGraph(message) {
    this.msg = message; // Message
    this.choices = [];  // Message array
    this.next = [];     // Message array

    this.addNextPrompt = function(option,consequence) {
        this.choices.push(option);
        this.next.push(consequence);
    }

    this.getNextPrompt = function() {
        return this.choices;
    }

    this.getNextMessages = function() {
        return this.next;
    }

    this.displayChoices(i) = function() {
        var reponses = {
            message: ["this is displayed at the top of the textbox"],
            choix: ["choix1", "choix2"],
            resultats: [()=>{}, ()=>{}]
        };
    }
}