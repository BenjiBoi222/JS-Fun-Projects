import { Randomizer } from "./randomizer.js";
/** 
 * A class to hold various system functions that can be used across the application.
 */
class SystemFunctions {
    // Static list to store all animals
    static animalsInLine = [];
    static addAnimal(animal) {
        this.animalsInLine.push(animal);
    }
    static removeAnimal(animal) {
        const index = this.animalsInLine.indexOf(animal);
        if (index > -1) {
            this.animalsInLine.splice(index, 1);
        }
    }
    
    static fillAnimalLine(){
        const parentUl = document.getElementById("line-list");
        const generator = new Randomizer();

        while(this.animalsInLine.length < 5){
            generator.generateRandomAnimal();
        }

        parentUl.innerHTML = "";

        for(let i = 0; i < this.animalsInLine.length; i++){
            const newLi = document.createElement("li");
            newLi.textContent = `${i+1}) ${this.animalsInLine[i].name} the ${this.animalsInLine[i].animalType}`;
            parentUl.appendChild(newLi);
        }
    }

}

export { SystemFunctions };