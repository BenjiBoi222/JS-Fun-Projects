/**
 * @fileoverview Randomizer class for generating random animals and calculating game values
 */

import { Animal, BasicAnimal } from "./animal.js";
import { SystemFunctions } from "./systemFunctions.js";
import { hotel } from "./register.js";

// Constants for animal generation
const FOOD_TYPES = ["Beef", "Chicken", "Pork", "Apple", "Carrot", "Potato"];
const ANIMAL_TYPES = ["Dog", "Cat", "Rabbit", "Hamster", "Parrot"];
const SPECIAL_ANIMAL_TYPES = ["Chimp", "Dinosaur", "Hippopotamus", "Giraffe", "Tiger"];
const ANIMAL_NAMES = [
    "Buddy", "Mittens", "Fluffy", "Charlie", "Luna", 
    "Max", "Bella", "Rocky", "Daisy", "Oliver",
    "Cooper", "Milo", "Lucy", "Bailey", "Teddy", 
    "Bear", "Sadie", "Toby", "Coco", "Peanut", 
    "Cookie", "Ginger", "Pepper", "Shadow", "Snowball", 
    "Mochi", "Winston", "Duke", "Ruby", "Stella", 
    "Felix", "Rosie", "Leo", "Penny", "Zoe", 
    "Sparky", "Barnaby", "Nala", "Buster", "Jax", "Chimpy"
];

const ANIMAL_SIZE = {
    SMALL: 1,
    MEDIUM: 2,
    LARGE: 3  
};

const SPECIAL_ANIMAL_SIZE = {
    SMALL: 1,
    MEDIUM: 2,
    LARGE: 3,
    EXTRA: 8
}

const DAYS_BASE = 7;

const FOOD_AMOUNTS = {
    SMALL: { min: 1, max: 3 },
    MEDIUM: { min: 3, max: 6 },
    LARGE: { min: 6, max: 10 }
};

const SPECIAL_FOOD_AMOUNT = {
    SMALL: { min: 1, max: 3 },
    MEDIUM: { min: 3, max: 6 },
    LARGE: { min: 6, max: 10 },
    EXTRA: { min: 20, max: 50}
}

const MONEY_RANGE = {
    SMALL: { min: 100, max: 300 },
    MEDIUM: { min: 400, max: 800 },
    LARGE: { min: 900, max: 1200 }
};

const SPECIAL_MONEY_RANGE = {
    SMALL: { min: 100, max: 300 },
    MEDIUM: { min: 400, max: 800 },
    LARGE: { min: 900, max: 1200 },
    EXTRA: { min: 9000, max: 12000}
}

/**
 * A class to generate random values for various purposes in the game.
 * @class
 */
class Randomizer {
    /**
     * Creates a new Randomizer instance.
     */
    constructor() {}

    /**
     * Handles the animal creaton based on the level
     */
    generateRandomAnimal() {
        if(hotel.currentLevel > 15){
            generateAnimal(SPECIAL_ANIMAL_SIZE, SPECIAL_FOOD_AMOUNT, SPECIAL_MONEY_RANGE)
        }else{
            generateAnimal(ANIMAL_SIZE, FOOD_AMOUNTS, MONEY_RANGE)
        }
        
        SystemFunctions.addAnimal(animal);
    }

    /**
     * Generates a random animal with all necessary attributes and adds it to the waiting line.
     */
    generateAnimal(animalSizeArr, foodAmountArr, moneyArr){
        
    }

    /**
     * Calculates the food consumption for an animal based on its size.
     * @param {number} animalSize - The size of the animal (1: Small, 2: Medium, 3: Large)
     * @returns {number} The amount of food consumed per day
     */
    calculateFood(animalSize) {
        let range;
        switch (animalSize) {
            case ANIMAL_SIZE.SMALL: range = FOOD_AMOUNTS.SMALL; break;
            case ANIMAL_SIZE.MEDIUM: range = FOOD_AMOUNTS.MEDIUM; break;
            case ANIMAL_SIZE.LARGE: range = FOOD_AMOUNTS.LARGE; break;
            case ANIMAL_SIZE.EXTRA: range = FOOD_AMOUNTS.EXTRA; break;
            default: return 1;
        }
        return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    }

    /**
     * Calculates the payment for an animal based on its size and stay duration.
     * Payment scales with the number of days the animal will stay.
     * @param {number} animalSize - The size of the animal (1: Small, 2: Medium, 3: Large)
     * @param {number} amountOfDayLeft - Number of days the animal will stay
     * @returns {number} The total payment amount
     */
    calculateMoney(animalSize, amountOfDayLeft) {
        let range;
        switch (animalSize) {
            case ANIMAL_SIZE.SMALL: range = MONEY_RANGE.SMALL; break;
            case ANIMAL_SIZE.MEDIUM: range = MONEY_RANGE.MEDIUM; break;
            case ANIMAL_SIZE.LARGE: range = MONEY_RANGE.LARGE; break;
            case ANIMAL_SIZE.EXTRA: range = MONEY_RANGE.EXTRA; break;
            default: return 100;
        }
        
        const baseMoney = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
        return Math.floor((baseMoney / DAYS_BASE) * amountOfDayLeft);
    }
}

export { Randomizer };