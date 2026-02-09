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

        for(let i of this.animalsInLine){

            const newLi = document.createElement("li");
            newLi.textContent = `${i.name} the ${i.animalType}`;
            parentUl.appendChild(newLi);
        }
    }



    
}

export { SystemFunctions };