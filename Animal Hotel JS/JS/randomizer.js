import { Animal } from "./animal.js";
import { SystemFunctions} from "./systemFunctions.js";

/**
 * A class to generate random values for various purposes in the game, such as random animal types, random names, etc.
 */
class Randomizer {
    constructor() {}
    generateRandomAnimal(){
        const foodTypes = ["Beef", "Chicken", "Pork", "Apple","Carrot", "Potat"]
        const animalTypes = ["Dog", "Cat", "Rabbit", "Hamster", "Parrot"];
        const animalNameOptions = ["Buddy", "Mittens", "Fluffy", "Charlie", "Luna", "Max", "Bella", "Rocky", "Daisy", "Oliver"];

        let randomType = animalTypes[Math.floor(Math.random() * animalTypes.length)];
        let randomFood = foodTypes[Math.floor(Math.random() * foodTypes.length)]
        let randomName = animalNameOptions[Math.floor(Math.random() * animalNameOptions.length)];
        let amountOfDayLeft = Math.floor(Math.random() * 7) + 1;
        let randomSize = Math.floor(Math.random() * 3) + 1; // 1: Small, 2: Medium, 3: Large
        let animalAmountOfFoodPerDay = this.calculateFood(randomSize);
        let animalMoneyForAnimal = this.calculateMoney(randomSize, amountOfDayLeft);

        let animal = new Animal(randomName,amountOfDayLeft,randomSize,animalMoneyForAnimal,randomType,randomFood, animalAmountOfFoodPerDay);
        SystemFunctions.addAnimal(animal);
    };
    calculateFood(animalSize){
        switch(animalSize){
            case 1:
                return Math.floor(Math.random() * 3) + 1; // 1-3 units of food for small animals
            case 2:
                return Math.floor(Math.random() * 4) + 3; // 3-6 units of food for medium animals
            case 3:
                return Math.floor(Math.random() * 5) + 6; // 6-10 units of food for large animals
            default:
                return 1; 
        }
    }
    calculateMoney(animalSize, amountOfDayLeft){
        switch(animalSize){
            //500-1000 for small/7days
            //Calculate randomly between 500-1000, then / 7 and * amountOfDayLeft
            case 1:
                const smallMoney = Math.floor(Math.random() * 501) + 500; // 500-1000
                return Math.floor((smallMoney / 7) * amountOfDayLeft);
            //1000-2000 for medium/7days
            //Calculate randomly between 1000-2000, then / 7 and * amountOfDayLeft
            case 2:
                const mediumMoney = Math.floor(Math.random() * 1001) + 1000; // 1000-2000
                return Math.floor((mediumMoney / 7) * amountOfDayLeft);
            //2000-5000 for large/7days
            //Calculate randomly between 2000-5000, then / 7 and * amountOfDayLeft
            case 3:
                const largeMoney = Math.floor(Math.random() * 3001) + 2000; // 2000-5000
                return Math.floor((largeMoney / 7) * amountOfDayLeft);
            default:
                return 100;
        }
    }
}

export { Randomizer };